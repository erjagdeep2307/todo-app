// src/components/ui/Skeleton.jsx
import type { ComponentPropsWithRef } from "react";
import { cn } from "../utils/utils";

export interface SkeletonProps extends ComponentPropsWithRef<"div">
{

}
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-gray-800", className)}
      {...props}
    />
  );
}
