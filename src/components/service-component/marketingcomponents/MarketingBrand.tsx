import React from "react";
import notion from "@/assets/images/notion.png";
import grammerly from "@/assets/images/grammerly.png";
import hellosign from "@/assets/images/hellosign.png";
import intercom from "@/assets/images/intercom.png";
import squre from "@/assets/images/squre.png";
import Marquee from "react-fast-marquee";


const MarketingBrand = ({ serviceData, isLoading }: any) => {
  // const brands = [
  //   { name: "Notion", logo: notion },
  //   { name: "Intercom", logo: intercom },
  //   { name: "Grammarly", logo: grammerly },
  //   { name: "Square", logo: squre },
  //   { name: "HelloSign", logo: hellosign },
  //   { name: "Notion", logo: notion },
  //   { name: "Intercom", logo: intercom },
  //   { name: "Grammarly", logo: grammerly },
  //   { name: "Square", logo: squre },
  //   { name: "HelloSign", logo: hellosign },
  // ];

  return (
    <div className="section-padding-y section-padding-x">
      <div className="flex flex-col items-center gap-10">
        <p className="text-white font-orbitron text-sm md:text-base uppercase tracking-[2px] opacity-80">
          The Best Brands Choose Numerique
        </p>

        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          <div className="flex items-center gap-12 md:gap-24 px-12">
            {serviceData?.map((brand: any, index: any) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 md:h-10 lg:h-12 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default MarketingBrand;
