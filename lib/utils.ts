export const bnDigits = (value: number | string) =>
  String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
export const money = (value: number) =>
  `${bnDigits(Math.round(value).toLocaleString("en-US"))} টাকা`;
export const percent = (value: number) =>
  `${value > 0 ? "▲" : value < 0 ? "▼" : "—"} ${bnDigits(Math.abs(value).toFixed(1))}%`;
export const normalizeNumber = (value: unknown) => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return 0;
  const bn = value
    .replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)))
    .replace(/,/g, "");
  const n = Number(bn.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};
export const emojiFor = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("চাল") || n.includes("rice")) return "🍚";
  if (n.includes("ডাল") || n.includes("lentil")) return "🫘";
  if (n.includes("তেল") || n.includes("oil")) return "🫙";
  if (n.includes("আলু") || n.includes("potato")) return "🥔";
  if (n.includes("পেঁয়াজ") || n.includes("পেঁয়াজ") || n.includes("onion"))
    return "🧅";
  if (n.includes("মরিচ") || n.includes("chili")) return "🌶️";
  if (n.includes("মাছ") || n.includes("fish")) return "🐟";
  if (n.includes("মাংস") || n.includes("meat")) return "🍗";
  if (n.includes("ডিম") || n.includes("egg")) return "🥚";
  if (n.includes("আদা") || n.includes("ginger")) return "🫚";
  if (n.includes("রসুন") || n.includes("garlic")) return "🧄";
  return "🛒";
};
