"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "./ProductGridSkeleton";
import { Product } from "@/types/product";
export default function CategoryClient({
  products,
  title,
  icon,
}: {
  products: Product[];
  title: string;
  icon: string;
}) {
  const [sort, setSort] = useState("default");
  const sorted = useMemo(() => {
    const copy = [...products];
    if (sort === "asc") copy.sort((a, b) => a.price - b.price);
    if (sort === "desc") copy.sort((a, b) => b.price - a.price);
    return copy;
  }, [products, sort]);
  return (
    <div className="container-main py-8">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-3xl">{icon}</div>
          <h1 className="mt-2 text-3xl font-black">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            এই ক্যাটাগরির আজকের বাজারদর।
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold">
          সাজান
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      {sorted.length === 0 ? (
        <div className="card py-20 text-center">
          <div className="text-5xl">🧺</div>
          <h2 className="mt-4 text-xl font-bold">
            এই ক্যাটাগরিতে কোনো পণ্য নেই
          </h2>
          <a href="/" className="btn-primary mt-5">
            হোম পেজে ফিরে যান
          </a>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
export function CategorySkeleton() {
  return (
    <div className="container-main py-8">
      <ProductGridSkeleton count={8} />
    </div>
  );
}
