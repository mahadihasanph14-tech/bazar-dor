import { Category, Product } from "@/types/product";
import { emojiFor } from "./utils";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

const fallback = "https://api.abcz.workers.dev/api/bazardor";

async function fetchJson(path: string): Promise<any | null> {
  const urls = [...new Set([API_BASE, fallback])];

  for (const base of urls) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 300 },
      });

      if (!res.ok) continue;

      return await res.json();
    } catch {
      continue;
    }
  }

  return null;
}

async function getJson(path: string) {
  const data = await fetchJson(path);

  if (data === null) {
    throw new Error("API data could not be loaded");
  }

  return data;
}

const listFrom = (data: any): any[] => {
  if (Array.isArray(data)) return data;

  return (
    data?.data ??
    data?.products ??
    data?.items ??
    data?.results ??
    []
  );
};

function normalizeProduct(p: any): Product {
  const name =
    p.nameBn ??
    p.name ??
    p.title ??
    p.productName ??
    "পণ্য";

  const rawMarkets = p.markets ?? p.marketPrices ?? p.prices ?? [];

  const marketPrices = Array.isArray(rawMarkets)
    ? rawMarkets.map((m: any) => {
        const min = Number(m.min ?? m.price ?? 0);
        const max = Number(m.max ?? m.price ?? min);

        return {
          market:
            m.market ??
            m.bazar ??
            m.name ??
            m.location ??
            "স্থানীয় বাজার",
          price: Math.round((min + max) / 2),
          unit: p.unit === "kg" ? "প্রতি কেজি" : p.unit,
        };
      })
    : [];

  const price = Number(
    p.today ??
      p.price ??
      p.currentPrice ??
      p.todayPrice ??
      marketPrices[0]?.price ??
      0,
  );

  const changeValue =
    typeof p.change === "object" && p.change !== null
      ? Number(p.change.pct ?? 0) *
        (p.change.dir === "down" ? -1 : 1)
      : Number(p.change ?? p.changePercent ?? 0);

  return {
    id: p.id ?? p.slug ?? p._id,
    name,
    category:
      typeof p.category === "object"
        ? p.category.slug ?? "other"
        : p.category ?? p.categorySlug ?? "other",
    categoryName:
      p.categoryNameBn ??
      p.categoryName ??
      (typeof p.category === "object"
        ? p.category.name
        : p.category) ??
      "অন্যান্য",
    unit:
      p.unit === "kg"
        ? "প্রতি কেজি"
        : p.unit === "liter"
          ? "প্রতি লিটার"
          : p.unit === "piece"
            ? "প্রতি পিস"
            : p.unit === "dozen"
              ? "প্রতি ডজন"
              : p.unit ?? "প্রতি কেজি",
    price,
    change: changeValue,
    description:
      p.description ??
      `আজকের ${name}-এর বাজারদর ও বিভিন্ন বাজারের দাম দেখুন।`,
    emoji: p.image ?? p.emoji ?? p.categoryIcon ?? emojiFor(name),
    marketPrices,
  };
}

export async function getProducts(
  category?: string,
): Promise<Product[]> {
  const path = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";

  const data = await fetchJson(path);
  let products = listFrom(data);

  if (products.length === 0) {
    const results = await Promise.all(
      Array.from({ length: 33 }, (_, i) =>
        fetchJson(`/products/${i + 1}`),
      ),
    );

    products = results
      .map((result) => {
        if (!result) return null;

        const product = result.data ?? result.product ?? result;

        if (!product || product.id === undefined) return null;

        return product;
      })
      .filter(Boolean);
  }

  const normalized = products
    .map(normalizeProduct)
    .filter((p) => p.id !== undefined && p.id !== null);

  if (!category) return normalized;

  return normalized.filter((p) => p.category === category);
}

export async function getProduct(
  id: string,
): Promise<Product | null> {
  try {
    let data = await fetchJson(
      `/products/${encodeURIComponent(id)}`,
    );

    if (!data) {
      const products = await getProducts();

      return (
        products.find(
          (p) => String(p.id) === id || String(p.name) === id,
        ) ?? null
      );
    }

    data = data.data ?? data.product ?? data;

    if (!data || data.id === undefined) return null;

    return normalizeProduct(data);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson("/categories");
  let categories = listFrom(data);

  if (categories.length === 0) {
    const products = await getProducts();
    const unique = new Map<string, Category>();

    for (const product of products) {
      if (!unique.has(product.category)) {
        unique.set(product.category, {
          slug: product.category,
          name: product.categoryName,
          icon: product.emoji,
        });
      }
    }

    return Array.from(unique.values());
  }

  return categories
    .map((c: any) => ({
      slug: c.slug ?? c.id ?? c.code,
      name: c.nameBn ?? c.name ?? c.title ?? c.categoryName,
      icon: c.icon ?? c.categoryIcon ?? emojiFor(c.nameBn ?? c.name ?? ""),
    }))
    .filter((c: Category) => c.slug && c.name);
}