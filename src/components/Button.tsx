import type { ButtonProps, ButtonVariant } from "../features/todo/types/todo.types";
import { cn } from "../utils/utils";

export default function Button({
  children,
  className,
  type = "button",
  variant = "primary", // Default variant
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "box-border border font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:ring-1 transition-colors duration-200";

  // Map variants to specific Tailwind classes
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "border-transparent bg-todo-button text-white hover:bg-brand-strong focus:ring-brand-medium",
    secondary:
      "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200",
    danger:
      "border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading} // Disable button while loading
      className={cn(
        baseStyles,
        variantStyles[variant],
        // Clsx logic: adds opacity and changes cursor only when isLoading is true
        { "opacity-50 cursor-not-allowed pointer-events-none": isLoading },
        className,
      )}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
