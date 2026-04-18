import { getSupabase, STORAGE_BUCKET } from "./supabase";

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  material: string;
  image_url: string | null;
  sort_order: number;
}

export interface ProductUpdate {
  name?: string;
  price?: string;
  material?: string;
  image_url?: string | null;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, name, price, material, image_url, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Product[];
};

export const updateProduct = async (
  id: number,
  patch: ProductUpdate
): Promise<Product> => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("products")
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
};

export const uploadProductImage = async (
  slug: string,
  file: File
): Promise<string> => {
  const supabase = getSupabase();
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp"].includes(extension)
    ? extension
    : "jpg";
  const path = `${slug}-${Date.now()}.${safeExt}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "image/jpeg",
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
};
