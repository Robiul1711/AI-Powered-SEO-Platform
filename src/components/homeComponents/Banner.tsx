import bannerBg from "@/assets/images/bannerBg1.png";
import mike from "@/assets/images/mike.png";
import cloud from "@/assets/images/cloud.png";
import bannerBg2 from "@/assets/images/bannerBg2.png";

import CommonButton from "../common/CommonButton";
import TagLines from "../common/TagLines";
import GlowText from "../common/GlowText";

import { motion } from "motion/react";
import { FlipWords } from "../ui/flipwords";

const Banner = () => {
  return (
    <div className="relative w-full  pt-32 lg:pt-40 overflow-hidden ">
      <div className="flex justify-between items-center  absolute w-full top-[35%] translate-y-[-50%] pointer-events-none z-0">
        <motion.img
          src={mike}
          alt="Mike"
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
          className="w-full h-full object-cover rounded-b-[30px] md:rounded-b-[50px] "
        />
      </div>

      {/* Content Container */}
      <div className="px-2 flex flex-col items-center text-center max-w-[1200px]  mx-auto">
        <TagLines> AI-Powered SEO Automation</TagLines>

        <h1 className="text-3xl xs:text-4xl sm:text-6xl mt-10 font-semibold text-white mb-6 leading-tight font-orbitron">
          AI-Powered SEO Platform That {""}
          <GlowText className="">
            <FlipWords
              words={[
                "Scales Revenue",
                "Optimizes Strategy",
                "Drives Traffic",
                "Automates Growth",
                "Enhances SEO",
              ]}
              duration={3000}
              className="text-white"
            />
          </GlowText>
        </h1>

        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-3xl font-inter">
          Transform your website's visibility with intelligent automation. Our
          AI analyzes, optimizes, and delivers measurable results while you
          focus on growing your business
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <CommonButton className="bg-bg-custom">
            Run Free AI SEO Audit
          </CommonButton>
          <CommonButton
            as="link"
            to="/dashboard"
            className="bg-[#FFFFFF]/35 border border-white/20 text-white  px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base hover:border-[#fff] hover:text-[#ffff]"
          >
            Access Client Dashbord
          </CommonButton>
        </div>
      </div>

      {/* Bottom Centered Image */}
      <div className="mt-10  relative flex justify-center w-full">
        <img
          src={bannerBg2}
          alt=""
          className="max-w-[90%] lg:max-w-[1200px] w-full h-auto object-contain mx-auto"
        />
        {/* Subtle glow effect behind the bottom image */}
        <div className="absolute inset-0 bg-[#AC6CFF] opacity-10 blur-[100px] rounded-full -z-10 transform scale-75 translate-y-20"></div>
      </div>
    </div>
  );
};

export default Banner;
