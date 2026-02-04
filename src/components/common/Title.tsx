import React, { forwardRef } from "react";
import clsx from "clsx";

type TitleSize =
  | "title64"
  | "title56"
  | "title48"
  | "title40"
  | "title32"
  | "title28"
  | "title24"
  | "title22"
  | "title20"
  | "title18"
  | "title16"
  | "title14"
  | "title12";

const sizeMap: Record<TitleSize, string> = {
  title64:
    "text-[32px] sm:text-[44px] md:text-[56px] xlg:text-[60px] xl:text-[64px] font-extrabold",
  title56:
    "text-[28px] sm:text-[40px] md:text-[48px] xlg:text-[52px] xl:text-[56px] font-bold",
  title48:
    "text-[24px] sm:text-[32px] md:text-[40px] xlg:text-[44px] xl:text-[48px] font-bold",
  title40:
    "text-[20px] sm:text-[28px] md:text-[34px] xl:text-[40px] font-semibold tracking-tight leading-tight md:font-bold",
  title32:
    "text-[18px] sm:text-[22px] md:text-[28px] xl:text-[32px] font-semibold",
  title28:
    "text-[16px] sm:text-[20px] md:text-[24px] xl:text-[28px] font-medium",
  title24:
    "text-[14px] sm:text-[18px] md:text-[20px] xl:text-[24px] font-medium",
  title22:
    "text-[14px] sm:text-[16px] md:text-[18px] xl:text-[22px] font-medium",
  title20:
    "text-[13px] sm:text-[15px] md:text-[18px] xl:text-[20px] font-normal",
  title18:
    "text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] font-normal",
  title16:
    "text-[11px] sm:text-[13px] md:text-[14px] xl:text-[16px] font-normal",
  title14:
    "text-[10px] sm:text-[12px] md:text-[13px] xl:text-[14px] font-normal",
  title12:
    "text-[10px] sm:text-[11px] md:text-[12px] xl:text-[13px] font-normal",
};

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: TitleSize;
  className?: string;
  children: React.ReactNode;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ children, level, className = "", ...rest }, ref) => {
    return (
      <h2 ref={ref} className={clsx(sizeMap[level], className)} {...rest}>
        {children}
      </h2>
    );
  },
);

Title.displayName = "Title";

export default Title;
