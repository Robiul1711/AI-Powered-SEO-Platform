// import React from 'react'
// import VideoButton from './VideoButton'
// import videoBg from "@/assets/images/videoBg.webp";
// const VideoBannr = ({serviceData}: {serviceData: any}) => {
//   const dynamicVideo = serviceData?.video;
//   console.log(dynamicVideo)
//   return (
//     <div className='section-padding-x '>
//         <div className="relative">
//           <img src={videoBg} alt=""  className='w-full h-[200px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl'/>
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//             <VideoButton onClick={() => {}} />
//           </div>
//         </div>
//       </div>
//   )
// }

// export default VideoBannr

import React from "react";
import VideoButton from "./VideoButton";
import videoBg from "@/assets/images/videoBg.webp";

const VideoBannr = (
  { serviceData = {} }: { serviceData?: any } = { serviceData: {} },
) => {
  // 1. Extract video data from API
  const dynamicVideo = serviceData?.video;

  // 2. Click Handler
  const handlePlayVideo = () => {
    const videoUrl = dynamicVideo?.url;
    if (videoUrl) {
      // Opens the YouTube link in a new tab
      window.open(videoUrl);
    } else {
      console.log("No video URL found");
    }
  };

  return (
    <div className="section-padding-x">
      <div className="relative group cursor-pointer" onClick={handlePlayVideo}>
        {/* Background Image - can also be made dynamic if API provides one */}
        <img
          src={videoBg}
          alt="Video Thumbnail"
          className="w-full h-[200px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
        />

        {/* Overlay to make the button pop */}
        <div className="absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-black/10 transition-colors"></div>

        {/* Center Play Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <VideoButton onClick={handlePlayVideo} />
        </div>

        {/* Optional: Show "Watch Video" text on hover */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <p className="text-white/80 font-inter text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Play Concept Video
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoBannr;
