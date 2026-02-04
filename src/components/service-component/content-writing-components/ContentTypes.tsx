import GlowText from '@/components/common/GlowText'
import TagLines from '@/components/common/TagLines'
import Title from '@/components/common/Title'
import React from 'react'

const blogs = [
  {
    id: 1,
    tag: "SEO",
    words: "2350 Words",
    title: "The Ultimate Guide to Local SEO in 2026",
    desc: "Learn How To Dominate Local Search Results And Attract More Customers In Your Area With Proven Strategies...",
  },
  {
    id: 2,
    tag: "PPC",
    words: "2350 Words",
    title: "10 PPC Mistakes That Are Wasting Your Budget",
    desc: "Discover The Most Common PPC Mistakes And How To Avoid Them To Maximize Your Return On Ad Spend...",
  },
  {
    id: 3,
    tag: "Content",
    words: "2350 Words",
    title: "Content Marketing Strategies That Actually Work",
    desc: "Learn How To Explore Proven Content Marketing Tactics That Drive Traffic, Engagement, And Conversions...",
  },
  {
    id: 4,
    tag: "SEO",
    words: "2350 Words",
    title: "How to Choose the Right SEO Agency",
    desc: "A Comprehensive Guide To Evaluating SEO Agencies And Finding The Perfect Partner For Your Business...",
  },
];

const ContentTypes = () => {
  return (
       <section className="section-padding-x section-padding-y relative overflow-hidden ">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center mb-12 sm:mb-16">
          <TagLines>Business</TagLines>
          <Title level="title48" className="text-white">
            Content <GlowText>Types</GlowText>  We Create
          </Title>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl font-inter">
            Everything you need to dominate local search
          </p>
        </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8  font-inter">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="rounded-2xl border border-white/10 bg-gradient-to-r 
            from-white/5 to-purple-500/5 backdrop-blur-xl p-8 
            hover:border-purple-500/40 transition duration-300"
          >
            {/* Top Tag */}
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 font-medium">
                {blog.tag}
              </span>

              <p className="text-sm text-white/50">{blog.words}</p>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug mb-3 font-orbitron">
              {blog.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              {blog.desc}
            </p>

            {/* Button */}
            <button className="text-purple-400 font-orbitron text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Read Sample <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ContentTypes