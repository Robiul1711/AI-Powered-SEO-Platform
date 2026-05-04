import React from "react";
import Title from "@/components/common/Title";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
interface DetailItem {
  title: string;
  description?: string;
  subItems?: string[];
}

interface MonthlyDetailsProps {
  details: DetailItem[];
}

const MonthlyDetails: React.FC<MonthlyDetailsProps> = ({ details }) => {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-[30px] p-6 h-full flex flex-col">
      <Title level="title32" className="text-white mb-8">
        Monthly Details
      </Title>

      <div className="flex-grow overflow-y-auto pr-2 space-y-4 max-h-[600px] custom-scrollbar">
        {details.map((item, index) => (
          <div key={index} className="space-y-3">
            {/* Main Item Card */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 transition-all duration-300 hover:border-Primary/30 group">
              <h4 className="text-white/90 font-inter text-sm md:text-base font-medium">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-white/40 text-xs md:text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {/* Sub Items */}
            {item.subItems && item.subItems.length > 0 && (
              <div className="pl-6 space-y-2">
                {item.subItems.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-start gap-2 bg-[#1a1a1a]/50 border border-white/5 rounded-lg p-3 transition-all duration-300 hover:border-Primary/20"
                  >
                    <span className="text-Primary">
                <MdOutlineSubdirectoryArrowRight />
                    </span>
                    <span className="text-white/60 text-xs md:text-sm">
                      {sub}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyDetails;
