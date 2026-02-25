import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";
import {
  Search,
  CheckCircle2,
  LayoutGrid // Fallback icon
} from "lucide-react";

const Inclusions = ({ serviceData }: { serviceData: any }) => {
  // Use data from API, or empty array if not available
  const dynamicInclusions = serviceData?.what_include || [];

  return (
    <div className="overflow-hidden section-padding-y">
      {/* Header section */}
      <div className="flex flex-col items-center gap-4 font-inter text-center sm:mb-16 mb-8">
        <TagLines>Inclusions</TagLines>
        <Title level="title48" className="text-white font-orbitron">
          What's Included
        </Title>
        <p className="text-gray-400 font-medium max-w-2xl">
          {/* You can also make this description dynamic if it's in the API */}
          Complete SEO management in one monthly package, designed to cover
          every aspect of your website's search engine visibility.
        </p>
      </div>

      {/* Inclusions Cards Grid */}
      <div className="section-padding-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dynamicInclusions.map((inclusion: any, idx: number) => (
          <div
            key={idx}
            className="group bg-[#111111] border border-white/5 rounded-[2rem] md:p-8 p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-[#151515] flex flex-col items-start gap-6"
          >
            {/* Dynamic Icon Logic */}
            <div className="p-4 bg-purple-500/10 rounded-2xl">
              {inclusion.icon ? (
                // If the API sends a URL string for an image/svg
                <img src={inclusion.icon} alt="" className="w-6 h-6" />
              ) : (
                // Fallback Lucide Icon if API icon is null
                <LayoutGrid className="w-6 h-6 text-purple-400" />
              )}
            </div>

            <h3 className="text-xl font-orbitron font-bold text-white tracking-wide leading-tight">
              {inclusion.title}
            </h3>

            <ul className="space-y-4 w-full">
              {/* Mapping through 'points' from API */}
              {inclusion.points?.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-500/60 mt-0.5 shrink-0" />
                  <span className="text-gray-400 text-sm font-inter leading-relaxed group-hover:text-gray-300 transition-colors">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inclusions;