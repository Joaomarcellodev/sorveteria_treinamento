"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { LogOut } from "lucide-react"

type AuthUser = {
  email: string
  name?: string
}

export function Header() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) return

      setUser({
        email: data.user.email ?? "",
        name: data.user.user_metadata?.name,
      })
    }

    loadUser()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.replace("/login")
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    || user?.email?.[0]?.toUpperCase()
    || "?"

  return (
    <header className="flex h-16 items-center justify-end border-b border-slate-100 bg-white px-6">
      <div className="relative">
        {/* Avatar */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {initials}
        </button>

        {/* Dropdown */}
        {open && user && (
          <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-200 bg-white shadow-lg">
            <div className="px-4 py-3 border-b border-slate-100">
              <h3 className="text-slate-700  mb-1">Minha Conta </h3>
              {user.name && (
                <p className="text-sm font-bold text-slate-900">
                  {user.name}
                </p>
              )}
              <p className="text-xs text-slate-500 truncate">
                {user.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
