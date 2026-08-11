import { cn } from "../utils/utils";

interface CircularProgressProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

const CircularProgress = ({
  percentage = 0,
  size = 120,
  strokeWidth = 10,
  color = "text-blue-400",
  className,
}: CircularProgressProps) => {
  // Calculations for the SVG circle math
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative flex aspect-square items-center justify-center", className)}>
      <svg className="h-full w-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle Track */}
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Active Progress Circle */}
        <circle
        className={ cn(`stroke-current transition-all duration-300 ease-in-out`,color)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Centered Percentage Text Label */}
      <span className="absolute text-sm font-semibold text-gray-700 sm:text-base lg:text-xl">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export default CircularProgress;
