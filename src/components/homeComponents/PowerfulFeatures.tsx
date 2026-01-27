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
import featureCardBg from "@/assets/images/featureCardBg.png";
import videoBg from "@/assets/images/videoBg.png";
import VideoButton from "../common/VideoButton";

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
    <div className="section-padding-x ">
      <div className="flex flex-col items-center gap-4 font-inter max-w-4xl mx-auto text-center ">
        <TagLines>Powerful Features</TagLines>
        <Title level="title48" className="text-white">
          Everything You Need to <GlowText>Dominate Search</GlowText>
        </Title>
        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl text-center font-inter">
          Our Al platform combines cutting-edge technology with proven SEO
          strategies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-16 font-inter">
        {steps.map((step) => (
          <div
            key={step.id}
            className="
    group relative p-6
    rounded-[24px]
    border border-[rgba(255,255,255,0.21)]

  "
            style={{
              backgroundImage: `url(${featureCardBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col  gap-3">
              {/* Icon Container */}
              <div
                className="p-4 "
                style={{
                  backgroundImage: `url(${iconBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "fit-content",
                }}
              >
                {step.icon}
              </div>

              <Title level="title20" className="text-white font-semibold">
                {step.title}
              </Title>
              <p className="text-white/50 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>

      <div className="relative">
        <img src={videoBg} alt="" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

        <VideoButton onClick={() => {}} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default PowerfulFeatures;
