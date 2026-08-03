import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import TagLines from "../common/TagLines";
import Title from "../common/Title";
import aboutme from "@/assets/images/t1.webp"; // Keeping existing import, will use as fallback or placeholders

const testimonialsData = [
  {
    id: 1,
    quote:
      "GAJURA SEO doubled our organic traffic in three months. Their AI summaries simplified complex data into actionable insights, helping our team make faster, confident decisions. Strategic and measurable results—exactly what we needed.",
    name: "Daniel Kim",
    title: "Director & Content Creator",
    image: aboutme, // Using the imported image for now, user can swap
  },
  {
    id: 2,
    quote:
      "Working with this team has been a game-changer for our creative process. The AI tools provided are intuitive and powerful, allowing us to focus more on artistry and less on technical hurdles.",
    name: "Sarah Jenkins",
    title: "Creative Director",
    image: aboutme,
  },
  {
    id: 3,
    quote:
      "The level of detail and efficiency we've achieved is unprecedented. It's not just about speed; it's about the quality of the output. Highly recommended for any forward-thinking studio.",
    name: "Michael Chen",
    title: "VFX Supervisor",
    image: aboutme,
  },
];

const Testimonials = () => {
  const swiperRef = useRef<SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-padding-y">
      <div className="">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
     
        <div className="flex-1 space-y-6 text-left max-w-2xl">
          <div className="space-y-2">
            <TagLines>Testimonials</TagLines>
            <Title level="title48" className="text-white font-orbitron uppercase tracking-tight">
              What Creators Are Saying
            </Title>
          </div>

          <div className="space-y-4 font-inter text-white/70">
            <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
           Hear how viora is transforming creative workflow- from artist to production studios-with faster result, higer quality and AI tools that truely make a difference.
            </p>
    
          </div>

          {/* Optional: Add a Signature or CTA Button here for extra polish */}
        </div>


          {/* Right Content - Swiper */}
          <div className="flex-1 w-full min-w-0">
            {" "}
            {/* min-w-0 required for flex child swiper */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-full"
            >
              {testimonialsData.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="relative  p-8 rounded-3xl overflow-hidden border border-white/5 font-inter">
                    {/* Background Gradient Effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/20 blur-[100px] rounded-full pointer-events-none" />
<div className="flex gap-4">
                    <div className="relative z-10 flex flex-col h-full justify-between gap-8 w-[60%]">
                      {/* Quote Text */}
                      <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                        {testimonial.quote}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-6">
                        {/* Author Info */}
                        <div className="flex items-center gap-4">
                          <div>
                            <h4 className="text-white text-xl font-semibold">
                              {testimonial.name}
                            </h4>
                            <p className="text-gray-500 text-sm">
                              {testimonial.title}
                            </p>

                            {/* Pagination Dots */}
                            <div className="flex gap-2 mt-4">
                              {testimonialsData.map((_, index) => (
                                <div
                                  key={index}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    index === activeIndex
                                      ? "w-8 bg-white"
                                      : "w-4 bg-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                    
                      </div>
                    </div>
    {/* Author Image */}
                        <div className="relative w-[40%]  shrink-0 overflow-hidden rounded-xl ">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
</div>

                    {/* Navigation Buttons (Absolute positioned bottom right) */}
                    <div className="absolute bottom-8 right-8 flex gap-3 z-20 bg-black/60 backdrop-blur-sm p-2 rounded-tl-3xl rounded-br-2xl">
                      <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all backdrop-blur border border-white/10 group"
                        aria-label="Previous testimonial"
                      >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                      </button>
                      <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="p-2 rounded-full bg-[#A855F7] hover:bg-[#9333EA] text-white transition-all shadow-lg shadow-purple-900/20 group"
                        aria-label="Next testimonial"
                      >
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
