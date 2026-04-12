'use client';

import { motion } from 'framer-motion';
import { Wand2, Image, FileText, MessageSquare, BarChart3, Clock } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: '一键生成营销包',
    description: '上传宠物照片和促销主题，AI自动生成全套营销素材，包含海报、文案、社交媒体内容',
    color: 'from-orange-400 to-pink-400',
  },
  {
    icon: Image,
    title: '智能图片处理',
    description: 'AI智能美化宠物照片，生成专业级宠物写真和促销海报，支持多种风格模板',
    color: 'from-pink-400 to-purple-400',
  },
  {
    icon: FileText,
    title: '多平台文案生成',
    description: '根据宠物特点和促销信息，自动生成适配朋友圈、抖音、小红书等平台的营销文案',
    color: 'from-purple-400 to-blue-400',
  },
  {
    icon: MessageSquare,
    title: 'AI对话优化',
    description: '支持多轮对话交互，根据反馈不断优化营销内容，直到你满意为止',
    color: 'from-blue-400 to-green-400',
  },
  {
    icon: BarChart3,
    title: '数据分析',
    description: '追踪营销效果，分析哪些内容更受欢迎，帮助优化后续营销策略',
    color: 'from-green-400 to-orange-400',
  },
  {
    icon: Clock,
    title: '节省90%时间',
    description: '原本需要数小时的营销内容制作，现在只需几分钟，让店主专注于核心业务',
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
            AI赋能，让营销如此简单
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            从图片生成到文案创作，从多平台适配到效果追踪，一站式解决宠物门店营销需求
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
