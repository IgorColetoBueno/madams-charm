import { ColorType } from "@/models/colors";
import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color: ColorType;
}

const buttonColors = {
  white:
    "text-gray-900 from-gray-50 via-gray-100 to-white focus:ring-white dark:focus:ring-white shadow-white/50 dark:shadow-white/50",
  blue: "text-white from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-blue-800/80",
  green:
    "text-white from-green-400 via-green-500 to-green-600 focus:ring-green-300 dark:focus:ring-green-800 shadow-green-500/50 dark:shadow-green-800/80",
  cyan: "text-white from-cyan-400 via-cyan-500 to-cyan-600 focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-cyan-500/50 dark:shadow-cyan-800/80",
  teal: "text-white from-teal-400 via-teal-500 to-teal-600 focus:ring-teal-300 dark:focus:ring-teal-800 shadow-teal-500/50 dark:shadow-teal-800/80",
  lime: "text-gray-900 from-lime-200 via-lime-400 to-lime-500 focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lime-500/50 dark:shadow-lime-800/80",
  red: "text-white from-red-400 via-red-500 to-red-600 focus:ring-red-300 dark:focus:ring-red-800 shadow-red-500/50 dark:shadow-red-800/80",
  pink: "text-white from-pink-400 via-pink-500 to-pink-600 focus:ring-pink-300 dark:focus:ring-pink-800 shadow-pink-500/50 dark:shadow-pink-800/80",
  purple:
    "text-white from-purple-500 via-purple-600 to-purple-700 focus:ring-purple-300 dark:focus:ring-purple-800 shadow-purple-500/50 dark:shadow-purple-800/80",
  "[#ff2854]": "",
};

const Button = ({ color, className, children, ...rest }: IButtonProps) => {
  return (
    <button
      {...rest}
      className={classNames(
        "font-medium rounded-lg text-sm px-10 py-3 text-center shadow-lg bg-gradient-to-r hover:bg-gradient-to-br focus:ring-4 focus:outline-none",
        buttonColors[color],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
