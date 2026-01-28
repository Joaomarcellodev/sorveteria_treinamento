"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || password.length < 6) {
      setError("Verifique suas credenciais e tente novamente.")
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (error) {
      setError("Email ou senha inválidos.")
      return
    }

    router.replace("/dashboard")
  }

  return (
    <main className="flex min-h-screen bg-white antialiased font-sans">
      {/* Coluna da Imagem */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1470&auto=format&fit=crop"
          alt="Balcão de Gelateria"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div className="absolute bottom-16 left-16 right-16 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">Premium System</p>
          <h2 className="mt-2 text-5xl font-medium leading-tight tracking-tighter">
            A arte de produzir,<br /> a ciência de gerir.
          </h2>
        </div>
      </div>

      {/* Coluna do Formulário */}
      <div className="flex w-full items-center justify-center px-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
              Gelato<span className="text-indigo-600">Flow</span>
            </h1>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">Acesse sua conta</h2>
            <p className="mt-2 text-slate-500 font-medium">Insira seus dados abaixo para continuar.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" aria-busy={loading}>
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full border-2 border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-600 placeholder:font-medium focus:border-indigo-600 focus:ring-0 transition-all rounded-xl"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Sua senha
                </label>
                <button type="button" className="text-xs font-bold text-indigo-600 hover:underline">
                  Esqueceu?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full border-2 border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-600 placeholder:font-medium focus:border-indigo-600 focus:ring-0 transition-all rounded-xl"
                required
              />
            </div>

            {error && (
              <div className="animate-in fade-in slide-in-from-top-1 rounded-xl bg-red-50 p-4 border border-red-100">
                <p className="text-sm font-bold text-red-600 text-center leading-tight">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="mt-4 w-full h-14 bg-slate-900 text-white rounded-xl text-sm font-bold uppercase tracking-[0.15em] shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-[0.98] transition-all"
            >
              {loading ? "Carregando..." : "Entrar no Painel"}
            </Button>
          </form>

          {/* <p className="mt-10 text-center text-sm font-medium text-slate-400">
            Dúvidas no acesso? <a href="#" className="text-slate-900 font-bold hover:underline">Fale com o suporte</a>
          </p> */}
        </div>
      </div>
    </main>
  )
}