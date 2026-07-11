'use client';

import type { KeyboardEvent, RefObject } from 'react';
import type { TeleprompterSettings } from './useTeleprompter';

interface TeleprompterDisplayProps {
  settings: TeleprompterSettings;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  controlsVisible: boolean;
  onSurfaceTap: () => void;
}

export default function TeleprompterDisplay({
  settings,
  scrollContainerRef,
  controlsVisible,
  onSurfaceTap,
}: TeleprompterDisplayProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    onSurfaceTap();
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-black text-white"
      onClick={onSurfaceTap}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="点击或按空格切换提词播放控制"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black via-black/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-black via-black/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-[33%] z-10 border-t border-dashed border-orange-300/55" />

      <div
        ref={scrollContainerRef}
        className="scrollbar-hide h-full overflow-y-scroll"
      >
        <div className="min-h-[45vh]" />
        <article
          className={`pb-[55vh] font-semibold tracking-[0.02em] text-white transition-opacity ${
            controlsVisible ? 'opacity-90' : 'opacity-100'
          }`}
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight,
            paddingLeft: `${settings.sidePadding}px`,
            paddingRight: `${settings.sidePadding}px`,
            transform: settings.isMirrored ? 'scaleX(-1)' : 'none',
            transformOrigin: 'center center',
          }}
        >
          <div className="mx-auto max-w-5xl whitespace-pre-wrap break-words text-balance">
            {settings.script}
          </div>
        </article>
      </div>
    </div>
  );
}
