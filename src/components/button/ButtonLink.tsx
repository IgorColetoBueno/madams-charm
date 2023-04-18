import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IButtonLinkProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: string;
}

const ButtonLink = ({ children, className, ...rest }: IButtonLinkProps) => {
  return (
    <button
      {...rest}
      className={classNames(
        "font-medium text-blue-600 dark:text-blue-500 hover:underline",
        className
      )}
    >
      {children}
    </button>
  );
};

export default ButtonLink;
