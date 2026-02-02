import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Title from "../common/Title";
import TagLines from "../common/TagLines";
import CommonButton from "../common/CommonButton";

// Import generated images
import caseStudy1 from "@/assets/images/p1.png";
import caseStudy2 from "@/assets/images/p2.png";
import caseStudy3 from "@/assets/images/p3.png";
import caseStudy4 from "@/assets/images/p4.png";

const caseStudies = [
  {
    id: 1,
    image: caseStudy1,
    category: "E-commerce",
    subtitle: "SEO Monthly + Content Writing",
    title: "+120% Organic Traffic In 6 Months",
    link: "/case-studies/ecommerce",
  },
  {
    id: 2,
    image: caseStudy2,
    category: "Local Business",
    subtitle: "Local SEO",
    title: "Ranked #1 For 12 Local Keywords",
    link: "/case-studies/local-business",
  },
  {
    id: 3,
    image: caseStudy3,
    category: "Real Estate",
    subtitle: "PPC + SEO Monthly",
    title: "340% ROI On Ad Spend In 90 Days",
    link: "/case-studies/real-estate",
  },
  {
    id: 4,
    image: caseStudy4,
    category: "E-commerce",
    subtitle: "SEO Monthly + Content Writing",
    title: "+120% Organic Traffic In 6 Months",
    link: "/case-studies/digital-marketing",
  },
  {
    id: 1,
    image: caseStudy1,
    category: "E-commerce",
    subtitle: "SEO Monthly + Content Writing",
    title: "+120% Organic Traffic In 6 Months",
    link: "/case-studies/ecommerce",
  },
  {
    id: 2,
    image: caseStudy2,
    category: "Local Business",
    subtitle: "Local SEO",
    title: "Ranked #1 For 12 Local Keywords",
    link: "/case-studies/local-business",
  },
  {
    id: 3,
    image: caseStudy3,
    category: "Real Estate",
    subtitle: "PPC + SEO Monthly",
    title: "340% ROI On Ad Spend In 90 Days",
    link: "/case-studies/real-estate",
  },
  {
    id: 4,
    image: caseStudy4,
    category: "E-commerce",
    subtitle: "SEO Monthly + Content Writing",
    title: "+120% Organic Traffic In 6 Months",
    link: "/case-studies/digital-marketing",
  },
];

const RelatedCaseStudies = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="section-padding-y relative overflow-hidden">
      <div className="">
        <div className="flex flex-col items-center text-center mb-12">
          <TagLines className="mb-4">Related</TagLines>
          <Title
            level="title48"
            className="text-white font-orbitron uppercase tracking-wider"
          >
            Related Case Studies
          </Title>
        </div>

        <div className="relative group">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="pb-16"
          >
            {caseStudies.map((study) => (
              <SwiperSlide key={study.id}>
                <div className="bg-[#111111] rounded-[32px] overflow-hidden border border-white/5 hover:border-Primary/30 transition-all duration-300 group/card h-full flex flex-col">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                  </div>

                  <div className="p-6 flex flex-col grow">
                    <div className="inline-block px-3 py-1 rounded-full bg-Primary/10 border border-Primary/20 text-Primary text-xs font-medium mb-4 w-fit">
                      {study.category}
                    </div>

                    <p className="text-white/40 text-sm font-medium mb-2">
                      {study.subtitle}
                    </p>

                    <h3 className="text-white text-lg md:text-xl font-orbitron font-bold mb-6 grow leading-tight">
                      {study.title}
                    </h3>

                    <CommonButton
                      as="link"
                      to={study.link}
                      className="w-full bg-bg-custom flex justify-center"
                    >
                      View Case Study
                    </CommonButton>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              ref={prevRef}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-Primary/20 hover:border-Primary/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 rounded-xl bg-Primary border border-Primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(172,108,255,0.4)] hover:brightness-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedCaseStudies;
