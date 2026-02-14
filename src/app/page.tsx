import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { CategoryGrid } from "../components/CategoryGrid";
import { ProductCardMarketplace } from "../components/ProductCardMarketplace";
import { prisma } from "../lib/prisma";

async function getTrendingProducts() {
  try {
    return await prisma.glasses.findMany({
      where: { isAvailable: true, isBestSeller: true },
      include: { brand: true, category: true, images: { where: { isPrimary: true }, take: 1 } },
      take: 8,
    });
  } catch { return []; }
}

async function getPromoProducts() {
  try {
    return await prisma.glasses.findMany({
      where: { isAvailable: true, isPromo: true },
      include: { brand: true, category: true, images: { where: { isPrimary: true }, take: 1 } },
      take: 4,
    });
  } catch { return []; }
}

async function getNewProducts() {
  try {
    return await prisma.glasses.findMany({
      where: { isAvailable: true, isNew: true },
      include: { brand: true, category: true, images: { where: { isPrimary: true }, take: 1 } },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });
  } catch { return []; }
}

export default async function Home() {
  const [trending, promos, newProducts] = await Promise.all([
    getTrendingProducts(),
    getPromoProducts(),
    getNewProducts(),
  ]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ minHeight: '85vh', borderBottom: '1px solid var(--border)' }}>
          {/* Animated background effects */}
          <div className="absolute inset-0">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.025]" style={{
              backgroundImage: 'linear-gradient(var(--muted) 1px, transparent 1px), linear-gradient(90deg, var(--muted) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }} />
            {/* Main blue glow - top center */}
            <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[1000px] h-[800px] rounded-full opacity-[0.08] blur-[150px]" style={{ background: 'var(--accent)' }} />
            {/* Secondary glow - bottom right */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[120px]" style={{ background: '#7c3aed' }} />
            {/* Small accent glow - left */}
            <div className="absolute top-1/3 -left-[100px] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]" style={{ background: 'var(--accent)' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

              {/* Left: Content */}
              <div className="space-y-8 animate-fade-in">
                {/* Live badge */}
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[12px] font-semibold"
                  style={{
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(0, 112, 243, 0.2)',
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22c55e' }} />
                  </span>
                  🚀 Livraison express en 30 min
                </div>

                {/* Headline */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                  <span className="text-white">Tout, livré</span>
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--accent) 0%, #7c3aed 50%, var(--accent) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundSize: '200% 200%',
                    }}
                  >
                    chez vous.
                  </span>
                </h1>

                {/* Sub */}
                <p className="text-lg md:text-xl leading-relaxed max-w-lg text-zinc-400">
                  De l&apos;alimentation à l&apos;électronique — <strong className="text-zinc-300">10 000+ produits</strong> livrés à votre porte.
                </p>

                {/* Hero Search */}
                <div className="max-w-lg">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" style={{ background: 'linear-gradient(135deg, var(--accent), #7c3aed)' }} />
                    <div className="relative flex items-center rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <svg className="w-5 h-5 ml-5 text-zinc-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Pizza, iPhone, Nike, Dyson..."
                        className="flex-1 h-14 px-4 bg-transparent text-[15px] text-white placeholder:text-zinc-600 focus:outline-none"
                      />
                      <Link
                        href="/categories"
                        className="h-10 px-5 mr-2 rounded-xl flex items-center justify-center text-[13px] font-semibold text-white shrink-0 transition-all hover:opacity-90"
                        style={{ background: 'var(--accent)' }}
                      >
                        Chercher
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Category pills */}
                <div className="flex flex-wrap gap-2">
                  {['🍕 Restaurants', '📱 Tech', '👟 Mode', '💄 Beauté', '🏠 Maison', '🎮 Jeux'].map((cat) => (
                    <span
                      key={cat}
                      className="px-3.5 py-1.5 rounded-full text-[12px] font-medium text-zinc-400 cursor-pointer transition-all hover:text-white hover:border-zinc-600"
                      style={{ border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-8 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  {[
                    { icon: '⚡', label: 'Livraison 30 min' },
                    { icon: '🔒', label: 'Paiement sécurisé' },
                    { icon: '↩️', label: 'Retour gratuit' },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-2">
                      <span className="text-lg">{b.icon}</span>
                      <span className="text-[12px] font-medium text-zinc-500">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Product Image */}
              <div className="relative hidden lg:flex items-center justify-center">
                {/* Animated ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-[520px] h-[520px] rounded-full opacity-20"
                    style={{
                      border: '1px solid var(--border-hover)',
                      animation: 'spin 40s linear infinite',
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-[400px] h-[400px] rounded-full opacity-10"
                    style={{
                      border: '1px dashed var(--accent)',
                      animation: 'spin 30s linear infinite reverse',
                    }}
                  />
                </div>
                {/* Glow behind image */}
                <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-[0.12]" style={{ background: 'var(--accent)' }} />
                {/* Product image */}
                <img
                  src="/hero-products.png"
                  alt="Produits TUTTO"
                  className="relative w-[500px] h-[500px] object-contain drop-shadow-2xl"
                  style={{
                    animation: 'float 6s ease-in-out infinite',
                    filter: 'drop-shadow(0 20px 60px rgba(0, 112, 243, 0.15))',
                  }}
                />

                {/* Floating stat cards */}
                <div
                  className="absolute top-8 right-0 card px-4 py-3 flex items-center gap-3"
                  style={{ animation: 'float 5s ease-in-out 0.5s infinite' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'var(--accent-light)' }}>📦</div>
                  <div>
                    <p className="text-[13px] font-bold text-white">10 000+</p>
                    <p className="text-[11px] text-zinc-500">Produits</p>
                  </div>
                </div>

                <div
                  className="absolute bottom-16 left-0 card px-4 py-3 flex items-center gap-3"
                  style={{ animation: 'float 5s ease-in-out 1s infinite' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>⭐</div>
                  <div>
                    <p className="text-[13px] font-bold text-white">4.8/5</p>
                    <p className="text-[11px] text-zinc-500">Satisfaction</p>
                  </div>
                </div>

                <div
                  className="absolute bottom-4 right-8 card px-4 py-3 flex items-center gap-3"
                  style={{ animation: 'float 5s ease-in-out 1.5s infinite' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(124, 58, 237, 0.1)' }}>⚡</div>
                  <div>
                    <p className="text-[13px] font-bold text-white">30 min</p>
                    <p className="text-[11px] text-zinc-500">Livraison moy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <CategoryGrid />

        {/* Promo Banner */}
        <section className="max-w-7xl mx-auto px-6 py-4">
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'var(--accent-light)',
              border: '1px solid rgba(0, 112, 243, 0.15)',
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Offre de bienvenue</p>
                <h3 className="text-lg font-bold text-white">-20% sur votre première commande</h3>
                <p className="text-sm mt-1 text-zinc-400">
                  Code <code className="px-1.5 py-0.5 rounded-md text-[12px] font-mono font-semibold" style={{ background: 'var(--surface)', color: 'var(--accent)' }}>BIENVENUE20</code>
                </p>
              </div>
              <Link
                href="/categories"
                className="inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: 'var(--accent)' }}
              >
                En profiter →
              </Link>
            </div>
          </div>
        </section>

        {/* 🔥 Trending */}
        {trending.length > 0 && (
          <section className="relative py-16" style={{ borderTop: '1px solid var(--border)' }}>
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.04] blur-[100px]" style={{ background: 'var(--accent)' }} />
            <div className="relative max-w-7xl mx-auto px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, #0070f3, #7c3aed)' }}>
                    🔥
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: 'var(--accent)' }}>Populaire</p>
                    <h2 className="text-2xl md:text-3xl font-black text-white">Tendances du moment</h2>
                  </div>
                </div>
                <Link
                  href="/trending"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:scale-[1.03]"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}
                >
                  Voir tout
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-stagger">
                {trending.map((p) => (
                  <ProductCardMarketplace
                    key={p.id}
                    id={p.id} name={p.name} slug={p.slug} shortDesc={p.shortDesc}
                    price={p.price} originalPrice={p.originalPrice}
                    imageUrl={p.images[0]?.url} brandName={p.brand?.name}
                    categoryName={p.category?.name} isNew={p.isNew} isPromo={p.isPromo}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 🏷️ Promos */}
        {promos.length > 0 && (
          <section className="relative py-16 overflow-hidden">
            {/* Red/orange gradient background */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(245, 158, 11, 0.03) 100%)' }} />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px]" style={{ background: '#ef4444' }} />
            <div className="relative max-w-7xl mx-auto px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, #ef4444, #f59e0b)' }}>
                    🏷️
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: '#ef4444' }}>Promotions</p>
                    <h2 className="text-2xl md:text-3xl font-black text-white">Bons plans du jour</h2>
                  </div>
                </div>
                <Link
                  href="/promos"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all hover:scale-[1.03]"
                  style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                >
                  Tous les bons plans
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-stagger">
                {promos.map((p) => (
                  <ProductCardMarketplace
                    key={p.id}
                    id={p.id} name={p.name} slug={p.slug} shortDesc={p.shortDesc}
                    price={p.price} originalPrice={p.originalPrice}
                    imageUrl={p.images[0]?.url} brandName={p.brand?.name}
                    categoryName={p.category?.name} isPromo={p.isPromo}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ✨ New */}
        {newProducts.length > 0 && (
          <section className="relative py-16 overflow-hidden">
            {/* Purple glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full opacity-[0.04] blur-[120px]" style={{ background: '#a855f7' }} />
            <div className="relative max-w-7xl mx-auto px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>
                    ✨
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: '#a855f7' }}>Récent</p>
                    <h2 className="text-2xl md:text-3xl font-black text-white">Nouveautés</h2>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-stagger">
                {newProducts.map((p) => (
                  <ProductCardMarketplace
                    key={p.id}
                    id={p.id} name={p.name} slug={p.slug} shortDesc={p.shortDesc}
                    price={p.price} originalPrice={p.originalPrice}
                    imageUrl={p.images[0]?.url} brandName={p.brand?.name}
                    categoryName={p.category?.name} isNew={p.isNew}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section id="how" className="max-w-7xl mx-auto px-6 py-20" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="text-center mb-12">
            <h2 className="text-xl font-bold text-white">Comment ça marche</h2>
            <p className="text-sm mt-2 text-zinc-500">Trois étapes simples</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: '01', title: 'Parcourez', desc: 'Explorez 12 catégories de produits et trouvez ce qu\'il vous faut.', icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
              { n: '02', title: 'Commandez', desc: 'Ajoutez au panier et payez en quelques clics, simplement.', icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z' },
              { n: '03', title: 'Recevez', desc: 'Livraison chez vous en 30 minutes en moyenne.', icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25H21v-4.014c0-.477-.192-.935-.534-1.274l-.842-.838c-.174-.174-.376-.312-.596-.407a7.006 7.006 0 00-2.725-.55H8.313c-.952 0-1.892.178-2.774.525a3.042 3.042 0 00-.632.41l-.783.782a1.813 1.813 0 00-.531 1.28v4.086z' },
            ].map((item) => (
              <div
                key={item.n}
                className="card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{item.n}</span>
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                  <span className="text-white font-extrabold text-xs">T</span>
                </div>
                <span className="text-base font-extrabold tracking-tight">TUTTO</span>
              </div>
              <p className="text-[13px] leading-relaxed text-zinc-500">
                La marketplace qui livre tout, rapidement et simplement.
              </p>
            </div>
            {[
              { t: 'Catégories', l: ['Restaurants', 'Mode', 'Électronique', 'Beauté'] },
              { t: 'Entreprise', l: ['À propos', 'Carrières', 'Blog', 'Presse'] },
              { t: 'Support', l: ['Aide', 'Contact', 'CGV', 'Confidentialité'] },
            ].map((col) => (
              <div key={col.t} className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{col.t}</h4>
                <div className="flex flex-col gap-2">
                  {col.l.map((label) => (
                    <Link key={label} href="#" className="text-[13px] text-zinc-500 hover:text-white transition-colors">{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
            <p className="text-[11px] text-zinc-600">© 2026 TUTTO. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
