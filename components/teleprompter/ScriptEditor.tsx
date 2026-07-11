'use client';

import { Play, Type, Gauge, FlipHorizontal2, Rows3, Columns3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TeleprompterSettings } from './useTeleprompter';

interface ScriptEditorProps {
  settings: TeleprompterSettings;
  onScriptChange: (script: string) => void;
  onSpeedChange: (speed: number) => void;
  onFontSizeChange: (fontSize: number) => void;
  onLineHeightChange: (lineHeight: number) => void;
  onSidePaddingChange: (sidePadding: number) => void;
  onToggleMirror: () => void;
  onStart: () => void;
}

function SettingHeader({ icon: Icon, title, value }: { icon: LucideIcon; title: string; value: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 text-sm text-white/80">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-orange-300" />
        <span>{title}</span>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">{value}</span>
    </div>
  );
}

export default function ScriptEditor({
  settings,
  onScriptChange,
  onSpeedChange,
  onFontSizeChange,
  onLineHeightChange,
  onSidePaddingChange,
  onToggleMirror,
  onStart,
}: ScriptEditorProps) {
  const canStart = settings.script.trim().length > 0;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-stretch lg:px-8">
      <section className="flex min-h-[50vh] flex-1 flex-col rounded-[2rem] border border-white/10 bg-white/6 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-orange-300/80">Teleprompter</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">录视频提词器</h1>
          </div>
          <button
            type="button"
            onClick={onToggleMirror}
            className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              settings.isMirrored
                ? 'border-orange-300 bg-orange-400/15 text-orange-100'
                : 'border-white/12 bg-white/8 text-white/80 hover:bg-white/12'
            }`}
          >
            <FlipHorizontal2 className="h-4 w-4" />
            镜像
          </button>
        </div>

        <p className="mb-4 max-w-2xl text-sm leading-6 text-white/70">
          粘贴或输入你的文稿，调整适合自己的速度与字号，然后进入播放模式开始录制。
          首版会自动保存草稿和设置，下次打开可继续使用。
        </p>

        <textarea
          value={settings.script}
          onChange={(event) => onScriptChange(event.target.value)}
          placeholder="把录制文稿贴到这里…"
          className="min-h-[320px] flex-1 resize-none rounded-[1.5rem] border border-white/12 bg-black/35 px-5 py-5 text-base leading-8 text-white outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-300/40"
        />

        <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>支持长文稿、录屏录制、iPhone / iPad 使用。</p>
          <button
            type="button"
            onClick={onStart}
            disabled={!canStart}
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Play className="h-5 w-5" />
            开始提词
          </button>
        </div>
      </section>

      <aside className="w-full rounded-[2rem] border border-white/10 bg-white/6 p-4 shadow-xl backdrop-blur-sm sm:p-6 lg:w-[360px]">
        <div className="space-y-6">
          <div>
            <SettingHeader icon={Gauge} title="滚动速度" value={`${settings.speed.toFixed(0)} px/s`} />
            <input
              type="range"
              min={10}
              max={200}
              step={2}
              value={settings.speed}
              onChange={(event) => onSpeedChange(Number(event.target.value))}
              className="teleprompter-slider w-full"
            />
          </div>

          <div>
            <SettingHeader icon={Type} title="字号" value={`${settings.fontSize.toFixed(0)} px`} />
            <input
              type="range"
              min={24}
              max={72}
              step={2}
              value={settings.fontSize}
              onChange={(event) => onFontSizeChange(Number(event.target.value))}
              className="teleprompter-slider w-full"
            />
          </div>

          <div>
            <SettingHeader icon={Rows3} title="行距" value={settings.lineHeight.toFixed(1)} />
            <input
              type="range"
              min={1.2}
              max={2.4}
              step={0.1}
              value={settings.lineHeight}
              onChange={(event) => onLineHeightChange(Number(event.target.value))}
              className="teleprompter-slider w-full"
            />
          </div>

          <div>
            <SettingHeader icon={Columns3} title="左右边距" value={`${settings.sidePadding.toFixed(0)} px`} />
            <input
              type="range"
              min={12}
              max={64}
              step={2}
              value={settings.sidePadding}
              onChange={(event) => onSidePaddingChange(Number(event.target.value))}
              className="teleprompter-slider w-full"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
