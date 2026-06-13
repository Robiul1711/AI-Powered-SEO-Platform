import { Mail, MapPin } from "lucide-react";
import TagLines from "../common/TagLines";
import Title from "../common/Title";

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-8 text-left">
      {/* Header Section */}
      <div className="space-y-4">
        <TagLines>Contact Us</TagLines>
        <Title
          level="title48"
          className="text-white  uppercase tracking-tight leading-tight"
        >
          Excited About The <br /> Project? Please Get <br /> In Touch.
        </Title>
        <p className="text-gray-400 font-inter text-lg leading-relaxed max-w-xl">
          With A Deep Understanding Of Search Engine Algorithms And User
          Behavior, We Create Tailored SEO Strategies That Drive Real Result.
        </p>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-inter">
        {/* Email Card */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex items-center gap-4 group hover:border-[#AC6CFF] transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#AC6CFF] to-[#7000FF] flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
            <Mail className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Email
            </p>
            <p className="text-white text-sm break-all font-medium">
              info@domain.com
            </p>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-[#111111] font-inter border border-white/10 rounded-2xl p-6 flex items-center gap-4 group hover:border-[#AC6CFF] transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#AC6CFF] to-[#7000FF] flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
            <MapPin className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Location
            </p>
            <p className="text-white text-sm font-medium">
              123 main street, City State
            </p>
          </div>
        </div>
      </div>

      {/* Map Location Bar */}
      <div className="bg-[#111111] font-inter border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 group hover:border-[#AC6CFF] transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 border border-white/5">
            {/* Creating a Google Maps-like pin icon using inline SVG for specific colors */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="#EA4335"
              />
              <path
                d="M9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5C10.62 11.5 9.5 10.38 9.5 9Z"
                fill="#B31412"
              />
            </svg>
          </div>
          <span className="text-white text-sm md:text-base font-medium">
            Tauentzienstraße 1, 10789 Berlin
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
