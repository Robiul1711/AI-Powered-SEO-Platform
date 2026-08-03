import bannerBg from "@/assets/images/bannerBg1.webp";
import mike from "@/assets/images/mike.webp";
import cloud from "@/assets/images/cloud.webp";
import bannerBg2 from "@/assets/images/bannerBg2.webp";

import CommonButton from "../common/CommonButton";
import TagLines from "../common/TagLines";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <div className="relative w-full pt-32 lg:pt-40 overflow-hidden">
      {/* Floating images - hidden on mobile for performance */}
      <div className="hidden md:flex justify-between items-center absolute w-full top-[35%] translate-y-[-50%] pointer-events-none z-0">
        <motion.img
          src={mike}
          alt="Mike"
          width="112"
          height="112"
          loading="lazy"
          decoding="async"
          className="w-20 md:w-28 lg:w-auto"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.img
          src={cloud}
          alt="Cloud"
          width="112"
          height="112"
          loading="lazy"
          decoding="async"
          className="w-20 md:w-28 lg:w-auto"
          animate={{ y: [0, -25, 0], rotate: 360 }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bannerBg}
          alt=""
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover rounded-b-[30px] md:rounded-b-[50px]"
        />
      </div>

      {/* Content Container */}
      <div className="px-2 flex flex-col items-center text-center max-w-[1200px] mx-auto">
        <TagLines>AI-Powered SEO Automation</TagLines>

        <h1 className="text-3xl xs:text-4xl sm:text-6xl mt-10 font-semibold text-white mb-6 leading-tight font-orbitron">
          AI-Powered SEO Platform That{" "}
          <span className="text-[#B57CFF]">Scales Revenue</span>
        </h1>

        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-3xl font-inter">
          Transform your website's visibility with intelligent automation. Our
          AI analyzes, optimizes, and delivers measurable results while you
          focus on growing your business
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <CommonButton className="bg-bg-custom" to="/ai-seo-audit" as="link">
            Run Free AI SEO Audit
          </CommonButton>
          <CommonButton
            as="link"
            to="/dashboard"
            className="bg-[#FFFFFF]/35 border border-white/20 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base hover:border-[#fff] hover:text-[#ffff]"
          >
            Access Client Dashboard
          </CommonButton>
        </div>
      </div>

      {/* Bottom Centered Image */}
      <div className="mt-10 relative flex justify-center w-full">
        <img
          src={bannerBg2}
          alt="Dashboard Graphic"
          width="1200"
          height="675"
          decoding="async"
          className="max-w-[90%] lg:max-w-[1200px] w-full h-auto object-contain mx-auto"
        />
        {/* Subtle glow effect behind the bottom image */}
        <div className="absolute inset-0 bg-[#AC6CFF] opacity-10 blur-[100px] rounded-full -z-10 transform scale-75 translate-y-20"></div>
      </div>
    </div>
  );
};

export default Banner;

