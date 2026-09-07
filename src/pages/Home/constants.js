export const SHELL = "mx-auto max-w-[1400px] px-5 md:px-8";

export function fmt(n) {
  if (n === undefined || n === null) return "—";
  return String(n);
}
