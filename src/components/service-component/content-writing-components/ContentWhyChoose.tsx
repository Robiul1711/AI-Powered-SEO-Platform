
import whychoose from "@/assets/images/whychoose.png";
import CommonButton from "@/components/common/CommonButton";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";

const ContentWhyChoose = () => {
  return (
    <section className="section-padding-y section-padding-x">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text Content */}
        <div className="flex-1 space-y-6 text-left">
          <div className="space-y-2">
            <TagLines>Why Choose Us</TagLines>
            <Title
              level="title48"
              className="text-white font-orbitron uppercase tracking-tight"
            >
              Why GAJURA SEO Stands Out
            </Title>
          </div>

          <div className="space-y-4 font-inter text-white/70">
            <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
              Because we have you could ask for and more
            </p>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl">
              We don't leave anything out We realize that SEO is a pretty broad
              concept, encompassing a variety of factors And we work on
              everything to benefit your website in the best possible way.
            </p>
            <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
              Copywriting
            </p>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl">
              One of our most popular services is winning the visitor's heart
              with our words
            </p>
            <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
            Traffic Analysis
            </p>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl">
           We work to improve your content based on the
            </p>
          </div>
          <CommonButton className="bg-bg-custom"  >Contact Us</CommonButton>

          {/* Optional: Add a Signature or CTA Button here for extra polish */}
        </div>
        {/* Image Container */}
        <div className="flex-1 w-full max-w-3xl">
          <div className="  ">
            <img
              src={whychoose}
              alt="About Me profile"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentWhyChoose;
