import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const durationAsString = (duration: number) => {
  // Calculate and set timer string whenever duration changes
  let difference = Math.abs(duration); // difference in seconds
  const hours = Math.floor(difference / 3600);
  difference -= hours * 3600;
  const minutes = Math.floor(difference / 60) % 60;
  difference -= minutes * 60;
  const seconds = Math.floor(difference % 60);

  const res = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  return res;
};

export const getWeekDay = (day: number) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Unknown";
  }
};

export function isSameDate(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const editParams = (
  queryObj: object,
  URLParams: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(URLParams);
  Object.keys(queryObj).forEach((key) => {
    if (queryObj[key as keyof object] === "deleteParam") {
      params.delete(key);
    } else {
      params.set(key, queryObj[key as keyof object]);
    }
  });
  return params.toString();
};

export const recommendedWorkout = (previous: string) => {
  switch (previous) {
    case "Push":
      return "Pull";
    case "Pull":
      return "Legs";
    case "Legs":
      return "Push";
    default:
      return "Push";
  }
};
