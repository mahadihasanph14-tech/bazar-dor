export type MarketPrice = { market: string; price: number; unit?: string };
export type Product = {
  id: string | number;
  name: string;
  category: string;
  categoryName: string;
  unit: string;
  price: number;
  change: number;
  description: string;
  emoji: string;
  marketPrices: MarketPrice[];
};
export type Category = { slug: string; name: string; icon: string };
