import React from "react";
import { motion } from "framer-motion";
import { Target, ArrowRight, Sparkles } from "lucide-react";
import GlowText from "../common/GlowText";
import TagLines from "../common/TagLines";

const ProposalHeader = () => {
  return (
    <div className="section-padding-x pt-10 pb-16 flex flex-col items-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <TagLines> AI • Generated Proposal</TagLines>
      </motion.div>

      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <span className="text-white">Your Custom</span>
          <GlowText className="uppercase">SEO Proposal</GlowText>
        </h1>
        <p className="text-white/50 font-inter text-sm md:text-base max-w-2xl mx-auto">
          Based On Your Website Analysis, Here's Our Recommended Growth Strategy
        </p>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full  p-6 rounded-2xl bg-[#111111]/80 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#3C3C3C]/32 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />

        {/* Prepared For */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#AC6CFF] to-[#6C9AFF] flex items-center justify-center shadow-[0_0_20px_rgba(172,108,255,0.3)]">
            <Target className="text-white" size={24} />
          </div>
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
              Prepared For
            </p>
            <p className="text-white font-inter font-semibold text-lg">
              example.com
            </p>
          </div>
        </div>

        {/* Score Comparison */}
        <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto justify-between md:justify-end">
          <div className="text-center">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">
              Current Score
            </p>
            <span className="text-2xl md:text-3xl font-orbitron text-white/90">
              67
            </span>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="text-white/20" size={20} />
          </div>

          <div className="text-center">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">
              Target Score
            </p>
            <GlowText className="text-2xl md:text-3xl">94</GlowText>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProposalHeader;
