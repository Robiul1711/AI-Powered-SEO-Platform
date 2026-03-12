import React from "react";
import { AlertCircle, ArrowLeft, RefreshCw, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authBg from "@/assets/images/authBg1.png";
import GlowText from "@/components/common/GlowText";

const FailedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img src={authBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full px-6">
        <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-10 md:p-16 shadow-2xl text-center relative overflow-hidden group">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
          
          {/* Animated Error Icon Container */}
          <div className="mb-8 relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white/5 border border-red-500/20 w-24 h-24 rounded-full flex items-center justify-center shadow-inner">
              <AlertCircle size={48} className="text-red-500 animate-in zoom-in duration-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-white tracking-tight">
            Payment <GlowText className="text-red-500">Failed</GlowText>
          </h1>

          <p className="text-white/50 font-inter text-base mb-10 leading-relaxed">
            We couldn't process your transaction. Please check your card details and try again.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] text-white font-inter font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(172,108,255,0.3)] active:scale-95"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
            <Link
              to="/contact"
              className="w-full px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 font-inter font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              Contact Support
            </Link>
            <Link
              to="/"
              className="mt-2 text-white/30 hover:text-white/60 font-inter text-sm flex items-center justify-center gap-2 transition-all"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-red-500 rounded-full blur-[120px] opacity-10 -z-10"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#AC6CFF] rounded-full blur-[120px] opacity-10 -z-10"></div>
    </div>
  );
};

export default FailedPage;
