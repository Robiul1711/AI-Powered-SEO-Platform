import whychoose from "@/assets/images/whychoose.png";
import CommonButton from "@/components/common/CommonButton";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";

const WhyChoose = ({ serviceData }: { serviceData: any }) => {
  const dynamicWhyChoose = serviceData?.why_chose_us;

  // Fallback points if API 'points' is empty
  const defaultPoints = [
    {
      subtitle: "Copywriting",
      desc: "One of our most popular services is winning the visitor's heart with our words.",
    },
    {
      subtitle: "Traffic Analysis",
      desc: "We work to improve your content based on data-driven insights and traffic patterns.",
    },
  ];

  // Use API points if they exist and have length, otherwise use defaults
  const displayPoints = 
    dynamicWhyChoose?.points && dynamicWhyChoose.points.length > 0 
      ? dynamicWhyChoose.points 
      : defaultPoints;

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
              {displayPoints.map((point: any, index: number) => (
                <div key={index} className="space-y-2">
                  <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed border-l-2 border-[#AC6CFF] pl-4">
                    {point.subtitle || point.title} 
                  </p>
                  <p className="text-base md:text-lg leading-relaxed max-w-2xl pl-4">
                    {point.desc || point.description}
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
              src={dynamicWhyChoose?.image?.length > 0 ? dynamicWhyChoose.image : whychoose}
              alt="Why Choose Us"
              className="relative w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;