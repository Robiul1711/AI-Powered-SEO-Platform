import bannerBg from "@/assets/images/bannerBg.png";
import bannerBg2 from "@/assets/images/bannerBg2.png";

import CommonButton from "../common/CommonButton";
import TagLines from "../common/TagLines";
import GlowText from "../common/GlowText";

const Banner = () => {
  return (
    <div className="relative w-full  pt-32 lg:pt-40 overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bannerBg}
          alt=""
          className="w-full h-full object-cover rounded-b-[50px] "
        />
      </div>

      {/* Content Container */}
      <div className="section-padding-x flex flex-col items-center text-center max-w-[1200px]  mx-auto">
        <TagLines> AI-Powered SEO Automation</TagLines>

        <h1 className="text-4xl sm:text-6xl mt-10 font-semibold text-white mb-6 leading-tight font-orbitron">
          AI-Powered SEO Platform That 
          <GlowText className=""> Automates Growth</GlowText>
        </h1>

        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-3xl font-inter">
          Transform your website's visibility with intelligent automation. Our
          AI analyzes, optimizes, and delivers measurable results while you
          focus on growing your business
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <CommonButton className="bg-bg-custom text-white! px-10! py-4! text-lg! shadow-[0_0_30px_rgba(172,108,255,0.4)]">
            Run Free AI SEO Audit
          </CommonButton>
          <CommonButton
            as="link"
            to="/services"
            className="bg-[#FFFFFF]/35 border border-white/20 text-white! px-10! py-4! text-lg! hover:border-[#AC6CFF] hover:text-[#AC6CFF]!"
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
