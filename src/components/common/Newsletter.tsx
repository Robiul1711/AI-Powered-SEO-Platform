import React from "react";

import Title from "@/components/common/Title";
import TagLines from "./TagLines";
import GlowText from "./GlowText";

const Newsletter = () => {
  return (
    <section className="section-padding-x">
      {/* Heading with Glow Effect */}
      <div className="flex flex-col items-center gap-4 font-inter max-w-4xl mx-auto text-center mb-16">
        <TagLines>Review</TagLines>
        <Title level="title48" className="text-white">
          Want To Write <GlowText>A New Story?</GlowText>
        </Title>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl font-inter">
          Get exclusive updates, tips, and insights delivered straight to your
          inbox.
        </p>
      </div>
      {/* Newsletter Container */}
      <div className="w-full max-w-4xl mx-auto  bg-[#141414] border border-white/5 rounded-[32px] p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col gap-4">
          {/* Input Field */}
          <input
            type="email"
            placeholder="Add Mail And Subscribe"
            className="w-full bg-[#222222] border border-white/5 rounded-2xl py-5 px-6 text-white/60 placeholder:text-white/30 focus:outline-none focus:border-[#AC6CFF]/50 transition-all"
          />

          {/* Send Button */}
          <button className="w-full py-4 rounded-2xl text-white font-semibold text-xl transition-transform active:scale-[0.98] bg-[linear-gradient(90deg,#AC6CFF_0%,#818CFF_100%)] shadow-[0_4px_15px_rgba(172,108,255,0.3)] hover:brightness-110">
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;