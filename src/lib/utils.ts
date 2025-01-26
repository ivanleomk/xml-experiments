import { clsx, type ClassValue } from "clsx";
import { CalendarDays, Globe, LucideIcon, Mail } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SearchGroupId = "All" | "Events" | "Emails";

export type SearchGroup = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

export const searchGroups = [
  {
    id: "All" as const,
    name: "All",
    description: "Search across all documents",
    icon: Globe,
  },
  {
    id: "Emails" as const,
    name: "Emails",
    description: "Search your emails",
    icon: Mail,
  },
  {
    id: "Events" as const,
    name: "Events",
    description: "Search events and activities",
    icon: CalendarDays,
  },
];
