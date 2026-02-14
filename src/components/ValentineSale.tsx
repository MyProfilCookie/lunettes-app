'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ValentineProduct {
  id: string;
  name: string;
  slug: string;
  shortDesc?: string | null;
  price: number;
  originalPrice?: number | null;
  brand?: { name: string } | null;
  images: { url: string }[];
  colors: { name: string; hexCode?: string | null }[];
}

interface ValentineSaleProps {
  glasses: ValentineProduct[];
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="valentine-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
            fontSize: `${12 + Math.random() * 20}px`,
            opacity: 0.15 + Math.random() * 0.25,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}

export function ValentineSale({ glasses }: ValentineSaleProps) {
  if (glasses.length === 0) return null;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950/40 dark:via-pink-950/30 dark:to-gray-950" />
      
      {/* Floating Hearts */}
      <FloatingHearts />

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-bold uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="animate-pulse">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Saint-Valentin
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="animate-pulse">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white">
            Soldes Saint-Valentin
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Offrez le cadeau parfait à votre moitié 💕 Jusqu&apos;à <span className="font-bold text-red-500">-30%</span> sur une sélection de montures
          </p>
          
          {/* Countdown-style urgency */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              Offre valable aujourd&apos;hui seulement !
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {glasses.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="group block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border-2 border-pink-100 dark:border-pink-900/40 hover:border-red-300 dark:hover:border-red-700 hover:shadow-xl hover:shadow-red-100/50 dark:hover:shadow-red-900/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 overflow-hidden">
                {/* Valentine Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-lg">
                    ♥ -{item.originalPrice ? Math.round((1 - item.price / item.originalPrice) * 100) : 20}%
                  </span>
                </div>

                {/* Heart favorite */}
                <button
                  className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:scale-110"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                {/* Product Image */}
                <div className="relative w-full h-full flex items-center justify-center p-8">
                  {item.images[0]?.url ? (
                    <Image
                      src={item.images[0].url}
                      alt={item.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-32 h-16 flex items-center justify-center">
                      <svg className="w-full h-full text-gray-300 dark:text-gray-600" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="25" cy="20" r="15" />
                        <circle cx="75" cy="20" r="15" />
                        <path d="M40 20h20" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white dark:from-gray-900 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    className="w-full py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold uppercase tracking-wider rounded-full hover:from-red-600 hover:to-pink-600 transition-all shadow-lg"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    ♥ Offrir
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                {item.brand?.name && (
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {item.brand.name}
                  </p>
                )}
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                {item.shortDesc && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {item.shortDesc}
                  </p>
                )}

                {/* Colors */}
                {item.colors.length > 0 && (
                  <div className="flex items-center gap-1 pt-1">
                    {item.colors.slice(0, 4).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: color.hexCode || '#ccc' }}
                        title={color.name}
                      />
                    ))}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-lg font-bold text-red-500">
                    {item.price.toFixed(2)}€
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-gray-400 line-through">
                      {item.originalPrice.toFixed(2)}€
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/collection?promo=true"
            className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-10 text-sm font-bold uppercase tracking-widest text-white transition-all hover:from-red-600 hover:to-pink-600 hover:scale-105 hover:shadow-xl hover:shadow-red-200/50 dark:hover:shadow-red-900/30"
          >
            ♥ Voir toutes les offres Saint-Valentin
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-10vh) rotate(720deg);
            opacity: 0;
          }
        }
        .valentine-heart {
          position: absolute;
          bottom: -20px;
          color: #f43f5e;
          animation: float-up linear infinite;
        }
      `}</style>
    </section>
  );
}
