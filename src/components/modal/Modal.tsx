import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { ReactNode } from "react";

interface IModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode | ReactNode[] | null;
  footer?: ReactNode | ReactNode[] | null;
}

const Modal = ({ open, title, children, onClose, footer }: IModalProps) => {
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      aria-modal="true"
      className={classNames(
        "fixed top-0 left-0 right-0 z-50 w-full h-full overflow-x-hidden overflow-y-auto h-modal bg-gray-900/80",
        { hidden: !open }
      )}
    >
      <div className="flex align-items-center w-full h-full">
        <div className="relative mx-auto my-auto max-w-[95vw] rounded-lg shadow bg-gray-200 dark:bg-gray-700">
          {!!title && (
            <div className="flex items-start justify-between p-4 rounded-t">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                onClick={() => {
                  onClose();
                }}
                type="button"
                className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              >
                <XMarkIcon strokeWidth={3} className="w-5 h-5" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          )}
          <div className="p-6 space-y-6">
            <div className="text-base leading-relaxed text-gray-300">
              {children}
            </div>
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
