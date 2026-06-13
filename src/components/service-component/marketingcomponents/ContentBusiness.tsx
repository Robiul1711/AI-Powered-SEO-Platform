import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";
import {
  Search,
  TrendingUp,
  Mail,
  BarChart3,
  MessageSquare,
  ShoppingCart,
  Users,
  ShoppingBag,
} from "lucide-react";

const ContentBusiness = ({ serviceData = [], sectionData, isLoading = false }: { serviceData?: any[], sectionData?: any, isLoading?: boolean }) => {
  return (
    <div className=" overflow-hidden section-padding-y">
      {/* <div className="w-[60%] mx-auto">
        <img
          src={monthlySeo}
          alt="Monthly SEO"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div> */}

      <div className="flex flex-col items-center gap-4 font-inter text-center sm:mb-16 mb-8">
        <TagLines>{sectionData?.subtitle || sectionData?.badge || "Inclusions"}</TagLines>
        <Title level="title48" className="text-white font-orbitron">
         {sectionData?.title || "We lead with customer-first strategies:"}
        </Title>
        <p className="text-gray-400 font-medium max-w-2xl">
         {sectionData?.description || "Driving growth through personalized experiences for truly end-to-end business building."}
        </p>
      </div>

      {/* Inclusions Cards Grid */}
 <div className="section-padding-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {isLoading ? (
    <div className="col-span-full text-center text-white py-10">Loading Features...</div>
  ) : serviceData.map((item: any, idx: number) => {
    // If dynamic data, icon is a string URL, else it's a ReactNode
    const title = item.title;
    const desc = item.description;
    
    // Assign a fallback icon for dynamic data or use the static icon
    const iconIcons = [Search, TrendingUp, Mail, BarChart3, MessageSquare, ShoppingCart, Users, ShoppingBag];
    const IconComponent = iconIcons[idx % iconIcons.length];

    return (
      <div
        key={idx}
        className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.05)] hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]"
      >
        {/* icon */}
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-lg mb-5">
          <IconComponent className="w-6 h-6 text-white" />
        </div>

        {/* title */}
        <h3 className="text-lg font-orbitron font-semibold text-white mb-2">
          {title}
        </h3>

        {/* description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {desc}
        </p>
      </div>
    );
  })}
</div>
    </div>
  );
};

export default ContentBusiness;
