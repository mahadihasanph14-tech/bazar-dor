import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { money } from "@/lib/utils";
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect(`/signin?next=/product/${slug}&reason=auth`);
  const product = await getProduct(slug);
  if (!product) notFound();
  const prices = product.marketPrices.length
    ? product.marketPrices
    : [{ market: "স্থানীয় বাজার", price: product.price, unit: product.unit }];
  const values = prices.map((x) => x.price).filter(Boolean);
  const min = Math.min(...values),
    max = Math.max(...values),
    avg = values.reduce((a, b) => a + b, 0) / values.length;
  return (
    <div className="container-main py-8">
      <div className="card p-6 md:p-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-50 text-4xl">
                {product.emoji}
              </div>
              <div>
                <h1 className="text-3xl font-black">{product.name}</h1>
                <p className="mt-1 text-sm text-slate-500">
                  {product.description}
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                {product.categoryName}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                {product.unit}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Stat label="সর্বনিম্ন দাম" value={money(min)} />
          <Stat label="সর্বোচ্চ দাম" value={money(max)} />
          <Stat label="গড় দাম" value={money(avg)} />
        </div>
      </div>
      <section className="card mt-6 overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-xl font-black">বাজারভিত্তিক আজকের দাম</h2>
          <p className="mt-1 text-xs text-slate-500">
            বিভিন্ন বাজারের সর্বশেষ পাওয়া দাম।
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-sm">
            <thead className="bg-slate-50 text-left text-xs text-slate-500">
              <tr>
                <th className="px-5 py-3">বাজার</th>
                <th className="px-5 py-3">পণ্য</th>
                <th className="px-5 py-3">ইউনিট</th>
                <th className="px-5 py-3 text-right">আজকের দাম</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-5 py-4 font-semibold">{p.market}</td>
                  <td className="px-5 py-4">{product.name}</td>
                  <td className="px-5 py-4 text-slate-500">
                    {p.unit || product.unit}
                  </td>
                  <td className="px-5 py-4 text-right font-bold">
                    {money(p.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-[#f8fbf8] p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-black">{value}</p>
    </div>
  );
}
