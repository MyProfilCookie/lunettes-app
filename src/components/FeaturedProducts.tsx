'use client';

import { ProductCard } from './ProductCard';

interface GlassesData {
  id: string;
  name: string;
  slug: string;
  shortDesc?: string | null;
  price: number;
  originalPrice?: number | null;
  isNew: boolean;
  isBestSeller: boolean;
  isPromo: boolean;
  brand?: { name: string } | null;
  images: { url: string }[];
  colors: { name: string; hexCode?: string | null }[];
}

interface FeaturedProductsProps {
  glasses: GlassesData[];
  title?: string;
  subtitle?: string;
}

export function FeaturedProducts({ 
  glasses, 
  title = "Nos Best-Sellers",
  subtitle = "Les modèles préférés de nos clients"
}: FeaturedProductsProps) {
  if (glasses.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {glasses.slice(0, 8).map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              slug={item.slug}
              shortDesc={item.shortDesc}
              price={item.price}
              originalPrice={item.originalPrice}
              imageUrl={item.images[0]?.url}
              brandName={item.brand?.name}
              isNew={item.isNew}
              isBestSeller={item.isBestSeller}
              isPromo={item.isPromo}
              colors={item.colors.map((c) => ({
                name: c.name,
                hexCode: c.hexCode,
              }))}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/collection"
            className="inline-flex h-14 items-center justify-center rounded-full bg-black dark:bg-white px-8 text-sm font-bold uppercase tracking-widest text-white dark:text-black transition-all hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105"
          >
            Voir toute la collection
          </a>
        </div>
      </div>
    </section>
  );
}
