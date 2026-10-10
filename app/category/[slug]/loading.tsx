import ProductGridSkeleton from "@/components/ProductGridSkeleton";
export default function Loading() {
  return (
    <div className="container-main py-8">
      <div className="h-10 w-56 animate-pulse rounded bg-slate-200" />
      <div className="mt-8">
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
