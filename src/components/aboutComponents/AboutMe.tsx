import aboutme from "@/assets/images/aboutme.png";
import TagLines from "../common/TagLines";
import Title from "../common/Title";

const AboutMe = () => {
  return (
    <section className="section-padding-y">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <div className="flex-1 space-y-6 text-left">
          <div className="space-y-2">
            <TagLines>About Me</TagLines>
            <Title level="title48" className="text-white font-orbitron uppercase tracking-tight">
              About Me
            </Title>
          </div>

          <div className="space-y-4 font-inter text-white/70">
            <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
              There's no greater pleasure than helping people get closer to their
              goals.
            </p>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl">
              Galura has been established with a pretty straightforward goal: 
              We want to play our role in bringing success to those who deserve it. 
              Our work is designed to take your business to the top—and we won’t 
              stop until we have delivered on our promise.
            </p>
          </div>

          {/* Optional: Add a Signature or CTA Button here for extra polish */}
        </div>

        {/* Image Container */}
        <div className="flex-1 w-full max-w-3xl">
          <div className="  ">
            
            <img 
              src={aboutme|| aboutme} 
              alt="About Me profile" 
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutMe;