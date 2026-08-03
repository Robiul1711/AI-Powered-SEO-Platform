import React from "react";
import { AlertCircle, ArrowLeft, RefreshCw, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authBg from "@/assets/images/authBg1.webp";
import GlowText from "@/components/common/GlowText";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img src={authBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      </div>

      <div className="max-w-xl w-full px-6 text-center">
        {/* Warning Icon */}
        <div className="mb-10 relative inline-block">
          <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative bg-[#111111]/80 border border-red-500/30 p-8 rounded-full shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <AlertCircle size={80} className="text-red-500 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-white tracking-tight">
          Payment <GlowText className="text-red-500">Failed</GlowText>
        </h1>

        <p className="text-white/60 font-inter text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          We couldn't process your payment. This could be due to insufficient funds, an expired card, or a temporary technical issue.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-inter font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] text-white font-inter font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(172,108,255,0.3)]"
          >
            Contact Support
          </Link>
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="text-white/40 hover:text-white font-inter text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-red-500 rounded-full blur-[120px] opacity-10 -z-10"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#AC6CFF] rounded-full blur-[120px] opacity-10 -z-10"></div>
    </div>
  );
};

export default ErrorPage;
