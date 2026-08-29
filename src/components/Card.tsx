import type { CardInterface } from "../features/todo/types/todo.types";
import { cn } from "../utils/utils";

export default function Card({
  children,
  className,
  onClick,
  ...props
}: CardInterface) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border-2 border-gray-300 px-6 py-2",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
