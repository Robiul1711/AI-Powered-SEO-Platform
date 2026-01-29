import React from "react";
import { User, Mail, CreditCard, Lock, ShieldCheck } from "lucide-react";

const PaymentDetails = () => {
  return (
    <div className="w-1/2 p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-md">
      <h2 className="text-2xl font-orbitron font-bold text-white mb-8">
        Payment Details
      </h2>

      <div className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-inter text-white/70 block ml-1">
            Full Name
          </label>
          <div className="relative group">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#AC6CFF] transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="John Smith"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-inter focus:outline-none focus:border-[#AC6CFF]/50 transition-all"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-sm font-inter text-white/70 block ml-1">
            Email Address
          </label>
          <div className="relative group">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#AC6CFF] transition-colors"
              size={18}
            />
            <input
              type="email"
              placeholder="john@company.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-inter focus:outline-none focus:border-[#AC6CFF]/50 transition-all"
            />
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <label className="text-sm font-inter text-white/70 block ml-1">
            Company Name
          </label>
          <div className="relative group">
            <input
              type="text"
              placeholder="Example........."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white font-inter focus:outline-none focus:border-[#AC6CFF]/50 transition-all"
            />
          </div>
        </div>

        {/* Card Number */}
        <div className="space-y-2">
          <label className="text-sm font-inter text-white/70 block ml-1">
            Card Number
          </label>
          <div className="relative group">
            <CreditCard
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#AC6CFF] transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="424242424242"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-inter focus:outline-none focus:border-[#AC6CFF]/50 transition-all"
            />
          </div>
        </div>

        {/* Expiry & CVS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-inter text-white/70 block ml-1">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white font-inter focus:outline-none focus:border-[#AC6CFF]/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-inter text-white/70 block ml-1">
              CVS
            </label>
            <input
              type="text"
              placeholder="123"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white font-inter focus:outline-none focus:border-[#AC6CFF]/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Security Footer */}
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 text-white/30">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} />
          <span className="text-[10px] uppercase tracking-widest">
            SSL Secured
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Lock size={16} />
          <span className="text-[10px] uppercase tracking-widest">
            256-Bit Encryption
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
