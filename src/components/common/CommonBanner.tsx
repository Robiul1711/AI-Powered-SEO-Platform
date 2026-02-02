import Title from "@/components/common/Title";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import CommonButton from "./CommonButton";

interface Breadcrumb {
  label: string;
  href: string;
}

interface CommonBannerProps {
  title: string;
  image: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  buttonOne?: string;
  buttonTwo?: string;
}

export default function CommonBanner({
  title,
  image,
  subtitle,
  breadcrumbs = [], // Default to empty array
  buttonOne,
  buttonTwo
}: CommonBannerProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Banner Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-[300px] md:h-[400px] lg:h-[450px] object-cover"
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        
        {/* Dynamic Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 mb-4 text-white/90 text-sm font-inter">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-1">
                <Link to={crumb.href} className="hover:underline">
                  {crumb.label}
                </Link>
                {index < breadcrumbs.length - 1 && <ChevronRight size={14} />}
              </div>
            ))}
          </nav>
        )}

        <Title
          level="title48"
          className="text-white leading-tight font-semibold max-w-3xl"
        >
          {title}
        </Title>

        {subtitle && (
          <p className="text-white/80 mt-4 max-w-2xl">{subtitle}</p>
        )}

        {/* Action Buttons */}
        {(buttonOne || buttonTwo) && (
          <div className="flex gap-4 mt-6">
            {buttonOne && <CommonButton>{buttonOne}</CommonButton>}
            {buttonTwo && <CommonButton className="bg-white/40!">{buttonTwo}</CommonButton>}
          </div>
        )}
      </div>
    </div>
  );
}


// <CommonBanner 
//   title="Our Services"
//   image="/images/hero.jpg"
//   breadcrumbs={[
//     { label: "Home", href: "/" },
//     { label: "Services", href: "/services" }
//   ]}
// />