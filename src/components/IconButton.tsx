import { ColorType } from "@/models/colors";
import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IIconButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color: ColorType;
  bgColor?: ColorType;
  textColor: ColorType;
  textColorOnHover: ColorType;
}

const textColors = {
  white: "text-white",
  blue: "text-blue-500",
  green: "text-green-500",
  cyan: "text-cyan-500",
  teal: "text-teal-500",
  lime: "text-lime-500",
  red: "text-red-500",
  pink: "text-pink-500",
  purple: "text-purple-500",
  "[#ff2854]": "text-[#ff2854]",
};

const hoverTextColors = {
  white: "hover:text-white",
  blue: "hover:text-blue-500",
  green: "hover:text-green-500",
  cyan: "hover:text-cyan-500",
  teal: "hover:text-teal-500",
  lime: "hover:text-lime-500",
  red: "hover:text-red-500",
  pink: "hover:text-pink-500",
  purple: "hover:text-purple-500",
  "[#ff2854]": "hover:text-[#ff2854]",
};

const borderBgColors = {
  white: "border-white",
  blue: "border-blue-500",
  green: "border-green-500",
  cyan: "border-cyan-500",
  teal: "border-teal-500",
  lime: "border-lime-500",
  red: "border-red-500",
  pink: "border-pink-500",
  purple: "border-purple-500",
  "[#ff2854]": "border-[#ff2854]",
};

const bgColors = {
  white: "bg-white",
  blue: "bg-blue-500",
  green: "bg-green-500",
  cyan: "bg-cyan-500",
  teal: "bg-teal-500",
  lime: "bg-lime-500",
  red: "bg-red-500",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  "[#ff2854]": "bg-[#ff2854]",
};

const hoverBgColors = {
  white: "hover:bg-white",
  blue: "hover:bg-blue-500",
  green: "hover:bg-green-500",
  cyan: "hover:bg-cyan-500",
  teal: "hover:bg-teal-500",
  lime: "hover:bg-lime-500",
  red: "hover:bg-red-500",
  pink: "hover:bg-pink-500",
  purple: "hover:bg-purple-500",
  "[#ff2854]": "hover:bg-[#ff2854]",
};

const focusRingColors = {
  white: "focus:ring-white",
  blue: "focus:ring-blue-500",
  green: "focus:ring-green-500",
  cyan: "focus:ring-cyan-500",
  teal: "focus:ring-teal-500",
  lime: "focus:ring-lime-500",
  red: "focus:ring-red-500",
  pink: "focus:ring-pink-500",
  purple: "focus:ring-purple-500",
  "[#ff2854]": "focus:ring-[#ff2854]",
};

const IconButton = ({
  color,
  className,
  children,
  bgColor,
  textColor,
  textColorOnHover,
  ...rest
}: IIconButtonProps) => {
  return (
    <button
      {...rest}
      className={classNames(
        `border focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center`,
        className,
        textColors[textColor],
        borderBgColors[color],
        hoverTextColors[textColorOnHover || textColor],
        hoverBgColors[color],
        focusRingColors[color],
        !!bgColor ? bgColors[bgColor] : ""
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
