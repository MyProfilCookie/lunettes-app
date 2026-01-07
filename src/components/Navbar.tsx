'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Mock data pour la démo
const PRODUCTS = [
  { id: 1, name: "Monture Classique", image: "/lunettes.svg" },
  { id: 2, name: "Monture Aviateur", image: "/lunettes.svg" },
  { id: 3, name: "Monture Ronde", image: "/lunettes.svg" },
  { id: 4, name: "Monture Papillon", image: "/lunettes.svg" },
  { id: 5, name: "Monture Rectangulaire", image: "/lunettes.svg" },
];

export function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof PRODUCTS>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isOptiqueOpen, setIsOptiqueOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-6">
        {/* Row 1: Logo, Search, Icons */}
        <div className="flex items-center justify-between py-5 gap-12">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex flex-col items-center group">
            <div className="relative overflow-hidden">
              <Image
                src="/lunettes.svg"
                alt="Lunettes Pour Tous"
                width={42}
                height={42}
                className="mb-1 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="font-bold text-[10px] tracking-[0.2em] uppercase text-gray-900 group-hover:text-black transition-colors">Lunettes Pour Tous</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
              <input
                type="text"
                placeholder="Rechercher une monture..."
                value={query}
                onChange={handleSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-3 pl-6 pr-12 text-sm outline-none focus:border-gray-400 focus:bg-white focus:shadow-xl transition-all placeholder:text-gray-400 text-gray-800"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </button>
            </div>

            {/* Dropdown de résultats */}
            {isFocused && (query.length > 0 || results.length > 0) && (
              <div className="absolute top-full left-0 mt-4 w-full rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {results.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Résultats suggérés</div>
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`#product-${product.id}`}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="relative h-12 w-20 flex-shrink-0 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-100 group-hover:border-gray-200 transition-colors">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={24}
                            className="object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                          />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-black transition-colors">{product.name}</span>
                        <svg className="w-4 h-4 ml-auto text-gray-300 group-hover:text-black opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    Aucun résultat trouvé pour &ldquo;{query}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6 text-gray-600">
            <Link href="/stores" className="hover:text-black transition-colors transform hover:scale-110 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            </Link>
            <Link href="/account" className="hover:text-black transition-colors transform hover:scale-110 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </Link>
            <Link href="/favorites" className="hover:text-black transition-colors transform hover:scale-110 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            </Link>
            <Link href="/cart" className="hover:text-black transition-colors transform hover:scale-110 duration-200 relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full">0</span>
            </Link>
          </div>
        </div>

        {/* Row 2: Navigation Links */}
        <div className="flex items-center justify-center pb-2 relative">
          <nav className="flex items-center gap-10 text-sm font-medium text-gray-600">
            {/* Menu Optique avec Dropdown */}
            <div
              className="static group"
              onMouseEnter={() => setIsOptiqueOpen(true)}
              onMouseLeave={() => setIsOptiqueOpen(false)}
            >
              <button className={`flex items-center gap-1.5 py-4 border-b-2 transition-all duration-300 ${isOptiqueOpen ? 'text-black border-black' : 'border-transparent hover:text-black hover:border-gray-200'}`}>
                Optique
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isOptiqueOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>

              {/* Mega Menu Dropdown */}
              <div className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl z-50 transition-all duration-300 origin-top ${isOptiqueOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                <div className="container mx-auto px-6 py-10 flex gap-12">
                  {/* Sidebar Categories */}
                  <div className="w-56 flex-shrink-0 space-y-2 border-r border-gray-100 pr-8">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Catégories</h3>
                    <Link href="#" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-white bg-black rounded-lg shadow-lg shadow-gray-200 hover:shadow-xl transition-all hover:-translate-y-0.5">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                        Tout voir
                      </div>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                    </Link>
                    {["Bio", "Arrondi", "Carré", "Transparent", "Écailles"].map((cat) => (
                      <Link key={cat} href="#" className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black rounded-lg transition-all group/item">
                        <div className="flex items-center gap-3">
                          <Image src="/lunettes.svg" alt="" width={18} height={18} className="opacity-40 group-hover/item:opacity-100 transition-opacity" />
                          {cat}
                        </div>
                        <svg className="w-3.5 h-3.5 text-gray-300 group-hover/item:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                      </Link>
                    ))}
                  </div>

                  {/* Featured Images Grid */}
                  <div className="flex-1 grid grid-cols-4 gap-6">
                    {[
                      { title: "Femmes", img: "https://images.unsplash.com/photo-1520974707390-369ced6ba6f9?auto=format&fit=crop&w=800&q=80" },
                      { title: "Hommes", img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80" },
                      { title: "Enfants", img: "https://images.unsplash.com/photo-1503342217505-b0a15cf3519c?auto=format&fit=crop&w=800&q=80" },
                      { title: "Lumière bleue", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80" }
                    ].map((item) => (
                      <div key={item.title} className="group/card relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity" />
                        <div className="absolute inset-x-0 bottom-6 text-center transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                          <p className="font-serif text-2xl text-white mb-4 tracking-wide">{item.title}</p>
                          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-black bg-white px-5 py-2 rounded-full opacity-0 group-hover/card:opacity-100 transform translate-y-4 group-hover/card:translate-y-0 transition-all duration-500 delay-75">
                            Découvrir
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {["Solaire", "Accessoires", "Nos verres", "2 paires à 0€", "Collaboration Matt Pokora"].map((item) => (
              <Link key={item} href="#" className="flex items-center gap-1.5 py-4 border-b-2 border-transparent hover:text-black hover:border-black transition-all duration-300">
                {item}
                {["Nos verres"].includes(item) && (
                  <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                )}
              </Link>
            ))}
          </nav>

          <div className="absolute right-0 top-0 h-full flex items-center">
            <Link
              href="/rdv"
              className="hidden md:flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Prendre RDV
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
