'use client';

import { motion } from 'framer-motion';
import { Wand2, Image, FileText, MessageSquare, BarChart3, Clock } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: '门店营销包一键生成',
    description: '上传门店宠物照片和促销主题，AI自动生成全套营销素材，海报、文案、社交平台内容一次搞定',
    color: 'from-orange-400 to-pink-400',
  },
  {
    icon: Image,
    title: '门店专属海报',
    description: 'AI智能美化门店宠物照片，生成专业级促销海报，多种门店营销模板即选即用',
    color: 'from-pink-400 to-purple-400',
  },
  {
    icon: FileText,
    title: '多平台文案自动适配',
    description: '根据门店活动和宠物特点，自动生成朋友圈、抖音、小红书等平台营销文案',
    color: 'from-purple-400 to-blue-400',
  },
  {
    icon: MessageSquare,
    title: 'AI对话式优化',
    description: '像和助手聊天一样调整营销内容，AI根据门店需求不断优化，直到满意为止',
    color: 'from-blue-400 to-green-400',
  },
  {
    icon: BarChart3,
    title: '门店营销数据追踪',
    description: '追踪每篇营销内容的效果，分析哪些宠物和内容更吸引客户，优化门店营销策略',
    color: 'from-green-400 to-orange-400',
  },
  {
    icon: Clock,
    title: '门店人力节省90%',
    description: '原本需要专职运营的营销工作，现在几分钟搞定，让门店员工专注于照顾宠物和客户服务',
    color: 'from-orange-400 to-red-400',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4"
          >
            <Wand2 className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700">强大功能</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            专为宠物门店打造的AI营销能力
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            从门店海报到社交文案，从多平台适配到效果追踪，一站式解决宠物门店营销难题
          </motion.p>
        </div>

        {/* Features grid */}
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
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
