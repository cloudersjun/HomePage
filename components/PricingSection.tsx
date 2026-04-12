'use client';

import { motion } from 'framer-motion';
import { Check, Star, Crown, Gem } from 'lucide-react';

const plans = [
  {
    name: '体验版',
    icon: Star,
    price: '免费',
    period: '',
    description: '适合单店体验，感受AI营销的便利',
    features: [
      '每月10次生成额度',
      '基础门店模板使用',
      '标准图片质量',
      '朋友圈文案生成',
      '社区支持',
    ],
    cta: '立即体验',
    highlighted: false,
    gradient: 'from-gray-400 to-gray-500',
  },
  {
    name: '标准版',
    icon: Crown,
    price: '¥99',
    period: '/月',
    description: '适合单家门店，满足日常营销需求',
    features: [
      '每月50次生成额度',
      '全部门店模板解锁',
      '高清图片生成',
      '多平台文案适配',
      'AI对话优化',
      '营销数据报告',
      '优先客服支持',
    ],
    cta: '开始订阅',
    highlighted: true,
    gradient: 'from-orange-400 to-pink-400',
  },
  {
    name: '连锁版',
    icon: Gem,
    price: '¥299',
    period: '/月',
    description: '适合连锁门店，多店统一管理',
    features: [
      '每月200次生成额度',
      '自定义品牌模板',
      '超高清图片生成',
      '全平台内容定制',
      '高级AI对话',
      '深度数据分析',
      '专属客户经理',
      '多门店管理后台',
    ],
    cta: '开始订阅',
    highlighted: false,
    gradient: 'from-purple-400 to-blue-400',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4"
          >
            <Crown className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700">灵活定价</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            选择适合你的方案
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            从免费体验到连锁门店方案，满足不同规模宠物门店的营销需求
          </motion.p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all ${
                plan.highlighted
                  ? 'ring-4 ring-orange-400 scale-105'
                  : 'border border-orange-100'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                    最受欢迎
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://mp.weixin.qq.com"
                target="_blank"
                className={`block w-full text-center py-3 rounded-full font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-md hover:shadow-lg'
                    : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* FAQ hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            有疑问？查看我们的{' '}
            <a href="#" className="text-orange-500 hover:underline font-medium">
              常见问题
            </a>{' '}
            或{' '}
            <a href="#about" className="text-orange-500 hover:underline font-medium">
              联系客服
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
