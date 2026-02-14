import Link from 'next/link';

const categories = [
  { name: 'Restaurants', slug: 'restaurants', emoji: '🍕', desc: 'Pizzas, burgers, sushi...', gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931a 100%)' },
  { name: 'Épicerie', slug: 'epicerie', emoji: '🛒', desc: 'Courses du quotidien', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' },
  { name: 'Mode', slug: 'mode', emoji: '👟', desc: 'Vêtements & accessoires', gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' },
  { name: 'Électronique', slug: 'electronique', emoji: '📱', desc: 'Smartphones, PC, audio', gradient: 'linear-gradient(135deg, #0070f3 0%, #0050d0 100%)' },
  { name: 'Maison & Déco', slug: 'maison-deco', emoji: '🏠', desc: 'Meubles & décoration', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  { name: 'Beauté', slug: 'beaute', emoji: '💄', desc: 'Soins & maquillage', gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' },
  { name: 'Sport', slug: 'sport', emoji: '⚽', desc: 'Équipements & fitness', gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)' },
  { name: 'Pharmacie', slug: 'pharmacie', emoji: '💊', desc: 'Santé & bien-être', gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' },
  { name: 'Animaux', slug: 'animaux', emoji: '🐾', desc: 'Nourriture & accessoires', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' },
  { name: 'Jeux & Jouets', slug: 'jeux-jouets', emoji: '🎮', desc: 'Consoles, jeux, jouets', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
  { name: 'Livres', slug: 'livres', emoji: '📚', desc: 'Romans, BD, mangas', gradient: 'linear-gradient(135deg, #78716c 0%, #57534e 100%)' },
  { name: 'Auto & Moto', slug: 'auto-moto', emoji: '🚗', desc: 'Pièces & accessoires', gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)' },
];

export function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent)' }}>
            Explorer
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Nos univers
          </h2>
          <p className="text-base text-zinc-500 max-w-md mx-auto">
            12 catégories pour trouver tout ce dont vous avez besoin
          </p>
        </div>

        {/* Featured categories - top 4 large */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 animate-stagger">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl p-6 md:p-7 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: cat.gradient,
                minHeight: '180px',
              }}
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15), transparent 60%)' }} />
              
              {/* Large emoji */}
              <div className="text-5xl md:text-6xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {cat.emoji}
              </div>

              <div className="relative">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-[13px] text-white/70">{cat.desc}</p>
              </div>

              {/* Arrow */}
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Remaining categories - smaller grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 animate-stagger">
          {categories.slice(4).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="card group flex flex-col items-center gap-3 p-5 hover:scale-[1.04] transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ background: cat.gradient, boxShadow: 'none' }}
              >
                {cat.emoji}
              </div>
              <span className="text-[13px] font-semibold text-zinc-400 group-hover:text-white transition-colors text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>

        {/* See all link */}
        <div className="text-center mt-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold transition-all hover:scale-[1.03]"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}
          >
            Voir toutes les catégories
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
