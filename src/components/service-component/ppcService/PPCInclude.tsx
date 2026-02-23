import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";
import monthlySeo from "@/assets/images/monthlySeo.png";
import {
  Search,
  BarChart3,
  Link2,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const PPCInclude = () => {
  const inclusionsData = [
    {
      title: "On-Page Optimization",
      icon: <Search className="w-6 h-6 text-purple-400" />,
      items: [
        "Title tags & meta descriptions",
        "Content optimization & keywords",
        "Internal linking structure",
      ],
    },
    {
      title: "Technical SEO",
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      items: [
        "Site speed optimization",
        "Mobile responsiveness fixes",
        "Schema markup implementation",
      ],
    },
    {
      title: "Link Building",
      icon: <Link2 className="w-6 h-6 text-purple-400" />,
      items: [
        "High-quality backlinks",
        "Guest posting outreach",
        "Competitor link analysis",
      ],
    },
    {
      title: "Reporting Dashboard",
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      items: [
        "Real-time ranking updates",
        "Traffic & conversion metrics",
        "Monthly performance reports",
      ],
    },
  ];

  return (
    <div className=" overflow-hidden section-padding-y">
      {/* <div className="w-[60%] mx-auto">
        <img
          src={monthlySeo}
          alt="Monthly SEO"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div> */}

      {/* header section */}
      <div className="flex flex-col items-center gap-4 font-inter text-center sm:mb-16 mb-8">
        <TagLines>Inclusions</TagLines>
        <Title level="title48" className="text-white font-orbitron">
          What's Included
        </Title>
        <p className="text-gray-400 font-medium max-w-2xl">
          Complete SEO management in one monthly package, designed to cover
          every aspect of your website's search engine visibility.
        </p>
      </div>

      {/* Inclusions Cards Grid */}
      <div className="section-padding-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inclusionsData.map((inclusions, idx) => (
          <div
            key={idx}
            className="group bg-[#111111] border border-white/5 rounded-[2rem] md:p-8 p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-[#151515] flex flex-col items-start gap-6"
          >
            <div className="p-4 bg-purple-500/10 rounded-2xl">  
              {inclusions.icon}
            </div>

            <h3 className="text-xl font-orbitron font-bold text-white tracking-wide leading-tight">
              {inclusions.title}
            </h3>

            <ul className="space-y-4 w-full">
              {inclusions.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-500/60 mt-0.5 shrink-0" />
                  <span className="text-gray-400 text-sm font-inter leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item}
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

export default PPCInclude;
