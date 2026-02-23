import React from "react";
import { Link } from "react-router-dom";

type AsType = "button" | "a" | "link";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  as?: AsType;
}

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type LinkProps = BaseProps & {
  as: "link";
  to: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

export type CommonButtonProps = ButtonProps | AnchorProps | LinkProps;

const CommonButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CommonButtonProps
>(({ children, className = "", as = "button", ...rest }, ref) => {
  const baseClasses = `
   px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-medium 
    bg-Primary text-white transition-all duration-300 ease-in-out
    hover:bg-opacity-90 hover:scale-105 hover:shadow-lg active:scale-95
    cursor-pointer
    ${className}
  `;

  if (as === "a") {
    const { href, ...anchorProps } = rest as AnchorProps;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...anchorProps}
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  if (as === "link") {
    const { to, ...linkProps } = rest as LinkProps;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={to}
        {...linkProps}
        className={baseClasses}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(rest as ButtonProps)}
      className={baseClasses}
    >
      {children}
    </button>
  );
});

export default CommonButton;
