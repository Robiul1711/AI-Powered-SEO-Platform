import whychoose from "@/assets/images/whychoose.webp";
import CommonButton from "@/components/common/CommonButton";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";

const GuestWhyChoose = ({
  serviceData = [],
  isLoading = false
}: {
  serviceData?: any;
  isLoading?: boolean;
} = {}) => {
  const dynamicWhyChoose = serviceData;


  return (
    <section className="section-padding-y section-padding-x">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <div className="flex-1 space-y-6 text-left">
          <div className="space-y-2">
            <TagLines>{dynamicWhyChoose?.badge || "Why Choose Us"}</TagLines>
            <Title
              level="title48"
              className="text-white font-orbitron uppercase tracking-tight"
            >
              {dynamicWhyChoose?.title || "Technical & Creative SEO"}
            </Title>
          </div>

          <div className="space-y-6 font-inter text-white/70">
            {/* Main Description from API */}
            <p className="text-base md:text-lg leading-relaxed max-w-2xl">
              {dynamicWhyChoose?.description || 
                "We realize that SEO is a pretty broad concept, encompassing a variety of factors. And we work on everything to benefit your website."}
            </p>

            {/* Dynamic Points Section */}
            <div className="space-y-6">
              {dynamicWhyChoose?.points?.map((item: any, index: number) => (
               <div key={index} className="font-inter text-white/70">
                <p className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#AC6CFF] shadow-[0_0_8px_#AC6CFF]"></span>
                  {item}
                </p>
              </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <CommonButton as="link" to="/contact" className="bg-bg-custom inline-block text-center">
              {dynamicWhyChoose?.button_text || "Contact Us"}
            </CommonButton>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 w-full max-w-3xl">
          <div className="relative group">
            {/* Glow effect behind image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#AC6CFF] to-[#3E7AB3] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src={dynamicWhyChoose?.image || whychoose}
              alt="Why Choose Us"
              className="relative w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestWhyChoose;