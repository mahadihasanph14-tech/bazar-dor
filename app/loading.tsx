import ProductGridSkeleton from "@/components/ProductGridSkeleton";
export default function Loading() {
  return (
    <div className="container-main py-10">
      <div className="h-64 animate-pulse rounded-[24px] bg-white" />
      <div className="mt-10">
        <div className="mb-5 h-7 w-48 animate-pulse rounded bg-slate-200" />
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
