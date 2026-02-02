import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Globe,
  Mail,
  ShieldCheck,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import TagLines from "@/components/common/TagLines";
import GlowText from "@/components/common/GlowText";
import ResultModal from "./ResultModal";

const PoweredAnalysis = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auditData, setAuditData] = useState({
    website: "",
    overallScore: 60,
    performance: 67,
    technical: 72,
    content: 81,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Audit Data:", data);
    setAuditData({
      ...auditData,
      website: data.website.startsWith("http")
        ? data.website
        : `https://${data.website}`,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full section-padding-y">
      {/* Content Container */}
      <div className="section-padding-x flex flex-col items-center text-center mx-auto">
        <TagLines> Free AI • Powered Analysis</TagLines>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight font-orbitron">
          Get Your <GlowText className="">AI SEO Audit</GlowText>
        </h1>

        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-3xl font-inter">
          Enter your website domain and our AI will analyze 200+ ranking factors
          to identify your biggest growth opportunities.
        </p>

        {/* Audit Form Card */}
        <div className="w-full max-w-[800px] bg-[#111111]/80 border border-white/5 rounded-[40px] p-6 md:p-10 backdrop-blur-md shadow-2xl overflow-hidden relative group">
          {/* Subtle Glow behind the card */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-Primary/20 to-blue-500/20 rounded-[40px] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 space-y-5"
          >
            {/* Website Input */}
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40">
                <Globe size={20} />
              </div>
              <input
                {...register("website", { required: "Website is required" })}
                type="text"
                placeholder="Enter Your Website (E.G., Example.Com)"
                className={`w-full bg-[#1A1A1A] border ${errors.website ? "border-red-500" : "border-white/10 hover:border-Primary/30"} focus:border-Primary/50 rounded-2xl px-14 py-5 text-white placeholder:text-gray-500 transition-all outline-none text-lg font-inter`}
              />
            </div>
              {errors.website && (
                <p className="text-red-500 text-xs text-left mt-1 ml-2">
                  {(errors.website as any).message}
                </p>
              )}

            {/* Email Input */}
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40">
                <Mail size={20} />
              </div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter Your Email"
                className={`w-full bg-[#1A1A1A] border ${errors.email ? "border-red-500" : "border-white/10 hover:border-Primary/30"} focus:border-Primary/50 rounded-2xl px-14 py-5 text-white placeholder:text-gray-500 transition-all outline-none text-lg font-inter`}
              />
            </div>
              {errors.email && (
                <p className="text-red-500 text-xs text-left mt-1 ml-2">
                  {(errors.email as any).message}
                </p>
              )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] hover:opacity-90 text-white font-orbitron font-bold py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(172,108,255,0.3)] hover:shadow-[0_0_40px_rgba(172,108,255,0.5)] active:scale-[0.98] text-xl flex items-center justify-center gap-3 group/btn"
            >
              Start Free Audit
              <ArrowRight
                size={22}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </form>

          {/* Footer Features */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-white/60 text-sm font-inter">
              <ShieldCheck size={18} className="text-Primary" />
              100% Secure
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm font-inter">
              <Clock size={18} className="text-Primary" />
              Results In 60 Seconds
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm font-inter">
              <CheckCircle size={18} className="text-Primary" />
              No Credit Card Required
            </div>
          </div>
        </div>
      </div>

      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={auditData}
      />
    </div>
  );
};

export default PoweredAnalysis;
