import HomeContent from "@/components/HomeContent";
import { getProducts } from "@/lib/api";
export default async function Home() {
  const products = await getProducts();
  return <HomeContent products={products} />;
}
