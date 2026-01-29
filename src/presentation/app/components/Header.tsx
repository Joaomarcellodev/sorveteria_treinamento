"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { LogOut, User } from "lucide-react"

export function Header() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    router.replace("/login")
  }

  return (
    <header className="flex h-16 items-center justify-end border-b border-slate-100 bg-white px-6">
      <div className="relative">
        {/* Avatar */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          JM
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-48 rounded-xl border border-slate-200 bg-white shadow-lg">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-900">João Marcello</p>
              <p className="text-xs text-slate-500 truncate">
                joao@email.com
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
