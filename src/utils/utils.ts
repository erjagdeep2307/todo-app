import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCloudinaryVersionFromPath(cloudinaryUrl: string) {
  try {
    const { pathname } = new URL(cloudinaryUrl);
    const segments = pathname.split("/");

    // Find the path segment starting with 'v' followed purely by numbers
    const versionSegment = segments.find((seg) => /^v\d+$/.test(seg));
    return versionSegment || null;
  } catch {
    return null; // Invalid URL
  }
}
export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const INPUT_BASE_CLASS =
  "bg-neutral-secondary-medium border-default-medium text-heading focus:ring-brand focus:border-brand block w-full rounded-md border py-2.5 px-2 text-sm shadow placeholder:text-body";
export const PRIORITY = ["Low", "Medium", "High", "Extreme"] as const;

const baseCloudURL = import.meta.env.VITE_CLOUDINARY_BASE_URL;
export const getImageUrl = (
  publicId: string,
  width: number = 0,
  height: number = 0,
) => {
  if (width === 0 || height === 0) {
    return `${baseCloudURL}/${publicId}.webp`;
  }
  return `${baseCloudURL}w_${width},h_${height},c_fill,g_auto,f_webp,q_auto/${publicId}.webp`;
};
