import React, { useState } from "react";
import Title from "@/components/common/Title";
import TagLines from "./TagLines";
import GlowText from "./GlowText";
import useMutationClient from "@/hooks/useMutationClient";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useMutationClient({
    url: "/newsletter/subscribe",
    method: "post",
    showToast: false,
    showErrorToast: false,
  });

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    mutate(
      { data: { email } },
      {
        onSuccess: (res: any) => {
          toast.success(res?.data?.message || "Subscribed successfully!");
          setEmail("");
        },
        onError: (err: any) => {
          const serverError = err?.response?.data?.message || err?.response?.data?.errors?.email?.[0] || "Failed to subscribe. Please try again.";
          toast.error(serverError);
        },
      }
    );
  };

  return (
    <section className="section-padding-x">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            placeholder="Add Mail And Subscribe"
            className="w-full bg-[#222222] border border-white/5 rounded-2xl py-5 px-6 text-white/60 placeholder:text-white/30 focus:outline-none focus:border-[#AC6CFF]/50 transition-all"
            disabled={isPending}
          />
          {/* Send Button */}
          <button 
            onClick={handleSubscribe}
            disabled={isPending}
            className="w-full py-4 rounded-2xl text-white font-semibold text-xl transition-transform active:scale-[0.98] bg-[linear-gradient(90deg,#AC6CFF_0%,#818CFF_100%)] shadow-[0_4px_15px_rgba(172,108,255,0.3)] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Subscribing..." : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;