import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

export default function HomeContent({ products }: { products: Product[] }) {
const risers = [...products]
.filter((p) => p.change > 0)
.sort((a, b) => b.change - a.change)
.slice(0, 6);

const fallers = [...products]
.filter((p) => p.change < 0)
.sort((a, b) => a.change - b.change)
.slice(0, 6);

return (
<> <section className="container-main pt-8"> <div className="grid items-center gap-8 overflow-hidden rounded-[24px] border border-brand-100 bg-white p-7 shadow-soft md:grid-cols-[1.1fr_.9fr] md:p-10"> <div> <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
আজকের বাজার, সহজ নজরে </span>


        <h1 className="mt-4 max-w-xl text-3xl font-black leading-tight md:text-5xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
          চাল, ডাল, তেল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম এবং
          দৈনিক পরিবর্তন সহজেই দেখুন।
        </p>

        <a href="#সব-পণ্য" className="btn-primary mt-6">
          সব পণ্য দেখুন ↓
        </a>
      </div>

      <div className="flex justify-center">
        <img
          src="/hero.png"
          alt="বাজারের পণ্যের ঝুড়ি"
          className="w-full max-w-[430px]"
        />
      </div>
    </div>
  </section>

  {risers.length > 0 && (
    <ProductSection title="আজ দাম বেড়েছে ▲" products={risers} />
  )}

  <ProductSection title="আজ দাম কমেছে ▼" products={fallers} />

  <section id="সব-পণ্য" className="container-main scroll-mt-8 py-8">
    <div className="mb-5">
      <h2 className="text-2xl font-black">সব পণ্য</h2>

      <p className="mt-1 text-sm text-slate-500">
        আজকের বাজারের সব পণ্য ও দামের পরিবর্তন এক জায়গায়।
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
</>


);
}

function ProductSection({
title,
products,
}: {
title: string;
products: Product[];
}) {
return ( <section className="container-main py-7"> <div className="mb-5 flex items-end justify-between"> <h2 className="text-2xl font-black">{title}</h2>


    <span className="text-xs text-slate-400">
      শীর্ষ {products.length}টি
    </span>
  </div>

  {products.length > 0 ? (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  ) : (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
      <p className="text-3xl">📉</p>

      <p className="mt-3 text-base font-bold text-slate-700">
        আজ কোনো পণ্যের দাম কমেনি।
      </p>

      <p className="mt-2 text-sm text-slate-500">
        দাম কমলে সেই পণ্যগুলো এখানে দেখা যাবে।
      </p>
    </div>
  )}
</section>


);
}
