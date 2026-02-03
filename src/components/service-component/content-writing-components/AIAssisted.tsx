import React from "react";
import image from "@/assets/images/aiAssistance.png";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";
import { GreenTiq } from "@/components/common/SVG";
const AIAssisted = () => {
  return (
    <section className="section-padding-y section-padding-x">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Image Container */}
        <div className="flex-1 w-full max-w-3xl">
          <div className="  ">
            <img
              src={image}
              alt="About Me profile"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
        {/* Text Content */}
        <div className="flex-1 tex text-left">
          <div className="space-y-2">
            <TagLines className="font-inter">AI-Assisted</TagLines>
            <Title
              level="title48"
              className="text-white font-orbitron uppercase tracking-tight"
            >
              Al-Assisted, Human-Perfected
            </Title>
          </div>

          <p className=" font-medium text-white/60 leading-relaxed font-inter">
            We leverage Al for research, data analysis, and content outlines but
            every piece is crafted, edited, and refined by experienced content
            writers.
          </p>
          <div className="space-y-4 mt-6 md:mt-12">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-300/10">
                <GreenTiq />
              </div>
              <div>
                <h1 className=" font-orbitron font-semibold tracking-tight text-white">
                  Original Content
                </h1>
                <p className=" font-medium text-white/60 leading-relaxed font-inter">
                  Discovering all pages and resources
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-300/10">
                <GreenTiq />
              </div>
              <div>
                <h1 className=" font-orbitron font-semibold tracking-tight text-white">
                  Expert Writers
                </h1>
                <p className=" font-medium text-white/60 leading-relaxed font-inter">
                  Industry specialists with 5+ years of content marketing
                  experience
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-300/10">
                <GreenTiq />
              </div>
              <div>
                <h1 className=" font-orbitron font-semibold tracking-tight text-white">
                  Quality Guarantee
                </h1>
                <p className=" font-medium text-white/60 leading-relaxed font-inter">
                  Multiple rounds of editing and fact-checking before delivery
                </p>
              </div>
            </div>
          </div>
          {/* Optional: Add a Signature or CTA Button here for extra polish */}
        </div>
      </div>
    </section>
  );
};

export default AIAssisted;
