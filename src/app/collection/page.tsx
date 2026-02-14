import { prisma } from '../../lib/prisma';
import { Navbar } from '../../components/Navbar';
import { ProductCard } from '../../components/ProductCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Fetch glasses from database
async function getGlasses(category?: string, type?: string) {
  try {
    if (!prisma) return [];
    const glasses = await prisma.glasses.findMany({
      where: {
        isAvailable: true,
        ...(category && { category: { slug: category } }),
        ...(type && { type: type as any }),
      },
      include: {
        category: true,
        brand: true,
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        colors: true,
      },
      orderBy: [
        { isBestSeller: 'desc' },
        { isNew: 'desc' },
        { createdAt: 'desc' },
      ],
    });
    return glasses;
  } catch { return []; }
}

async function getCategories() {
  try {
    if (!prisma) return [];
    return await prisma.category.findMany({
      orderBy: { order: 'asc' },
    });
  } catch { return []; }
}

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; type?: string }>;
}) {
  const params = await searchParams;
  const [glasses, categories] = await Promise.all([
    getGlasses(params.category, params.type),
    getCategories(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sans">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">
              Notre Collection
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Découvrez nos {glasses.length} modèles de lunettes. Qualité et style à prix accessible.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-[72px] z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/collection"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !params.category
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Tous
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/collection?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    params.category === cat.slug
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {glasses.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {glasses.map((item) => (
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
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600">
                  <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="25" cy="20" r="15" />
                    <circle cx="75" cy="20" r="15" />
                    <path d="M40 20h20" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Aucune lunette trouvée
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6">
                  Essayez de modifier vos filtres
                </p>
                <Link
                  href="/collection"
                  className="inline-flex px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Voir toute la collection
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-12 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          © 2024 Lunettes Pour Tous. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
