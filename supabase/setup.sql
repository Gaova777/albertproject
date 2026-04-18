-- ============================================================================
-- UrbanSwag — Supabase setup
-- Copiar TODO este archivo en: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================================

-- 1. Tabla de productos --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  material TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para auto-actualizar updated_at en cada UPDATE
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_set_updated_at ON public.products;
CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2. Seed inicial (6 buzos) ----------------------------------------------------
INSERT INTO public.products (slug, name, price, material, sort_order) VALUES
  ('nocturno',       'Buzo Nocturno',      '$89.000',  'Algodón premium 320g',     1),
  ('classic-hood',   'Buzo Classic Hood',  '$95.000',  'Fleece perchado 340g',     2),
  ('urban-elite',    'Buzo Urban Elite',   '$109.000', 'Heavyweight cotton 380g',  3),
  ('street-vision',  'Buzo Street Vision', '$92.000',  'Algodón orgánico 300g',    4),
  ('minimal-code',   'Buzo Minimal Code',  '$85.000',  'French terry 280g',        5),
  ('urban-flow',     'Buzo Urban Flow',    '$99.000',  'Heavyweight cotton 380g',  6)
ON CONFLICT (slug) DO NOTHING;

-- 3. Row Level Security (RLS) --------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Cualquier visitante puede LEER productos (landing pública)
DROP POLICY IF EXISTS "products_select_public" ON public.products;
CREATE POLICY "products_select_public"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Solo usuarios autenticados pueden INSERTAR/ACTUALIZAR/BORRAR
DROP POLICY IF EXISTS "products_modify_authenticated" ON public.products;
CREATE POLICY "products_modify_authenticated"
  ON public.products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Storage bucket para imágenes ---------------------------------------------
-- IMPORTANTE: el bucket se crea por la UI, no por SQL.
-- Supabase bloqueó el INSERT directo a storage.buckets en versiones recientes.
-- Pasos manuales (toma 30 segundos):
--   1. Dashboard → Storage → "New bucket"
--   2. Name: product-images
--   3. Public bucket: ON
--   4. Create bucket
-- Las policies de abajo SE APLICAN SOLAS una vez que el bucket existe.

-- Policies del bucket
DROP POLICY IF EXISTS "product_images_select_public" ON storage.objects;
CREATE POLICY "product_images_select_public"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "product_images_insert_authenticated" ON storage.objects;
CREATE POLICY "product_images_insert_authenticated"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "product_images_update_authenticated" ON storage.objects;
CREATE POLICY "product_images_update_authenticated"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "product_images_delete_authenticated" ON storage.objects;
CREATE POLICY "product_images_delete_authenticated"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');

-- ============================================================================
-- LISTO. Verificá:
--   SELECT * FROM public.products ORDER BY sort_order;
-- Deberías ver 6 filas.
-- ============================================================================
