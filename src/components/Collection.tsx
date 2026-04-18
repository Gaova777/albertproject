import React from "react";
import { useProducts } from "../hooks/useProducts";
import { products as fallback } from "../data/products";
import { whatsappForProduct } from "../utils/whatsapp";

const getFallback = (slug: string): string => {
  return fallback.find((p) => p.slug === slug)?.fallback ?? "";
};

const Collection: React.FC = () => {
  const { products, loading } = useProducts();

  return (
    <section id="collection" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-6 border-b border-stone-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-stone-500">
              Colección FW 2025
            </p>
            <h2 className="text-5xl font-light leading-[0.95] tracking-tight text-stone-950 md:text-7xl">
              Últimos
              <br />
              <span className="italic font-serif">drops</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-stone-600">
            Piezas en edición limitada, pensadas para durar. Cortes oversize,
            telas pesadas y acabados premium.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-stone-100" />
                <div className="mt-5 h-4 w-32 bg-stone-100" />
                <div className="mt-2 h-3 w-24 bg-stone-100" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const imageSrc =
                product.image_url || getFallback(product.slug);
              return (
                <article key={product.id} className="group">
                  <a
                    href={whatsappForProduct(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                      <img
                        src={imageSrc}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                          const img = e.currentTarget;
                          const fb = getFallback(product.slug);
                          if (fb && img.src !== fb) img.src = fb;
                        }}
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-900 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                        Consultar por WhatsApp
                      </span>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-medium text-stone-950">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-500">
                          {product.material}
                        </p>
                      </div>
                      <span className="whitespace-nowrap text-sm font-medium text-stone-950">
                        {product.price}
                      </span>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Collection;
