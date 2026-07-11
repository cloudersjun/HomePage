import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'teleprompter-settings';
const MIN_SPEED = 10;
const MAX_SPEED = 200;
const MIN_FONT_SIZE = 24;
const MAX_FONT_SIZE = 72;
const MIN_LINE_HEIGHT = 1.2;
const MAX_LINE_HEIGHT = 2.4;
const MIN_SIDE_PADDING = 12;
const MAX_SIDE_PADDING = 64;

export type PlaybackState = 'idle' | 'playing' | 'paused';

export interface TeleprompterSettings {
  script: string;
  speed: number;
  fontSize: number;
  lineHeight: number;
  sidePadding: number;
  isMirrored: boolean;
}

interface StoredSettings {
  script?: unknown;
  speed?: unknown;
  fontSize?: unknown;
  lineHeight?: unknown;
  sidePadding?: unknown;
  isMirrored?: unknown;
}

export const DEFAULT_SETTINGS: TeleprompterSettings = {
  script: `欢迎使用提词器。

把你的录制文稿粘贴到这里，然后调整滚动速度、字号和边距。

点击“开始提词”后，页面会进入沉浸式播放模式。

祝你录制顺利。`,
  speed: 48,
  fontSize: 40,
  lineHeight: 1.7,
  sidePadding: 24,
  isMirrored: false,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function toStoredNumber(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return fallback;
  }

  return clamp(value, min, max);
}

function readStoredSettings(): TeleprompterSettings | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as StoredSettings;

    return {
      script: typeof parsedValue.script === 'string' ? parsedValue.script : DEFAULT_SETTINGS.script,
      speed: toStoredNumber(parsedValue.speed, DEFAULT_SETTINGS.speed, MIN_SPEED, MAX_SPEED),
      fontSize: toStoredNumber(parsedValue.fontSize, DEFAULT_SETTINGS.fontSize, MIN_FONT_SIZE, MAX_FONT_SIZE),
      lineHeight: toStoredNumber(parsedValue.lineHeight, DEFAULT_SETTINGS.lineHeight, MIN_LINE_HEIGHT, MAX_LINE_HEIGHT),
      sidePadding: toStoredNumber(parsedValue.sidePadding, DEFAULT_SETTINGS.sidePadding, MIN_SIDE_PADDING, MAX_SIDE_PADDING),
      isMirrored: typeof parsedValue.isMirrored === 'boolean' ? parsedValue.isMirrored : DEFAULT_SETTINGS.isMirrored,
    };
  } catch {
    return null;
  }
}

export function useTeleprompter() {
  const [settings, setSettings] = useState<TeleprompterSettings>(DEFAULT_SETTINGS);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [controlsVisible, setControlsVisible] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const scrollTopRef = useRef(0);
  const hasLoadedStoredSettingsRef = useRef(false);

  const syncScrollTop = useCallback((nextScrollTop: number) => {
    const safeScrollTop = Math.max(nextScrollTop, 0);
    const container = scrollContainerRef.current;

    scrollTopRef.current = safeScrollTop;

    if (container) {
      container.scrollTop = safeScrollTop;
    }
  }, []);

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    lastTimestampRef.current = null;
  }, []);

  useEffect(() => {
    const storedSettings = readStoredSettings();

    if (!storedSettings) {
      hasLoadedStoredSettingsRef.current = true;
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setSettings(storedSettings);
      hasLoadedStoredSettingsRef.current = true;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasLoadedStoredSettingsRef.current) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      container.scrollTop = scrollTopRef.current;
    }
  }, [playbackState]);

  useEffect(() => {
    if (playbackState !== 'idle') {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [playbackState]);

  useEffect(() => {
    if (playbackState !== 'playing') {
      stopAnimation();
      return;
    }

    const animate = (timestamp: number) => {
      const container = scrollContainerRef.current;

      if (!container) {
        animationFrameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const delta = timestamp - lastTimestampRef.current;
      const nextScrollTop = scrollTopRef.current + (settings.speed * delta) / 1000;
      const maxScrollTop = Math.max(container.scrollHeight - container.clientHeight, 0);
      const safeScrollTop = Math.min(nextScrollTop, maxScrollTop);

      lastTimestampRef.current = timestamp;
      scrollTopRef.current = safeScrollTop;
      container.scrollTop = safeScrollTop;

      if (safeScrollTop >= maxScrollTop) {
        setPlaybackState('paused');
        setControlsVisible(true);
        stopAnimation();
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      stopAnimation();
    };
  }, [playbackState, settings.speed, stopAnimation]);

  const updateSettings = useCallback((patch: Partial<TeleprompterSettings>) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      ...patch,
    }));
  }, []);

  const setScript = useCallback((script: string) => {
    updateSettings({ script });
  }, [updateSettings]);

  const setSpeed = useCallback((speed: number) => {
    updateSettings({ speed: clamp(speed, MIN_SPEED, MAX_SPEED) });
  }, [updateSettings]);

  const adjustSpeed = useCallback((delta: number) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      speed: clamp(currentSettings.speed + delta, MIN_SPEED, MAX_SPEED),
    }));
  }, []);

  const setFontSize = useCallback((fontSize: number) => {
    updateSettings({ fontSize: clamp(fontSize, MIN_FONT_SIZE, MAX_FONT_SIZE) });
  }, [updateSettings]);

  const adjustFontSize = useCallback((delta: number) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      fontSize: clamp(currentSettings.fontSize + delta, MIN_FONT_SIZE, MAX_FONT_SIZE),
    }));
  }, []);

  const setLineHeight = useCallback((lineHeight: number) => {
    updateSettings({ lineHeight: clamp(lineHeight, MIN_LINE_HEIGHT, MAX_LINE_HEIGHT) });
  }, [updateSettings]);

  const setSidePadding = useCallback((sidePadding: number) => {
    updateSettings({ sidePadding: clamp(sidePadding, MIN_SIDE_PADDING, MAX_SIDE_PADDING) });
  }, [updateSettings]);

  const toggleMirror = useCallback(() => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      isMirrored: !currentSettings.isMirrored,
    }));
  }, []);

  const startPlayback = useCallback(() => {
    if (!settings.script.trim()) {
      return;
    }

    setPlaybackState('playing');
    setControlsVisible(false);
  }, [settings.script]);

  const pausePlayback = useCallback(() => {
    stopAnimation();
    setPlaybackState('paused');
    setControlsVisible(true);
  }, [stopAnimation]);

  const resumePlayback = useCallback(() => {
    if (!settings.script.trim()) {
      return;
    }

    setPlaybackState('playing');
    setControlsVisible(false);
  }, [settings.script]);

  const togglePlayback = useCallback(() => {
    if (playbackState === 'playing') {
      pausePlayback();
      return;
    }

    if (playbackState === 'paused') {
      resumePlayback();
      return;
    }

    startPlayback();
  }, [pausePlayback, playbackState, resumePlayback, startPlayback]);

  const returnToEditor = useCallback(() => {
    stopAnimation();
    setPlaybackState('idle');
    setControlsVisible(true);
  }, [stopAnimation]);

  const resetScroll = useCallback(() => {
    syncScrollTop(0);
  }, [syncScrollTop]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
  }, []);

  const hideControls = useCallback(() => {
    setControlsVisible(false);
  }, []);

  return {
    settings,
    playbackState,
    controlsVisible,
    scrollContainerRef,
    setScript,
    setSpeed,
    adjustSpeed,
    setFontSize,
    adjustFontSize,
    setLineHeight,
    setSidePadding,
    toggleMirror,
    startPlayback,
    pausePlayback,
    resumePlayback,
    togglePlayback,
    returnToEditor,
    resetScroll,
    showControls,
    hideControls,
  };
}
