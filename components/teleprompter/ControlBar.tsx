'use client';

import { Pause, Play, RotateCcw, Type, Gauge, ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PlaybackState } from './useTeleprompter';

interface ControlBarProps {
  playbackState: PlaybackState;
  speed: number;
  fontSize: number;
  speedStep: number;
  fontSizeStep: number;
  onTogglePlayback: () => void;
  onIncreaseSpeed: () => void;
  onDecreaseSpeed: () => void;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onResetScroll: () => void;
  onReturnToEditor: () => void;
}

interface ActionButtonProps {
  label: string;
  value?: string;
  icon: LucideIcon;
  onClick: () => void;
}

function ActionButton({ label, value, icon: Icon, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-14 min-w-14 flex-col items-center justify-center rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white transition hover:bg-white/14"
    >
      <Icon className="mb-1 h-5 w-5 text-orange-200" />
      <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">{label}</span>
      {value ? <span className="mt-1 text-sm font-medium text-white">{value}</span> : null}
    </button>
  );
}

export default function ControlBar({
  playbackState,
  speed,
  fontSize,
  speedStep,
  fontSizeStep,
  onTogglePlayback,
  onIncreaseSpeed,
  onDecreaseSpeed,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onResetScroll,
  onReturnToEditor,
}: ControlBarProps) {
  const playLabel = playbackState === 'playing' ? '暂停' : '播放';
  const PlayIcon = playbackState === 'playing' ? Pause : Play;

  return (
    <div
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-30 px-4 pb-4 sm:px-6"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-[2rem] border border-white/12 bg-black/65 p-3 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="grid flex-1 grid-cols-3 gap-2 sm:grid-cols-6">
          <ActionButton label={playLabel} icon={PlayIcon} onClick={onTogglePlayback} />
          <ActionButton label="减速" value={`-${speedStep}`} icon={Gauge} onClick={onDecreaseSpeed} />
          <ActionButton label="加速" value={`+${speedStep}`} icon={Gauge} onClick={onIncreaseSpeed} />
          <ActionButton label="缩小" value={`-${fontSizeStep}`} icon={Type} onClick={onDecreaseFontSize} />
          <ActionButton label="放大" value={`+${fontSizeStep}`} icon={Type} onClick={onIncreaseFontSize} />
          <ActionButton label="重置" icon={RotateCcw} onClick={onResetScroll} />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/70 sm:min-w-[220px]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">当前设置</div>
            <div className="mt-1 text-sm text-white">速度 {speed.toFixed(0)} · 字号 {fontSize.toFixed(0)}</div>
          </div>
          <button
            type="button"
            onClick={onReturnToEditor}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/14"
          >
            <ArrowLeft className="h-4 w-4" />
            编辑
          </button>
        </div>
      </div>
    </div>
  );
}
