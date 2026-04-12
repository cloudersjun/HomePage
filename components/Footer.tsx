import { PawPrint, MapPin, MessageCircle, AtSign } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-orange-50 to-pink-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-orange-200">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/mineclaw.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover hidden group-hover:block"
                  style={{ 
                    filter: 'sepia(1) hue-rotate(320deg) saturate(2) brightness(1.1)'
                  }}
                />
                <PawPrint className="w-6 h-6 text-white group-hover:hidden" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                宠店营销Agent
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              AI驱动的宠物门店智能营销平台<br />
              专注为线下宠物门店提供一站式营销解决方案
            </p>
            {/* 营销矩阵社交链接 */}
            <div className="flex gap-4">
              {['小红书', '抖音', '微信'].map((item) => (
                <span key={item} className="px-3 py-1 bg-white text-orange-400 border border-orange-200 rounded-full text-xs font-medium cursor-default hover:bg-orange-50 transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">产品</h3>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-gray-600 hover:text-orange-500 transition-colors">功能介绍</Link></li>
              <li><Link href="/#pricing" className="text-gray-600 hover:text-orange-500 transition-colors">定价方案</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">使用教程</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">常见问题</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">公司</h3>
            <ul className="space-y-2">
              <li><Link href="/#about" className="text-gray-600 hover:text-orange-500 transition-colors">关于我们</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">隐私政策</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">服务条款</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-4 h-4" />
                <span>微信：Cloudersjun</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <AtSign className="w-4 h-4" />
                <span>QQ：983587768</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-1" />
                <span>四川省成都市高新区中和街道</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & ICP */}
        <div className="pt-8 text-center text-gray-500 text-sm space-y-2">
          <p>© {new Date().getFullYear()} 宠店营销Agent. All rights reserved.</p>
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
