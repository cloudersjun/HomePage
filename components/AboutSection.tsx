'use client';

import { motion } from 'framer-motion';
import { Heart, Target, Users, Mail, Phone, MessageCircle } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full mb-4"
          >
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-pink-700">关于我们</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            用AI让每只宠物被更多人喜爱
          </motion.h2>
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">我们的故事</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              我们是一支热爱宠物、深耕AI技术的团队。在走访了数百家宠物店后，我们发现：
              店主们花了大量时间照顾毛孩子，却很难抽出精力做专业的营销内容。
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              于是我们创造了「宠店营销Agent」——让AI成为每个宠物店的营销助手。
              店主只需上传照片，剩下的交给AI。
            </p>
            <p className="text-gray-700 leading-relaxed">
              现在，已有超过1000+宠物店在使用我们的产品，每月生成超过10000+营销素材。
              我们希望帮助更多宠物店，让更多可爱的毛孩子被看见、被喜爱。
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 min-h-[300px] flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🐾</div>
              <p className="text-2xl font-bold text-gray-800 mb-2">让营销变得如此简单</p>
              <p className="text-gray-600">店主专注于照顾毛孩子，营销交给我们</p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Target,
              title: '专注价值',
              description: '我们专注于为宠物店创造真实的营销价值，每一分投入都要有回报',
            },
            {
              icon: Users,
              title: '用户至上',
              description: '倾听用户声音，持续迭代优化，让产品真正解决痛点',
            },
            {
              icon: Heart,
              title: '热爱宠物',
              description: '团队每个成员都是宠物爱好者，我们用爱心做产品',
            },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">准备好开始了吗？</h3>
          <p className="text-lg mb-8 opacity-90">
            立即使用微信小程序体验AI营销，或联系我们获取专属方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://mp.weixin.qq.com"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-500 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              微信小程序体验
            </a>
            <a
              href="mailto:support@petmarketing.cn"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white rounded-full font-semibold border-2 border-white hover:bg-white/10 transition-all"
            >
              <Mail className="w-5 h-5" />
              联系客服
            </a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>support@petmarketing.cn</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>400-123-4567</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
