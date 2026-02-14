import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic';

const categoryMeta: Record<string, { icon: string; gradient: string }> = {
  'restaurants': { icon: '🍽️', gradient: 'from-orange-500/20 to-red-500/20' },
  'epicerie': { icon: '🛒', gradient: 'from-green-500/20 to-emerald-500/20' },
  'mode': { icon: '👗', gradient: 'from-pink-500/20 to-purple-500/20' },
  'electronique': { icon: '📱', gradient: 'from-blue-500/20 to-cyan-500/20' },
  'maison-deco': { icon: '🏠', gradient: 'from-amber-500/20 to-yellow-500/20' },
  'beaute': { icon: '💄', gradient: 'from-rose-500/20 to-pink-500/20' },
  'sport': { icon: '⚽', gradient: 'from-sky-500/20 to-blue-500/20' },
  'pharmacie': { icon: '💊', gradient: 'from-teal-500/20 to-green-500/20' },
  'animaux': { icon: '🐾', gradient: 'from-orange-500/20 to-amber-500/20' },
  'jeux-jouets': { icon: '🎮', gradient: 'from-violet-500/20 to-purple-500/20' },
  'livres': { icon: '📚', gradient: 'from-yellow-500/20 to-orange-500/20' },
  'auto-moto': { icon: '🚗', gradient: 'from-slate-500/20 to-gray-500/20' },
};

async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: { select: { glasses: true } },
    },
  });
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-muted mb-4">
            <Link href="/" className="hover:text-accent transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white">Catégories</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Toutes les catégories</h1>
          <p className="text-muted mt-2">Explorez nos {categories.length} univers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-stagger">
          {categories.map((cat) => {
            const meta = categoryMeta[cat.slug] || { icon: '📦', gradient: 'from-gray-500/20 to-gray-500/20' };
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${meta.gradient} border border-white/5 hover:border-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="p-6 sm:p-8 flex flex-col items-center text-center gap-4">
                  <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300">
                    {meta.icon}
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">{cat.name}</h2>
                    {cat.description && (
                      <p className="text-sm text-muted line-clamp-2">{cat.description}</p>
                    )}
                    <p className="text-sm font-semibold text-accent mt-2">
                      {cat._count.glasses} produit{cat._count.glasses > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
