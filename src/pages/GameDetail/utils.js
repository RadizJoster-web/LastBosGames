export const SHELL = "mx-auto max-w-[1200px] px-5 md:px-8";

export function toPlainText(blocks) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((b) => b._type === "block" && Array.isArray(b.children))
    .map((b) => b.children.map((c) => c.text).join(""))
    .join(" ")
    .trim();
}
