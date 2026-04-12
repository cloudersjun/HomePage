'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, PawPrint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/#features', label: '功能' },
    { href: '/#pricing', label: '定价' },
    { href: '/#about', label: '关于' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center overflow-hidden shadow-inner"
            >
              {/* 这里预留头像图片路径，如果没有图片则显示图标 */}
              <img 
                src="/mineclaw.png" 
                alt="Logo" 
                className="w-full h-full object-cover hidden group-hover:block" 
                style={{ 
                  filter: 'sepia(1) hue-rotate(320deg) saturate(2) brightness(1.1)'
                }}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <PawPrint className="w-6 h-6 text-white group-hover:hidden" />
              <div className="w-full h-full flex items-center justify-center group-hover:hidden">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              宠店营销Agent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <motion.a
              href="https://mp.weixin.qq.com"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              立即体验
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-700 hover:text-orange-500 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://mp.weixin.qq.com"
                target="_blank"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full font-medium"
                onClick={() => setIsOpen(false)}
              >
                立即体验
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
