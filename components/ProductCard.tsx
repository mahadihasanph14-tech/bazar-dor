import Link from "next/link";
import { Product } from "@/types/product";
import { money, percent } from "@/lib/utils";
export default function ProductCard({ product }: { product: Product }) {
  const up = product.change > 0,
    down = product.change < 0;
  return (
    <Link
      href={`/product/${product.id}`}
      className="card group block p-4 transition hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-50 text-2xl">
          {product.emoji}
        </div>
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-bold ${up ? "bg-green-50 text-green-600" : down ? "bg-red-50 text-red-500" : "bg-slate-100 text-slate-500"}`}
        >
          {percent(product.change)}
        </span>
      </div>
      <h3 className="mt-4 font-bold group-hover:text-brand-600">
        {product.name}
      </h3>
      <p className="mt-1 text-xs text-slate-500">{product.unit}</p>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-slate-500">আজকের দাম</p>
          <p className="text-lg font-extrabold">{money(product.price)}</p>
        </div>
        <span className="text-xs text-slate-400">{product.categoryName}</span>
      </div>
    </Link>
  );
}
