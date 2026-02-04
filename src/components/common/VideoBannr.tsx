import React from 'react'
import VideoButton from './VideoButton'
import videoBg from "@/assets/images/videoBg.png";
const VideoBannr = () => {
  return (
    <div className='section-padding-x '>  
        <div className="relative">
          <img src={videoBg} alt=""  className='w-full h-[200px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl'/>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <VideoButton onClick={() => {}} />
          </div>
        </div>
      </div>
  )
}

export default VideoBannr