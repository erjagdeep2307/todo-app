import type { FormControls } from "../features/todo/types/todo.types";
import { cn } from "../utils/utils";
export default function FormControl({
  className,
  children,
  labelText,
  id
}: FormControls) {
  return (
    <div className={cn("mb-3", className)}>
      <label
        htmlFor={id}
        className="block mb-1.5 lg:mb-2.0 text-sm font-medium text-heading capitalize"
      >
        {labelText}
      </label>
      {children}
    </div>
  );
}
