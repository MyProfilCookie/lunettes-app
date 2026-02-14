"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "../../components/Navbar";

export default function AccountPage() {
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <Navbar />
      
      <main className="flex-1 relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>

        {/* Decorative elements - floating circles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-6 py-12">
          
          {/* Giant decorative text behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
            <span className="text-[20vw] font-serif font-bold text-white/[0.02] tracking-tighter">
              LPT
            </span>
          </div>

          {/* Logo animation */}
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-60' : 'opacity-30'}`} />
              <div className="relative w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center border border-white/10">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="12" r="4" />
                  <circle cx="18" cy="12" r="4" />
                  <path d="M10 12h4" />
                  <path d="M2 12h0" />
                  <path d="M22 12h0" />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-3 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Bienvenue
            </h1>
            <p className="text-gray-500 text-sm tracking-wide">
              Connectez-vous à votre espace personnel
            </p>
          </div>

          {/* Form container */}
          <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {/* Auth Method Toggle */}
            <div className="flex bg-white/5 backdrop-blur-sm rounded-2xl p-1.5 mb-8 border border-white/10">
              <button
                onClick={() => setAuthMethod("phone")}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  authMethod === "phone"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                📱 Téléphone
              </button>
              <button
                onClick={() => setAuthMethod("email")}
                className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  authMethod === "email"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                ✉️ Email
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {authMethod === "phone" ? (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider pl-1">
                    Numéro de téléphone
                  </label>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium text-gray-300">
                      <span>🇫🇷</span>
                      <span>+33</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="6 12 34 56 78"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className="flex-1 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-gray-600 outline-none focus:border-cyan-500/50 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/10 transition-all"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider pl-1">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-gray-600 outline-none focus:border-cyan-500/50 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/10 transition-all"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold uppercase tracking-widest text-sm hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Connexion...
                    </span>
                  ) : (
                    "Continuer"
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-xs text-gray-600">ou</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Social Login */}
            <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                Continuer avec Google
              </span>
            </button>

            {/* Footer Link */}
            <p className="mt-10 text-center text-sm text-gray-500">
              Pas encore de compte ?{" "}
              <Link href="/register" className="font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-purple-300 transition-all">
                Créer un compte
              </Link>
            </p>
          </div>

          {/* Bottom trust indicators */}
          <div className="flex items-center gap-6 mt-12 text-gray-600 text-xs animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>Connexion sécurisée SSL</span>
            </div>
            <div className="w-1 h-1 bg-gray-700 rounded-full" />
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Données chiffrées</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
