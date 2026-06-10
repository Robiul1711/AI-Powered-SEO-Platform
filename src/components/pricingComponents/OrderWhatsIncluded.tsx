import React from "react";
import { CheckCircle2 } from "lucide-react";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

interface OrderWhatsIncludedProps {
  plan?: any;
  isLoading?: boolean;
}

const OrderWhatsIncluded = ({ plan, isLoading }: OrderWhatsIncludedProps) => {
  const features = plan?.features || [];

  return (
    <div className="p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-md min-h-[300px] shadow-xl">
      <h2 className="text-xl font-orbitron font-bold text-white mb-8">
        Order What's Included
      </h2>

      <div className="space-y-6">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-white/5"></div>
                <div className="h-4 bg-white/5 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : plan ? (
          features.length > 0 && typeof features[0] === 'object' ? (
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-2 -mx-2 px-2 space-y-4">
              {features.map((feature: any, index: number) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-start gap-3 group">
                    <CheckCircle2
                      size={16}
                      className="text-[#AC6CFF] opacity-80 mt-0.5 shrink-0"
                    />
                    <div>
                      <span className="text-sm font-inter font-medium text-white/90">
                        {feature.title}
                      </span>
                      {feature.description && (
                        <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {feature.subItems && feature.subItems.length > 0 && (
                    <div className="pl-7 space-y-1">
                      {feature.subItems.map((sub: string, sIdx: number) => (
                        <div key={sIdx} className="flex items-start gap-2">
                          <span className="text-[#AC6CFF]/60 text-xs mt-0.5 shrink-0">
                            <MdOutlineSubdirectoryArrowRight />
                          </span>
                          <span className="text-[12px] font-inter text-white/60">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            features.map((feature: string, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-[#AC6CFF] opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-sm font-inter text-white/70 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </div>
              </div>
            ))
          )
        ) : (
          <p className="text-white/30 text-sm font-inter text-center mt-10">
            Features will appear once a plan is selected
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderWhatsIncluded;
