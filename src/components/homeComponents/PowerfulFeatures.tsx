import React from "react";
import TagLines from "../common/TagLines";
import Title from "../common/Title";
import {
  AlPowred,
  SmartKeyword,
  Automated,
  Security,
  RealTime,
  Support,
} from "../common/SVG";
import GlowText from "../common/GlowText";
import iconBg from "@/assets/images/iconBg.png";
import featureCardBg from "@/assets/images/featureCardBg.webp";

import VideoBannr from "../common/VideoBannr";

const PowerfulFeatures = () => {
  const steps = [
    {
      id: "01",
      icon: <AlPowred />,
      title: "Al-Powered Analysis",
      desc: "Deep learning algorithms analyze 200+ ranking factors to identify your biggest opportunities.",
    },
    {
      id: "02",
      icon: <SmartKeyword />,
      title: "Smart Keyword Research",
      desc: "Discover high-impact keywords your competitors miss. Al finds hidden opportunities.",
    },
    {
      id: "03",
      icon: <Automated className="size-6" />,
      title: "Automated Optimization",
      desc: "Get actionable recommendations automatically prioritized by potential impact.",
    },
    {
      id: "04",
      icon: <Security />,
      title: "Security & Compliance",
      desc: "Enterprise-grade security with GDPR compliance. Your data stays protected.",
    },
    {
      id: "05",
      icon: <RealTime />,
      title: "Real-Time Tracking",
      desc: "24/7 tracking of rankings, backlinks, and technical health with instant alerts.",
    },
    {
      id: "06",
      icon: <Support />,
      title: "Dedicated Support",
      desc: "Human experts available when you need them. AI + human expertise combined.",
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col items-center gap-4 font-inter max-w-4xl mx-auto text-center section-padding-x ">
        <TagLines>Powerful Features</TagLines>
        <Title level="title48" className="text-white">
          Everything You Need to <GlowText>Dominate Search</GlowText>
        </Title>
        <p className="text-base sm:text-lg text-white/60  max-w-2xl text-center ">
          Our Al platform combines cutting-edge technology with proven SEO
          strategies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xmd:grid-cols-3 gap-6 py-16 font-inter section-padding-x ">
        {steps.map((step) => (
          <div
            key={step.id}
            className="group relative md:p-8 p-4 rounded-[24px] border border-white/10 transition-all duration-500 hover:border-[#AC6CFF]/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(172,108,255,0.15)] cursor-pointer overflow-hidden backdrop-blur-sm"
            style={{
              backgroundImage: `url(${featureCardBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Subtle Hover Gradient Glow */}
            <div className="absolute -inset-1 bg-linear-to-r from-[#AC6CFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            <div className="flex flex-col gap-6 relative z-10 h-full">
              {/* Icon Container */}
              <div
                className="p-3 sm:p-5  transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_25px_rgba(172,108,255,0.3)] rounded-2xl flex items-center justify-center"
                style={{
                  backgroundImage: `url(${iconBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "fit-content",
                }}
              >
                <div className="transition-transform duration-500 group-hover:scale-110">
                  {step.icon}
                </div>
              </div>

              <div className="space-y-3">
                <Title
                  level="title20"
                  className="text-white font-semibold transition-colors duration-300 group-hover:text-[#AC6CFF]"
                >
                  {step.title}
                </Title>
                <p className="text-white/60 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/90">
                  {step.desc}
                </p>
              </div>

              {/* Decorative line on hover */}
              <div className="w-0 h-[2px] bg-[#AC6CFF] transition-all duration-500 group-hover:w-12" />
            </div>
          </div>
        ))}
      </div>
      <div>
        <VideoBannr  />
      </div>
    </div>
  );
};

export default PowerfulFeatures;
