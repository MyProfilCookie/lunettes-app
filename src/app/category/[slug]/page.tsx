import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { ProductCardMarketplace } from '../../../components/ProductCardMarketplace';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

const categoryIcons: Record<string, string> = {
  'restaurants': 'M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265z',
  'epicerie': 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z',
  'mode': 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
  'electronique': 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  'maison-deco': 'M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819',
  'beaute': 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
  'sport': 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z',
  'pharmacie': 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  'animaux': 'M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3.75a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 5.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z',
  'jeux-jouets': 'M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.491 48.491 0 01-4.163-.3c-1.108-.128-2.115-.795-2.37-1.9a2.197 2.197 0 01-.053-.476V3h18v.75c0 .164-.018.325-.053.476-.255 1.105-1.262 1.772-2.37 1.9a48.467 48.467 0 01-4.163.3.64.64 0 01-.657-.643v0zM5.25 12H3v6.75A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V12h-2.25m-13.5 0v-1.5c0-.621.504-1.125 1.125-1.125h11.25c.621 0 1.125.504 1.125 1.125V12m-13.5 0h13.5',
  'livres': 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
  'auto-moto': 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25H21v-4.014c0-.477-.192-.935-.534-1.274l-.842-.838c-.174-.174-.376-.312-.596-.407a7.006 7.006 0 00-2.725-.55H8.313c-.952 0-1.892.178-2.774.525a3.042 3.042 0 00-.632.41l-.783.782a1.813 1.813 0 00-.531 1.28v4.086z',
};

async function getCategoryWithProducts(slug: string) {
  try {
    if (!prisma) return null;
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        glasses: {
          where: { isAvailable: true },
          include: { brand: true, category: true, images: { where: { isPrimary: true }, take: 1 } },
          orderBy: [{ isBestSeller: 'desc' }, { isNew: 'desc' }, { createdAt: 'desc' }],
        },
      },
    });
    return category;
  } catch { return null; }
}

async function getAllCategories() {
  try {
    if (!prisma) return [];
    return await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { glasses: true } } },
    });
  } catch { return []; }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, allCategories] = await Promise.all([
    getCategoryWithProducts(slug),
    getAllCategories(),
  ]);

  if (!category) notFound();

  const icon = categoryIcons[slug] || 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />

      {/* Header */}
      <section className="relative" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(var(--muted) 1px, transparent 1px), linear-gradient(90deg, var(--muted) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="relative max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-[13px] mb-6 text-zinc-500">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-white">{category.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
              <svg className="w-6 h-6" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{category.name}</h1>
              <p className="text-sm mt-0.5 text-zinc-500">
                {category.glasses.length} produit{category.glasses.length > 1 ? 's' : ''} disponible{category.glasses.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4 text-zinc-500">Catégories</h3>
            <nav className="space-y-1">
              {allCategories.map((cat) => {
                const catIcon = categoryIcons[cat.slug] || 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4';
                const isActive = cat.slug === slug;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all"
                    style={{
                      background: isActive ? 'var(--accent-light)' : 'transparent',
                      color: isActive ? 'var(--accent)' : 'var(--muted)',
                      border: isActive ? '1px solid rgba(0,112,243,0.2)' : '1px solid transparent',
                    }}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={catIcon} />
                    </svg>
                    <span className="truncate">{cat.name}</span>
                    <span className="ml-auto text-[11px]">{cat._count.glasses}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Products */}
          <main className="flex-1">
            <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {allCategories.map((cat) => {
                  const isActive = cat.slug === slug;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all"
                      style={{
                        background: isActive ? 'var(--accent)' : 'var(--surface)',
                        color: isActive ? 'white' : 'var(--muted)',
                        border: isActive ? 'none' : '1px solid var(--border)',
                      }}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-[13px] text-zinc-500">
                {category.glasses.length} résultat{category.glasses.length > 1 ? 's' : ''}
              </p>
              <select
                className="text-[13px] font-medium rounded-xl px-3 py-2 focus:outline-none"
                style={{ background: 'var(--surface)', color: 'var(--fg)', border: '1px solid var(--border)' }}
              >
                <option>Popularité</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
              </select>
            </div>

            {category.glasses.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-stagger">
                {category.glasses.map((p) => (
                  <ProductCardMarketplace
                    key={p.id}
                    id={p.id} name={p.name} slug={p.slug} shortDesc={p.shortDesc}
                    price={p.price} originalPrice={p.originalPrice}
                    imageUrl={p.images[0]?.url} brandName={p.brand?.name}
                    categoryName={p.category?.name} isNew={p.isNew} isPromo={p.isPromo}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'var(--surface)' }}>
                  <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Aucun produit pour le moment</h3>
                <p className="text-sm mb-6 text-zinc-500">De nouveaux produits arrivent bientôt !</p>
                <Link href="/" className="inline-flex h-10 items-center rounded-full px-6 text-sm font-semibold text-white" style={{ background: 'var(--accent)' }}>
                  Retour à l&apos;accueil
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
