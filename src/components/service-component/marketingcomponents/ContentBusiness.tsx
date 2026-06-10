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

const ContentBusiness = () => {
const services = [
  {
    title: "Paid Search Marketing",
    desc: "Etiam vel placerat enim dapibus varius massa sodales lacinia",
    icon: <Search className="w-6 h-6 text-white" />,
  },
  {
    title: "Search Engine Optimization",
    desc: "Maintain your best spot on the search results page, so you can find new customers and re-engage loyal ones.",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
  },
  {
    title: "Email Marketing",
    desc: "When it comes to reaching your target audience, you can’t get much closer than direct to their inboxes.",
    icon: <Mail className="w-6 h-6 text-white" />,
  },
  {
    title: "Conversion Rate Optimization",
    desc: "Craft campaigns built just for your business to ensure real and quantifiable ROI.",
    icon: <BarChart3 className="w-6 h-6 text-white" />,
  },
  {
    title: "Social Media Marketing",
    desc: "Social media management is vital for company and brand awareness.",
    icon: <MessageSquare className="w-6 h-6 text-white" />,
  },
  {
    title: "Google Shopping",
    desc: "Google Shopping ads are a no-brainer for any ecommerce company with an online presence wishing to increase sales.",
    icon: <ShoppingCart className="w-6 h-6 text-white" />,
  },
  {
    title: "Influencer Marketing",
    desc: "Grow your brand with the help of our influencers and marketing experts.",
    icon: <Users className="w-6 h-6 text-white" />,
  },
  {
    title: "Amazon Shopping",
    desc: "Marketing on Amazon is all about keywords and presentation.",
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
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
         We lead with customer-first strategies:
        </Title>
        <p className="text-gray-400 font-medium max-w-2xl">
         Driving growth through personalized experiences for truly end-to-end business building.
        </p>
      </div>

      {/* Inclusions Cards Grid */}
 <div className="section-padding-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {services.map((item, idx) => (
    <div
      key={idx}
      className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.05)] hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]"
    >
      {/* icon */}
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-lg mb-5">
        {item.icon}
      </div>

      {/* title */}
      <h3 className="text-lg font-orbitron font-semibold text-white mb-2">
        {item.title}
      </h3>

      {/* description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {item.desc}
      </p>

      {/* button */}
      {/* <button className="text-xs tracking-widest border border-white/30 text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all duration-300">
        LEARN MORE
      </button> */}
    </div>
  ))}
</div>
    </div>
  );
};

export default ContentBusiness;
