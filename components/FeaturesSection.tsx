'use client';

import { motion } from 'framer-motion';
import { Mic, Type, Volume2, FlipHorizontal, Smartphone, Wand2, Sparkles } from 'lucide-react';
import Link from 'next/link';

const features = [
  { icon: Type, title: '字号/行距/边距', description: '根据录制场景自由调节，大屏小屏都舒服' },
  { icon: Volume2, title: '滚动速度', description: '10-200 px/s 无级调节，匹配你的语速' },
  { icon: FlipHorizontal, title: '镜像模式', description: '适配提词器硬件反射，照着镜头读也对' },
  { icon: Smartphone, title: '手机友好', description: 'iPhone/iPad 浏览器直接用，可加到主屏幕' },
  { icon: Sparkles, title: '草稿自动保存', description: '文稿存在浏览器本地，下次打开还在' },
  { icon: Wand2, title: '沉浸式播放', description: '全屏滚动，不被干扰，专注表达' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4"
          >
            <Wand2 className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700">核心功能</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            专为口播创作者打造的简洁提词器
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            不用下载 App，不用注册，打开网页就能用
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-orange-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/teleprompter"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Mic className="w-5 h-5" />
            立即使用提词器
          </Link>
        </div>
      </div>
    </section>
  );
}
