import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Ghost } from "lucide-react";
import authBg from "@/assets/images/authBg1.png";
import GlowText from "@/components/common/GlowText";

const NotFound = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 -z-10">
        <img src={authBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full px-4">
        <div className="bg-[#111111]/80 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 shadow-2xl text-center relative overflow-hidden group">
          {/* Subtle Top Gradient Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-linear-to-r from-transparent via-[#AC6CFF] to-transparent opacity-50"></div>

          {/* 404 Visual Header */}
          <div className="mb-12 relative inline-flex items-center justify-center">
            {/* Animated Glow behind the ghost */}
            <div className="absolute inset-0 bg-[#AC6CFF] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse"></div>
            <div className="relative bg-white/5 border border-white/10 w-32 h-32 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Ghost size={60} className="text-[#AC6CFF] animate-bounce" />
            </div>

            {/* 404 Background Text */}
            <div className="absolute -bottom-6 -right-12 text-8xl font-orbitron font-black text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors duration-500">
              404
            </div>
          </div>

          {/* Text Content */}
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 text-white tracking-widest uppercase italic">
            Lost in <GlowText className="text-[#AC6CFF]">Space?</GlowText>
          </h1>

          <p className="text-gray-400 font-inter text-base md:text-lg mb-12 leading-relaxed max-w-md mx-auto">
            The coordinates you provided don't exist in our databank. The page may have been moved, deleted, or never existed in this dimension.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-linear-to-r from-[#AC6CFF] to-[#6C9AFF] text-white font-orbitron font-bold text-sm flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-[0_4px_30px_rgba(172,108,255,0.4)] active:scale-95 group/btn"
            >
              <Home size={18} className="group-hover/btn:-translate-y-0.5 transition-transform" />
              RETRACT TO HOME
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 font-orbitron font-bold text-sm flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              <ArrowLeft size={18} />
              PREVIOUS SECTOR
            </button>
          </div>

          {/* Footer Decoration */}
          <div className="mt-12 pt-8 ">
            <div className="flex items-center justify-center gap-2 text-gray-600 text-[10px] font-orbitron tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500/50 animate-pulse"></span>
              Error Code: 0x404_PAGE_NOT_FOUND
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Orbs */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#AC6CFF] rounded-full blur-[150px] opacity-[0.07] -z-10 animate-slow-spin"></div>
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#6C9AFF] rounded-full blur-[150px] opacity-[0.07] -z-10 animate-slow-spin-reverse"></div>
    </div>
  );
};

export default NotFound;
