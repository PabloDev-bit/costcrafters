import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine et fusionne les classes conditionnelles
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
