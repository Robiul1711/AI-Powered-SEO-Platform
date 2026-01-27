import React from "react";
import StartFree from "@/assets/images/startFreeToday.png";
import TagLines from "../common/TagLines";
import GlowText from "../common/GlowText";
import CommonButton from "../common/CommonButton";
import Title from "../common/Title";
const StartFreeToday = () => {
  return (
    <div className="section-padding-x section-padding-y relative">
      <img src={StartFree} alt="" />
      {/* Content Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center   mx-auto">
        <TagLines>Start Free Today</TagLines>

        <Title level="title48" className="max-w-2xl">
          Ready <GlowText>Transform</GlowText>Your SEO
        </Title>

        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl text-center font-inter">
          Join 500+ businesses already using AI to dominate their market. Get
          your free audit in 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <CommonButton className="bg-white text-Primary! px-10! py-4! text-lg! shadow-[0_0_30px_rgba(172,108,255,0.4)]">
            Start Free AI Audit
          </CommonButton>
          <CommonButton
            as="link"
            to="/services"
            className="bg-[#FFFFFF]/35 border border-white/20 text-white! px-10! py-4! text-lg! hover:border-[#AC6CFF] hover:text-[#AC6CFF]!"
          >
            Access Client Dashboard
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default StartFreeToday;
