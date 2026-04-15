import { clsx } from "clsx";
import { format, formatDistanceToNowStrict, isToday, isYesterday } from "date-fns";

export function cn(...inputs: Array<string | false | null | undefined>) {
  return clsx(inputs);
}

export function formatChatTimestamp(value: string) {
  const date = new Date(value);

  if (isToday(date)) {
    return format(date, "HH:mm");
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "dd/MM");
}

export function formatRelativePulse(value: string) {
  return formatDistanceToNowStrict(new Date(value), {
    addSuffix: true,
  });
}

export function pickOne<T>(items: T[], seed: number) {
  return items[Math.abs(seed) % items.length];
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
