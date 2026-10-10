"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types/product";
export default function CategoryNav({
  categories,
}: {
  categories: Category[];
}) {
  const path = usePathname();
  return (
    <div className="hidden items-center gap-2 md:flex">
      <Link
        href="/"
        className={`rounded-lg px-3 py-2 text-sm font-semibold ${path === "/" ? "bg-brand-500 text-white" : "hover:bg-brand-50"}`}
      >
        হোম
      </Link>
      {categories.slice(0, 7).map((c) => {
        const active = path === `/category/${c.slug}`;
        return (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={`rounded-lg px-3 py-2 text-sm ${active ? "bg-brand-50 font-bold text-brand-700" : "hover:bg-brand-50"}`}
          >
            {c.icon} {c.name}
          </Link>
        );
      })}
    </div>
  );
}
