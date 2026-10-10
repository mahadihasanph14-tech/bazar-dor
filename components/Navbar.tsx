import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import AuthNav from "./AuthNav";
import CategoryNav from "./CategoryNav";
import { money, percent } from "@/lib/utils";

export default async function Navbar() {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ]);
  const ticker = products.slice(0, 12);
  const today = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  return (
    <header className="bg-white">
      <div className="container-main flex min-h-[72px] items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 text-xl">
            🛒
          </span>
          <span>
            <span className="block text-[18px] font-extrabold">বাজার দর</span>
            <span className="block text-[10px] text-slate-500">{today}</span>
          </span>
        </Link>
        <CategoryNav categories={categories} />
        <AuthNav />
      </div>
      <div className="border-t border-slate-100 md:hidden">
        <div className="container-main flex gap-1 overflow-x-auto py-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="shrink-0 rounded-full bg-slate-50 px-3 py-1.5 text-xs"
            >
              {c.icon} {c.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="ticker">
        <div className="ticker-track">
          {[...ticker, ...ticker].map((p, i) => (
            <span className="ticker-item" key={`${p.id}-${i}`}>
              {p.emoji} {p.name} · {money(p.price)}/
              {p.unit.replace("প্রতি ", "")} ·{" "}
              <span
                className={
                  p.change > 0
                    ? "text-green-600"
                    : p.change < 0
                      ? "text-red-500"
                      : "text-slate-400"
                }
              >
                {percent(p.change)}
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
