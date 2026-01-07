import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-blue-600">Lunettes</span>pour tous
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Collections
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Magasins
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Notre histoire
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              S&apos;inscrire
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Des lunettes de qualité <br className="hidden sm:inline" />
                <span className="text-blue-600">pour tout le monde</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Découvrez notre collection de montures élégantes et abordables.
                Commandez en ligne ou essayez-les en magasin dès aujourd'hui.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                href="/collections"
                className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
              >
                Voir les collections
              </Link>
              <Link
                href="/stores"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
              >
                Trouver un magasin
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" /><path d="M12 12V2" /><path d="M2 2l10 10L22 2" /></svg>
                </div>
                <h3 className="text-xl font-bold">Livraison Rapide</h3>
                <p className="text-gray-500">
                  Recevez vos lunettes en 24/48h partout en France.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <h3 className="text-xl font-bold">Garantie 2 ans</h3>
                <p className="text-gray-500">
                  Toutes nos montures et verres sont garantis contre la casse.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /></svg>
                </div>
                <h3 className="text-xl font-bold">Service Client</h3>
                <p className="text-gray-500">
                  Une équipe d'opticiens à votre écoute 7j/7.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500">
            © 2024 Lunettes pour tous. Tous droits réservés.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="#" className="hover:underline">Mentions légales</Link>
            <Link href="#" className="hover:underline">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
