import type { Metadata } from 'next';
import TeleprompterApp from '@/components/teleprompter/TeleprompterApp';

export const metadata: Metadata = {
  title: '录视频提词器 | 创作者工具箱',
  description: '适合 iPhone 和 iPad 录视频使用的简洁提词器，支持文稿输入、速度调节、字号行距边距调整与镜像模式。草稿自动保存，免费使用。',
};

export default function TeleprompterPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <TeleprompterApp />
    </main>
  );
}
