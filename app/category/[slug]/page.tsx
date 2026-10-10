import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import CategoryClient from "@/components/CategoryClient";
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const products = await getProducts(slug).catch(() => []);
  return (
    <CategoryClient
      products={products}
      title={category.name}
      icon={category.icon}
    />
  );
}
