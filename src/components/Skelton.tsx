// src/components/ui/Skeleton.jsx
import type { ComponentPropsWithRef } from "react";
import { cn } from "../utils/utils";

export interface SkeltonProps extends ComponentPropsWithRef<"div">
{

}
export function Skeleton({ className, ...props }:SkeltonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-gray-800", className)}
      {...props}
    />
  );
}