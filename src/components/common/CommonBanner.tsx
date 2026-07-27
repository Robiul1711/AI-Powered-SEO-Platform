import { useState } from "react";
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
  isLoading?: boolean;
}

export default function CommonBanner({
  title,
  image,
  subtitle,
  breadcrumbs = [], // Default to empty array
  buttonOne,
  buttonTwo,
  isLoading = false
}: CommonBannerProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Banner Image Wrapper */}
      <div className="relative w-full h-[350px] md:h-[400px] lg:h-[500px] bg-black overflow-hidden">
        {(!imageLoaded || isLoading) && (
          <div className="absolute inset-0 bg-black animate-pulse" />
        )}
        <img
          src={image}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded && !isLoading ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        {isLoading ? (
          <>
            {/* Breadcrumb Skeleton */}
            {breadcrumbs.length > 0 && (
              <div className="h-4 w-40 bg-white/20 animate-pulse rounded-md mb-4" />
            )}

            {/* Title Skeleton */}
            <div className="flex flex-col items-center gap-2 mb-2 w-full max-w-2xl">
              <div className="h-10 w-full bg-white/20 animate-pulse rounded-md" />
              <div className="h-10 w-2/3 bg-white/20 animate-pulse rounded-md" />
            </div>

            {/* Subtitle Skeleton */}
            {subtitle && (
              <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-xl">
                <div className="h-4 w-full bg-white/10 animate-pulse rounded-md" />
                <div className="h-4 w-5/6 bg-white/10 animate-pulse rounded-md" />
              </div>
            )}

            {/* Action Buttons Skeleton */}
            {(buttonOne || buttonTwo) && (
              <div className="flex gap-4 mt-6">
                {buttonOne && <div className="h-11 w-32 bg-white/15 animate-pulse rounded-full" />}
                {buttonTwo && <div className="h-11 w-32 bg-white/15 animate-pulse rounded-full" />}
              </div>
            )}
          </>
        ) : (
          <>
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
              className="text-white leading-tight font-semibold max-w-7xl"
            >
              {title}
            </Title>

            {subtitle && (
              <p className="text-white/80 mt-4 max-w-6xl">{subtitle}</p>
            )}

            {/* Action Buttons */}
            {(buttonOne || buttonTwo) && (
              <div className="flex gap-4 mt-6">
                {buttonOne && <CommonButton>{buttonOne}</CommonButton>}
                {buttonTwo && <CommonButton className="bg-white/40!">{buttonTwo}</CommonButton>}
              </div>
            )}
          </>
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