import { Mic, MessageCircle, AtSign } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-orange-50 to-pink-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-orange-200">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                创作者工具箱
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              为口播创作者、知识博主打造的<br />
              免费网页提词器
            </p>
            <div className="flex gap-4">
              {['小红书', '抖音', '微信'].map((item) => (
                <span key={item} className="px-3 py-1 bg-white text-orange-400 border border-orange-200 rounded-full text-xs font-medium cursor-default hover:bg-orange-50 transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">工具</h3>
            <ul className="space-y-2">
              <li><Link href="/teleprompter" className="text-gray-600 hover:text-orange-500 transition-colors">网页提词器</Link></li>
              <li><Link href="/#faq" className="text-gray-600 hover:text-orange-500 transition-colors">常见问题</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">关于</h3>
            <ul className="space-y-2">
              <li><Link href="/#faq" className="text-gray-600 hover:text-orange-500 transition-colors">关于我们</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">隐私政策</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">服务条款</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">联系</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-4 h-4" />
                <span>微信：Cloudersjun</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <AtSign className="w-4 h-4" />
                <span>QQ：983587768</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-gray-500 text-sm space-y-2">
          <p>© {new Date().getFullYear()} 创作者工具箱. All rights reserved.</p>
          <p>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              蜀ICP备2025127973号-3
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
