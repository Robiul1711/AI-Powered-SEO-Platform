import OrderSurnmary from "@/components/pricingComponents/OrderSurnmary";
import PaymentDetails from "@/components/pricingComponents/PaymentDetails";
import OrderWhatsIncluded from "@/components/pricingComponents/OrderWhatsIncluded";
import authBg from "@/assets/images/authBg1.png";
import React from "react";
import TagLines from "@/components/common/TagLines";
import GlowText from "@/components/common/GlowText";

const SimpleCheckout = () => {
  return (
    <div className="relative w-full pt-40 pb-20 overflow-hidden min-h-screen">
      {/* Background Image - Changed absolute to fixed */}
      <div className="fixed inset-0 -z-10">
        <img src={authBg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Badge */}
      <div className="flex justify-center mb-4">
        <TagLines>Secure Checkout</TagLines>
      </div>

      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <span className="text-white">Simple</span>
          <GlowText className="uppercase">Checkout</GlowText>
        </h1>
        <p className="text-white/50 font-inter text-sm md:text-base max-w-2xl mx-auto">
          Complete your order to get started with your SEO growth plan
        </p>
      </div>

      <div className="section-padding-x flex flex-col lg:flex-row gap-8">
        {/* Left: Payment Form */}
        <PaymentDetails />

        {/* Right: Summary Modules */}
        <div className="flex flex-col gap-6 w-1/2">
          <OrderSurnmary />
          <OrderWhatsIncluded />
        </div>
      </div>
    </div>
  );
};

export default SimpleCheckout;
