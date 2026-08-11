import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
export const INPUT_BASE_CLASS =
  "bg-neutral-secondary-medium border-default-medium text-heading focus:ring-brand focus:border-brand block w-full rounded-md border py-2.5 px-2 text-sm shadow placeholder:text-body";
export const PRIORITY = ["Low", "Medium", "High"];
export const STATUS = ["Completed", "InProgress", "NoStarted"];
