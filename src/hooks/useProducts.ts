import { useCallback, useEffect, useState } from "react";
import { fetchProducts, Product } from "../lib/products";
import { isSupabaseConfigured } from "../lib/supabase";
import { products as fallbackProducts } from "../data/products";

const asFallback = (): Product[] =>
  fallbackProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    material: p.material,
    image_url: p.fallback,
    sort_order: p.id,
  }));

export interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setProducts(asFallback());
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data.length ? data : asFallback());
    } catch (err) {
      console.error("fetchProducts failed:", err);
      setError(err instanceof Error ? err.message : "Error cargando productos");
      setProducts(asFallback());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { products, loading, error, reload: load };
};
