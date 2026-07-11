'use client';

import { useEffect } from 'react';
import ScriptEditor from './ScriptEditor';
import ControlBar from './ControlBar';
import TeleprompterDisplay from './TeleprompterDisplay';
import { useTeleprompter } from './useTeleprompter';

const CONTROL_HIDE_DELAY = 2200;
const SPEED_STEP = 10;
const FONT_SIZE_STEP = 4;

export default function TeleprompterApp() {
  const {
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
    togglePlayback,
    returnToEditor,
    resetScroll,
    showControls,
    hideControls,
  } = useTeleprompter();

  useEffect(() => {
    if (playbackState !== 'playing' || !controlsVisible) {
      return;
    }

    const timeout = window.setTimeout(() => {
      hideControls();
    }, CONTROL_HIDE_DELAY);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [controlsVisible, hideControls, playbackState]);

  useEffect(() => {
    if (playbackState === 'idle') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        event.code !== 'Space' ||
        (target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }

      event.preventDefault();
      togglePlayback();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playbackState, togglePlayback]);

  const handleStart = () => {
    resetScroll();
    startPlayback();
  };

  const handleSurfaceTap = () => {
    if (!controlsVisible) {
      showControls();
      return;
    }

    togglePlayback();
  };

  if (playbackState === 'idle') {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,140,66,0.18),_transparent_36%),linear-gradient(180deg,_#0f0f12_0%,_#050505_100%)]">
        <ScriptEditor
          settings={settings}
          onScriptChange={setScript}
          onSpeedChange={setSpeed}
          onFontSizeChange={setFontSize}
          onLineHeightChange={setLineHeight}
          onSidePaddingChange={setSidePadding}
          onToggleMirror={toggleMirror}
          onStart={handleStart}
        />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-black">
      <TeleprompterDisplay
        settings={settings}
        scrollContainerRef={scrollContainerRef}
        controlsVisible={controlsVisible}
        onSurfaceTap={handleSurfaceTap}
      />

      {controlsVisible ? (
        <ControlBar
          playbackState={playbackState}
          speed={settings.speed}
          fontSize={settings.fontSize}
          speedStep={SPEED_STEP}
          fontSizeStep={FONT_SIZE_STEP}
          onTogglePlayback={togglePlayback}
          onIncreaseSpeed={() => adjustSpeed(SPEED_STEP)}
          onDecreaseSpeed={() => adjustSpeed(-SPEED_STEP)}
          onIncreaseFontSize={() => adjustFontSize(FONT_SIZE_STEP)}
          onDecreaseFontSize={() => adjustFontSize(-FONT_SIZE_STEP)}
          onResetScroll={resetScroll}
          onReturnToEditor={returnToEditor}
        />
      ) : null}
    </div>
  );
}
