import classNames from "classnames";
import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";

// Define the props for the Input component, which extends the HTML input element's attributes.
interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  success: boolean;
  errorMessage?: string;
  containerClassName?: string;
  label: string;
  type: HTMLInputTypeAttribute;
}

// Create variables to store the class names for each state of the input and text color.
// These strings are defined in Tailwind CSS classes.
const textSuccess = "text-green-700 dark:text-green-500";
const textError = "text-red-700 dark:text-red-500";
const textDefault = "text-gray-900 dark:text-white";

const inputError =
  "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
const inputSuccess =
  "bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500";
const inputDefault =
  "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

// Define the Input component using destructured props.
const Input = ({
  errorMessage,
  success,
  containerClassName,
  label,
  ...rest
}: IInputProps) => {
  // Use the classNames library to generate dynamic class names for text color.
  const textClassname = classNames({
    [textError]: !!errorMessage,
    [textSuccess]: success,
    [textDefault]: !success && !errorMessage,
  });

  // Use the classNames library to generate dynamic class names for input element style.
  const inputClassname = classNames({
    [inputError]: !!errorMessage,
    [inputSuccess]: success,
    [inputDefault]: !success && !errorMessage,
  });

  // Render the component with the appropriate classes based on success and error state.
  return (
    <div className={containerClassName}>
      <label
        htmlFor={rest.id || `input-${rest.name}`}
        className={classNames("block mb-2 text-sm font-medium", textClassname)}
      >
        {label}
      </label>
      <input
        {...rest}
        id={rest.id || `input-${rest.name}`}
        className={classNames(
          "block w-full p-2.5 text-sm rounded-lg border",
          inputClassname,
          rest.className
        )}
      />
      {!!errorMessage && (
        <p className={classNames("mt-2 text-sm", textError)}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
