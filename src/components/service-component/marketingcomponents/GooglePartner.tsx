import React from "react";
import { Link } from "react-router-dom";
import Title from "@/components/common/Title";

const GooglePartner = () => {
  return (
    <div className="section-padding-x section-padding-y">
      <div className="">
        <div className="bg-[#1a1a1c] rounded-[32px] p-8 md:p-16 flex flex-col items-center text-center gap-8 border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-Primary/10 blur-[100px] rounded-full -z-10" />

          {/* Google Partner Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full p-1.5 shadow-lg">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.11c-.22-.67-.35-1.38-.35-2.11s.13-1.44.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <span className="text-white font-inter text-xl md:text-2xl font-medium tracking-tight">
              Google Partner
            </span>
          </div>

          {/* Heading */}
          <Title
            level="title48"
            className="text-white font-orbitron max-w-6xl tracking-tight leading-tight"
          >
            Get Started With A Free Consultation
          </Title>

          {/* Button */}
          <Link to="/contact" className="bg-bg-custom text-white font-inter font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_#ac6cff] active:scale-95 text-sm uppercase tracking-widest inline-block">
            Get A Proposal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GooglePartner;
