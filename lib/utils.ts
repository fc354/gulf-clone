export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatRelative(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
