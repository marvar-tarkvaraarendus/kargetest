import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Type for multi-language JSON fields
export type MultiLang = {
  et: string;
  en: string;
};

// Helper to get text in current language
export function getLocalizedText(
  content: MultiLang | unknown,
  locale: "et" | "en"
): string {
  if (!content || typeof content !== "object") return "";
  const typed = content as MultiLang;
  return typed[locale] || typed.et || "";
}

// Helper to format price
export function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return `€${num.toFixed(2)}`;
}
