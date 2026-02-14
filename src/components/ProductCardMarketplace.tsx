'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  shortDesc: string | null;
  price: number;
  originalPrice?: number | null;
  imageUrl?: string;
  brandName?: string;
  categoryName?: string;
  isNew?: boolean;
  isPromo?: boolean;
}

export function ProductCardMarketplace({
  name,
  slug,
  shortDesc,
  price,
  originalPrice,
  imageUrl,
  brandName,
  categoryName,
  isNew,
  isPromo,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link
      href={`/product/${slug}`}
      className="card group block overflow-hidden hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black rounded-t-2xl">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isPromo && discount > 0 && (
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-lg text-white" style={{ background: 'var(--danger)' }}>
              -{discount}%
            </span>
          )}
          {isNew && (
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-lg text-white" style={{ background: 'var(--accent)' }}>
              Nouveau
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        <div>
          <h3 className="text-[14px] font-semibold text-white truncate">{name}</h3>
          {brandName && (
            <p className="text-[12px] text-zinc-500 mt-0.5">{brandName}</p>
          )}
        </div>

        {shortDesc && (
          <p className="text-[13px] text-zinc-600 line-clamp-1">{shortDesc}</p>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-bold text-white">{price.toFixed(2)} €</span>
            {originalPrice && originalPrice > price && (
              <span className="text-[12px] text-zinc-600 line-through">{originalPrice.toFixed(2)} €</span>
            )}
          </div>
          {categoryName && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">{categoryName}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
