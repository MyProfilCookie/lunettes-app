'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  shortDesc?: string | null;
  price: number;
  originalPrice?: number | null;
  imageUrl?: string;
  brandName?: string | null;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPromo?: boolean;
  colors?: { name: string; hexCode?: string | null }[];
}

export function ProductCard({
  id,
  name,
  slug,
  shortDesc,
  price,
  originalPrice,
  imageUrl,
  brandName,
  isNew,
  isBestSeller,
  isPromo,
  colors = [],
}: ProductCardProps) {
  return (
    <Link 
      href={`/product/${slug}`}
      className="group block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-blue-500 text-white rounded-full">
              Nouveau
            </span>
          )}
          {isBestSeller && (
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-amber-500 text-white rounded-full">
              Best-seller
            </span>
          )}
          {isPromo && originalPrice && (
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-500 text-white rounded-full">
              -{Math.round((1 - price / originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 hover:scale-110"
          onClick={(e) => { e.preventDefault(); /* TODO: Add to favorites */ }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600 dark:text-gray-300">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Product Image */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-32 h-16 flex items-center justify-center">
              <svg className="w-full h-full text-gray-300 dark:text-gray-600" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="25" cy="20" r="15" />
                <circle cx="75" cy="20" r="15" />
                <path d="M40 20h20" />
                <path d="M10 20H5" />
                <path d="M95 20h-5" />
              </svg>
            </div>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white dark:from-gray-900 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            onClick={(e) => { e.preventDefault(); /* TODO: Add to cart */ }}
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Brand */}
        {brandName && (
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {brandName}
          </p>
        )}

        {/* Name */}
        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Short Description */}
        {shortDesc && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
            {shortDesc}
          </p>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex items-center gap-1 pt-1">
            {colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: color.hexCode || '#ccc' }}
                title={color.name}
              />
            ))}
            {colors.length > 4 && (
              <span className="text-xs text-gray-400 ml-1">+{colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {price.toFixed(2)}€
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-400 line-through">
              {originalPrice.toFixed(2)}€
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
