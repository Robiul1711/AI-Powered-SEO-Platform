import GlowText from "@/components/common/GlowText";
import TagLines from "@/components/common/TagLines";
import { Layout, MapPin, Star, CheckCircle2 } from "lucide-react";

const businessData = [
  {
    title: "GMB setup",
    icon: <Layout className="w-6 h-6 text-purple-400" />,
    features: [
      "Complete GMB profile setup & optimization",
      "Business hours & category optimization",
      "Photo & video uploads",
      "Post scheduling & management",
      "Q&A monitoring & responses",
      "Insights & analytics tracking",
    ],
  },
  {
    title: "Citation Building",
    icon: <MapPin className="w-6 h-6 text-purple-400" />,
    features: [
      "Top 50 local directory submissions",
      "NAP consistency verification",
      "Duplicate listing clean-up",
      "Industry-specific directories",
      "Monthly citation monitoring",
      "New citation opportunities",
    ],
  },
  {
    title: "Review Management",
    icon: <Star className="w-6 h-6 text-purple-400" />,
    features: [
      "Review monitoring across platforms",
      "Review response templates",
      "Reputation score tracking",
      "Review generation campaigns",
      "Negative review management",
      "Monthly performance reports",
    ],
  },
];

export default function CommonBusiness() {
  return (
    <div className="section-padding-x  text-white section-padding-y  font-inter">
      <div className="">
        {/* Header Section */}
        <div className="text-center mb-16">
          <TagLines>Business</TagLines>
          <h1 className=" sm:text-4xl text-3xl md:text-5xl mb-4 tracking-tight font-semibold">
            Google <GlowText>Business Optimization</GlowText> 
          </h1>
          <p className="text-zinc-500 text-sm md:text-base">
            Everything You Need To Dominate Local Search
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessData.map((item, index) => (
            <div
              key={index}
              className="   bg-[linear-gradient(90deg,rgba(14,14,14,0.02)_3.29%,rgba(172,108,255,0.08)_98.59%)]
    backdrop-blur-[26px] rounded-3xl md:p-8 sm:p-6 p-4 border border-zinc-800 shadow-2xl transition-transform hover:scale-[1.02]"
            >
              {/* Icon Header */}
              <div className="bg-zinc-900/50 border border-zinc-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-6 tracking-wide">
                {item.title}
              </h3>

              {/* Feature List */}
              <div className="bg-[#202023] rounded-2xl sm:p-6 p-4 space-y-4 border border-gray-600">
                {item.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3 group">
                    <div className="mt-1 shrink-0">
                      <div className="bg-purple-600 rounded-full p-0.5">
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-white"
                          strokeWidth={3}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
