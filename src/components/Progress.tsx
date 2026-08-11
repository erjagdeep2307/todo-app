import type { ProgressData } from "../features/todo/types/todo.types";
import CircularProgress from "./ProgressCircle";

const captionBorderClass: Record<ProgressData["color"], string> = {
  "text-green-500": "border-green-500",
  "text-blue-500": "border-blue-500",
  "text-red-500": "border-red-500",
};

export default function Progress({color,size,value,caption}:ProgressData) {
  return (
    <div className="flex min-w-20 flex-1 flex-col items-center lg:gap-1 sm:min-w-24 sm:flex-none">
      <CircularProgress
        percentage={value}
        size={size}
        color={`${color}`}
        className="w-18 max-w-full sm:w-22 lg:w-25"
      />
      <div className="flex items-center gap-1">
        <span className={`inline-block border-2 rounded-full ${captionBorderClass[color]} h-2 w-2`}></span>
        <span className="text-[10px] font-medium text-black sm:text-xs">{caption}</span>
      </div>
    </div>
  );
}
