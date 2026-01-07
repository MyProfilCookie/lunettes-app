"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 font-sans">
      <Navbar />
      <main className="flex-1">
        <section className="relative h-[85vh] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1920&q=80"
            alt="Hero background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center container mx-auto px-6">
            <div className="max-w-2xl text-white space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-1000">
              <div className="space-y-2">
                <p className="text-sm font-bold tracking-[0.3em] uppercase opacity-90">Nouvelle Collection</p>
                <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight">
                  Aspen<span className="text-blue-400">.</span>
                </h1>
              </div>
              <p className="text-lg md:text-xl opacity-90 max-w-md font-light leading-relaxed">
                L'élégance à la française. Découvrez nos montures iconiques conçues pour sublimer votre regard au quotidien.
              </p>
              <div className="flex gap-4 pt-4" >
                <Link
                  href="/collections"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white hover:scale-105"
                >
                  Découvrir la collection
                </Link>
                <Link
                  href="/stores"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm px-8 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black hover:scale-105"
                >
                  Trouver un magasin
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/80">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
          </div>
        </section>
        <section className="bg-white py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl font-serif md:text-4xl font-medium">Pourquoi nous choisir ?</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Nous nous engageons à vous offrir le meilleur service optique, alliant rapidité, qualité et expertise.</p>
            </div>
            <div className="grid gap-12 md:grid-cols-3">
              <div className="group flex flex-col items-center text-center space-y-6 p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                <div className="h-16 w-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" /><path d="M12 12V2" /><path d="M2 2l10 10L22 2" /></svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium tracking-tight">Livraison Rapide</h3>
                  <p className="text-gray-500 leading-relaxed">Recevez vos lunettes en 24/48h partout en France. Livraison offerte dès 50€ d'achat.</p>
                </div>
              </div>
              <div className="group flex flex-col items-center text-center space-y-6 p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                <div className="h-16 w-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium tracking-tight">Garantie 2 ans</h3>
                  <p className="text-gray-500 leading-relaxed">Tranquillité d'esprit assurée. Toutes nos montures et verres sont garantis contre la casse.</p>
                </div>
              </div>
              <div className="group flex flex-col items-center text-center space-y-6 p-8 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /></svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium tracking-tight">Service Client</h3>
                  <p className="text-gray-500 leading-relaxed">Une équipe d'opticiens diplômés à votre écoute 7j/7 pour vous conseiller.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-100 py-16 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-bold text-lg tracking-widest uppercase">Lunettes Pour Tous</div>
            <p className="text-sm text-gray-500">© 2024 Lunettes pour tous. Tous droits réservés.</p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-600">
            <Link href="#" className="hover:text-black transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-black transition-colors">Confidentialité</Link>
            <Link href="#" className="hover:text-black transition-colors">CGV</Link>
            <Link href="#" className="hover:text-black transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
