"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase/client"
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Search, 
  Plus,
  Receipt,
  Loader2,
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar
} from "lucide-react"
import { Button } from "@/app/components/Button"

// 1. Definição do Tipo
type Transacao = {
  id: string
  tipo: 'receita' | 'despesa'
  valor: number
  descricao: string
  data: string
  categoria: string
}

// 2. O componente principal com EXPORT DEFAULT
export default function TransacaoPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState("")

  const fetchTransacoes = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("transacoes")
        .select("*")
        .order("data", { ascending: false })

      if (error) throw error
      setTransacoes(data || [])
    } catch (error) {
      console.error("Erro ao carregar transações:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTransacoes()
  }, [fetchTransacoes])

  // Lógica de Resumo
  const totalVendas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0)
  const totalDespesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0)
  const saldo = totalVendas - totalDespesas

  // Filtro de busca
  const transacoesFiltradas = transacoes.filter(t => 
    t.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
    t.categoria.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 space-y-8">
      
      {/* HEADER DINÂMICO */}
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Receipt size={20} className="animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">Financeiro</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Movimentações</h1>
          <p className="text-slate-500 text-sm font-medium">Controle suas vendas e gastos diários.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="h-12 w-fit bg-emerald-600 px-6 text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 flex items-center gap-2 rounded-2xl border-none transition-all">
            <Plus size={18} strokeWidth={3} />
            <span className="font-bold">Nova Venda</span>
          </Button>
          <Button className="h-12 w-fit bg-rose-600 px-6 text-white shadow-lg shadow-rose-100 hover:bg-rose-700 active:scale-95 flex items-center gap-2 rounded-2xl border-none transition-all">
            <Plus size={18} strokeWidth={3} />
            <span className="font-bold">Nova Despesa</span>
          </Button>
        </div>
      </header>

      {/* DASHBOARD DE BOLSO (Cards de Resumo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-hover hover:shadow-md">
          <div className="flex items-center gap-3 mb-3 text-emerald-600">
            <div className="p-2 bg-emerald-50 rounded-lg"><TrendingUp size={18} /></div>
            <span className="text-xs font-black uppercase tracking-wider">Vendas</span>
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">
            {totalVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-hover hover:shadow-md">
          <div className="flex items-center gap-3 mb-3 text-rose-600">
            <div className="p-2 bg-rose-50 rounded-lg"><TrendingDown size={18} /></div>
            <span className="text-xs font-black uppercase tracking-wider">Despesas</span>
          </div>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">
            {totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl text-white">
          <div className="flex items-center gap-3 mb-3 text-indigo-400">
            <div className="p-2 bg-white/10 rounded-lg"><Wallet size={18} /></div>
            <span className="text-xs font-black uppercase tracking-wider text-white/70">Saldo em Caixa</span>
          </div>
          <p className="text-3xl font-black tracking-tighter">
            {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>

      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="O que você está procurando?" 
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full rounded-[1.5rem] border-none bg-white px-14 py-5 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium text-slate-600"
          />
        </div>
      </div>

      {/* LISTA DE ATIVIDADES */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden mb-10">
        {loading ? (
          <div className="py-24 flex flex-col items-center gap-4 text-slate-400">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
            <p className="font-bold text-xs uppercase tracking-widest">Sincronizando caixa...</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {transacoesFiltradas.length > 0 ? (
              transacoesFiltradas.map((t) => (
                <div key={t.id} className="p-6 flex items-center justify-between hover:bg-slate-50/80 transition-all cursor-default group">
                  <div className="flex items-center gap-5">
                    <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${t.tipo === 'receita' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {t.tipo === 'receita' ? <ArrowUpCircle size={24} strokeWidth={2.5} /> : <ArrowDownCircle size={24} strokeWidth={2.5} />}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-lg leading-tight">{t.descricao}</h4>
                      <div className="flex items-center gap-3 mt-1.5 text-xs font-bold uppercase tracking-wider">
                        <span className="text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg">
                          {t.categoria}
                        </span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(t.data).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-2xl font-black tracking-tighter ${t.tipo === 'receita' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {t.tipo === 'receita' ? '+' : '-'} {t.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Liquidado</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center gap-3">
                <Receipt size={48} className="text-slate-200" />
                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Nenhuma movimentação no período</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}