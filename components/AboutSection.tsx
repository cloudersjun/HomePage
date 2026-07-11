'use client';

import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, AtSign, MapPin } from 'lucide-react';

const faqs = [
  {
    q: '提词器需要下载 App 吗？',
    a: '不需要。提词器是网页应用，在 iPhone/iPad/Mac 的浏览器里打开就能用。建议添加到主屏幕，体验接近原生 App。',
  },
  {
    q: '收费吗？',
    a: '完全免费，不登录、不注册、不加水印。如果你觉得有用，推荐给朋友就行。',
  },
  {
    q: '支持镜像模式吗？',
    a: '支持。镜像模式适配提词器硬件反射，照着镜头读文字也是正的。',
  },
  {
    q: '文稿会上传到服务器吗？',
    a: '不会。文稿只存在你浏览器的 localStorage 里，下次打开还在。换设备或清浏览器缓存会丢失。',
  },
  {
    q: '手机上字体太小怎么办？',
    a: '在设置里调字号、行距、边距。字号支持 24-120px，手机录视频建议 60-80px。',
  },
  {
    q: '能调滚动速度吗？',
    a: '可以。滚动速度 10-200 px/s 无级调节，匹配你的语速。也可以在播放时实时调速。',
  },
];

export default function AboutSection() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full mb-4"
          >
            <HelpCircle className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-pink-700">常见问题</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            你可能想知道的
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">有其他问题？</h3>
          <p className="text-lg mb-8 opacity-90">
            加微信，拉你进创作者交流群
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm opacity-90">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>微信：Cloudersjun</span>
            </div>
            <div className="flex items-center gap-2">
              <AtSign className="w-4 h-4" />
              <span>QQ：983587768</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>成都</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
