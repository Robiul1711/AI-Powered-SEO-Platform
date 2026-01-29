import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  ShieldCheck,
  PieChart,
  DollarSign,
  Download,
  Lock,
} from "lucide-react";
import GlowText from "../common/GlowText";
import { Link } from "react-router-dom";

const results = [
  {
    icon: <TrendingUp size={24} />,
    value: "+150%",
    label: "Organic Traffic",
    duration: "6 Months",
    color: "#AC6CFF",
  },
  {
    icon: <BarChart3 size={24} />,
    value: "Top 10",
    label: "Keyword Rankings",
    duration: "50+ Keywords",
    color: "#AC6CFF",
  },
  {
    icon: <ShieldCheck size={24} />,
    value: "+15",
    label: "Domain Authority",
    duration: "12 Months",
    color: "#AC6CFF",
  },
  {
    icon: <PieChart size={24} />,
    value: "+200%",
    label: "Lead Generation",
    duration: "Estimated",
    color: "#AC6CFF",
  },
];

const ExpectedResults = () => {
  return (
    <div className="section-padding-x py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-white uppercase tracking-wider">
          Expected Results
        </h2>
      </div>

      {/* Results Grid */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {results.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-[#111111]/80 border border-white/5 flex flex-col items-center text-center group hover:bg-[#111111] transition-all"
          >
            <div className="mb-4 text-[#AC6CFF] opacity-60 group-hover:scale-110 transition-transform">
              {result.icon}
            </div>
            <h4 className="text-2xl font-orbitron text-white font-bold mb-1 opacity-90">
              {result.value}
            </h4>
            <p className="text-white/40  uppercase tracking-widest mb-1">
              {result.label}
            </p>
            <span className="text-white/20 ">{result.duration}</span>
          </motion.div>
        ))}
      </div>

      {/* Total Investment Card */}
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-[#111111]/90 border border-white/10 relative overflow-hidden text-center"
        >
          {/* Subtle Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-[#AC6CFF]/50 to-transparent" />

          <div className="inline-flex w-16 h-16 rounded-2xl bg-[#AC6CFF] items-center justify-center mb-6 shadow-[0_0_30px_rgba(172,108,255,0.4)]">
            <DollarSign className="text-white" size={32} />
          </div>

          <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3">
            Total First Year Investment
          </p>
          <div className="mb-4 font-orbitron text-4xl font-bold">
          
              $40,600

          </div>
          <p className="text-white/30 text-xs font-inter mb-10">
            Setup: $4,000 + Monthly: $3,000 X 12 Months
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/simple-checkout" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-linear-to-r from-[#AC6CFF] to-[#6C9AFF] text-white font-inter font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <Lock size={16} />
              Accept & Proceed To Checkout
            </Link>
            <button className="w-full sm:w-auto px-10 py-4 rounded-xl bg-white/5 border border-white/10 text-white/70 font-inter font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Download size={16} />
              Download PDF
            </button>
          </div>
        </motion.div>

        {/* Bottom micro-copy */}
        <div className="flex flex-wrap justify-between items-center gap-4 mt-8 px-4 opacity-40">
          <div className="flex items-center gap-2 section-details">
            <TrendingUp size={14} className="text-[#AC6CFF]" />
            <span className=" uppercase tracking-widest text-white">
              AI-Powered Optimization
            </span>
          </div>
          <div className="flex items-center gap-2 section-details">
            <div className="w-1 h-1 rounded-full bg-white/50" />
            <span className=" uppercase tracking-widest text-white">
              Monthly Reports
            </span>
          </div>
          <div className="flex items-center gap-2 section-details">
            <div className="w-1 h-1 rounded-full bg-white/50" />
            <span className=" uppercase tracking-widest text-white">
              12-Month Strategy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpectedResults;
