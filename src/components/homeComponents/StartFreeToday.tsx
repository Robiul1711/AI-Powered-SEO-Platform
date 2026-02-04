import StartFree from "@/assets/images/StartFree.png";
import TagLines from "../common/TagLines";
import GlowText from "../common/GlowText";
import CommonButton from "../common/CommonButton";
import Title from "../common/Title";
const StartFreeToday = () => {
  return (
    <div className="relative w-full section-padding-x section-padding-y overflow-hidden">
      {/* Background Image */}
      <img
        src={StartFree}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center mx-auto py-10 sm:py-12 md:py-16 lg:py-20">
        <TagLines glowColor={true}>Start Free Today</TagLines>

        <Title level="title48" className="max-w-2xl mt-4">
          Ready <GlowText>Transform</GlowText>Your SEO
        </Title>

        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl text-center font-inter mt-6">
          Join 500+ businesses already using AI to dominate their market. Get
          your free audit in 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <CommonButton className="bg-white text-Primary!  px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base shadow-[0_0_30px_rgba(172,108,255,0.4)]">
            Start Free AI Audit
          </CommonButton>
          <CommonButton
            as="link"
            to="/services"
            className="bg-[#FFFFFF]/35 border border-white/20 text-white!  px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base hover:border-[#ffff] hover:text-[#ffff]!"
          >
            Access Client Dashboard
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default StartFreeToday;
