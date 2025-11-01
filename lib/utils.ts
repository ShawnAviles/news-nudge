import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  /**
 * Get current date string in format yyyy-mm-dd--hh-mm
 * @returns {String} current date
 */
export const getCurrentDateWithTime = () => {
	const dt = new Date();
	const zonedDateParts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/New_York",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).formatToParts(dt);

	const dateData: Record<string, string> = {};
	zonedDateParts.forEach(({ type, value }) => {
		dateData[type] = value;
	});

	const dateString = `${dateData.year}-${dateData.month}-${dateData.day}_${dateData.hour}:${dateData.minute}`;
	return dateString;
};