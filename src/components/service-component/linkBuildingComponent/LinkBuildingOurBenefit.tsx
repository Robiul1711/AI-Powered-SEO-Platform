import aboutme from "@/assets/images/oyrBenifit.png";
import CommonButton from "@/components/common/CommonButton";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";

const LinkBuildingOurBenefit = ({
  serviceData = [],
  isLoading = false
}: {
  serviceData?: any;
  isLoading?: boolean;
} = {}) => {
  // 1. Extract the benefits object from API
  const benefits = serviceData;


  return (
    <section className="section-padding-y section-padding-x">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Image Container */}
        <div className="flex-1 w-full max-w-3xl">
          <div className="relative">
            <img
              src={benefits?.image}
              alt={benefits?.title || "Our Benefits"}
              className="w-full h-auto rounded-xl object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-6 text-left">
          <div className="space-y-2">
            {/* Dynamic Badge (TagLine) */}
            <TagLines>{benefits?.badge || "Our Benefits"}</TagLines>
            
            {/* Dynamic Title */}
            <Title
              level="title48"
              className="text-white font-orbitron uppercase tracking-tight"
            >
              {benefits?.title || "Witness Real Growth Every Month"}
            </Title>
          </div>

          {/* Dynamic Description */}
          <div className="font-inter text-white/70">
            <p className="text-lg font-medium text-white/90 leading-relaxed">
              {benefits?.description || 
                "We take immense pride in using our expertise in SEO to take your website to heights that you couldn't have envisioned."
              }
            </p>
          </div>

          {/* Points List */}
          <div className="space-y-3">
            {benefits?.points?.map((item: string, index: number) => (
              <div key={index} className="font-inter text-white/70">
                <p className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#AC6CFF] shadow-[0_0_8px_#AC6CFF]"></span>
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Dynamic Button */}
          <div className="pt-4">
            
            <CommonButton  
              as="link" to="/contact"
              className="bg-bg-custom hover:opacity-90 transition-all inline-block text-center"
            >
              {benefits?.button_text || "Contact Us"}
            </CommonButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkBuildingOurBenefit;