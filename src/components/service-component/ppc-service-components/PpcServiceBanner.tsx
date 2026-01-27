import CommonButton from "@/components/common/CommonButton";
import { ImageProvider } from "@/components/common/ImageProvider";
import Title from "@/components/common/Title";
import { ChevronRight } from "lucide-react";

export default function PpcServiceBanner() {
  return (
    <div className="relative w-full">
      {/* Banner Image */}
      <img
        src={ImageProvider.ppcService}
        alt="Tutoring banner"
        className="w-full h-auto lg:h-[450px] object-cover"
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 text-center mt-32">
        <div className="flex items-center gap-1 mb-4 text-white text-sm font-inter">
          <p>Home</p>
          <ChevronRight size={16} />
          <p>Service</p>
        </div>
        <Title
          level="title48"
          className="text-white leading-tight font-bold! text-center"
        >
          Profitable PPC Campaigns
        </Title>
        <div className="flex gap-6 mt-4">
          <CommonButton>Start Campaign</CommonButton>
          <CommonButton className="bg-white/40!">Learn More</CommonButton>
        </div>
      </div>
    </div>
  );
}
