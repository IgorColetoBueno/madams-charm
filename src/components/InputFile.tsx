import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface IInputFileProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const InputFile = ({ ...rest }: IInputFileProps) => {
  return (
    <div className="w-full">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={rest.id || `input-${rest.name}`}
      >
        Upload files
      </label>
      <label className="block bg-gray-800 rounded-lg w-full">
        <input
          {...rest}
          accept="image/jpg,image/jpeg,image/gif,image/png"
          id={rest.id || `input-${rest.name}`}
          className="block w-full text-xs text-slate-50 file:mr-4 file:py-5 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-800 file:text-gray-50 cursor-pointer"
          type="file"
        ></input>
      </label>
    </div>
  );
};

export default InputFile;
