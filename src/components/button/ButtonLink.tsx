import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface IButtonLinkProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: string | ReactNode;
}

const ButtonLink = ({ children, className, ...rest }: IButtonLinkProps) => {
  return (
    <button
      {...rest}
      className={classNames(
        "font-medium text-blue-600 dark:text-gray-100 underline underline-offset-4",
        className
      )}
    >
      {children}
    </button>
  );
};

export default ButtonLink;
