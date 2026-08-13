import { XMarkIcon } from "@heroicons/react/16/solid";
import type { ModalInterface } from "../features/todo/types/todo.types";
import { cn } from "../utils/utils";

export default function Modal({
  children,
  className,
  title,
  isOpen,
  onClose,
  ...props
}: ModalInterface) {
  return (
    <>
        {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className={cn(
              "relative max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 text-gray-700 shadow-xl sm:p-6",
              className,
            )}
            {...props}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {title}
              </h3>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => onClose()}
                aria-label="Close modal"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 py-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
