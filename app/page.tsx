import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import "./globals.css";

export const metadata: Metadata = {
  title: "宠店营销Agent - AI驱动的宠物门店营销内容生成平台",
  description: "上传宠物照片，AI一键生成专业营销素材。海报、文案、社交媒体内容，统统搞定。让每一只宠物都成为营销明星！",
  keywords: "宠物店营销,AI营销,宠物营销工具,海报生成,文案生成,微信小程序",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
