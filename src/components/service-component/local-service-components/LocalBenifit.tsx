
import aboutme from "@/assets/images/oyrBenifit.png";
import CommonButton from "@/components/common/CommonButton";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";

const LocalBenifit = () => {
  return (
    <section className="section-padding-y section-padding-x">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Image Container */}
        <div className="flex-1 w-full max-w-3xl">
          <div className="  ">
            <img
              src={aboutme || aboutme}
              alt="About Me profile"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
        {/* Text Content */}
        <div className="flex-1 space-y-6 text-left">
          <div className="">
            <TagLines>Our Benefits</TagLines>
            <Title
              level="title48"
              className="text-white font-orbitron uppercase tracking-tight"
            >
           Get Found by Local Customers, Faster
            </Title>
          </div>

          <div className="space-y-4 font-inter text-white/70">
            <p className="text-lg  font-medium text-white/90 leading-relaxed">
            We help your business appear where local customers are already searching. Our Local SEO strategies are designed to increase visibility, foot traffic, and high-intent leads every single month.
            </p>
          </div>
          <div>
            {[
              "Higher visibility in Google Maps & local search",
              "Long-term trust & authority in your area",
              "Long-term trust & authority in your area",
    
            ].map((item) => {
              return (
                <div key={item} className="font-inter text-white/70 ">
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-bg-custom"></span>{" "}
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
          {/* Optional: Add a Signature or CTA Button here for extra polish */}
          <CommonButton className="bg-bg-custom">Contact Us</CommonButton>
        </div>
      </div>
    </section>
  );
};

export default LocalBenifit;
