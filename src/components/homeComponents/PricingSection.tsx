import React from "react";
import TagLines from "../common/TagLines";
import Title from "../common/Title";
import GlowText from "../common/GlowText";

const PricingSection = () => {
  return (
    <div className="section-padding-x section-padding-y">
      <div className="flex flex-col items-center gap-4 font-inter max-w-4xl mx-auto text-center ">
        <TagLines>Simple, Transparent Pricing</TagLines>
        <Title level="title48" className="text-white">
          Choose Your
           <GlowText> Growth Plan</GlowText>
        </Title>
        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl text-center font-inter">
          Al automation + human expertise. Pick the plan that matches your
          goals.
        </p>
      </div>
    </div>
  );
};

export default PricingSection;
