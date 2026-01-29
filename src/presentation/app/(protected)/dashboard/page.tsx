"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase/client"
import { StatCard } from "@/app/components/StatCard"
import { RecentTransactions } from "@/app/components/RecentTransactions"
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ShoppingBag, 
  Package, 
  RefreshCcw 
} from "lucide-react"

// Tipagem dos dados vindos do Supabase RPC
type DashboardData = {
  revenue_total: number
  expense_total: number
  balance: number
  product_sold_total: number
  stock_current: number
  transactions_recent: {
    id: string
    type: string
    sale: number
    data: string
  }[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  // Memorizamos a função para satisfazer o ESLint e permitir o uso no botão "Atualizar"
  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true)
      const { data: result, error } = await supabase.rpc("obter_dashboard")

      if (error) {
        console.error("Erro RPC:", error.message)
        return
      }

      setData(result as DashboardData)
    } catch (err) {
      console.error("Erro ao carregar dados:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Dispara o carregamento inicial ao montar o componente
  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  // Estado de Carregamento (UI)
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-2">
          <RefreshCcw className="h-10 w-10 animate-spin text-blue-500" />
          <p className="text-sm font-medium text-slate-500">Preparando seu balcão...</p>
        </div>
      </div>
    )
  }

  // Estado de Erro
  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-600 font-medium">Não foi possível carregar os dados.</p>
          <button 
            onClick={loadDashboard}
            className="mt-4 text-blue-600 hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Acompanhe as vendas e estoque da sua sorveteria.</p>
        </div>
        <button 
          onClick={loadDashboard}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium shadow-sm border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> 
          Atualizar
        </button>
      </div>

      {/* Grid de Estatísticas Principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard 
          title="Receita" 
          value={`R$ ${data.revenue_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={<TrendingUp className="text-emerald-600" />}
          description="Total de entradas"
          className="border-l-4 border-l-emerald-500"
        />
        <StatCard 
          title="Despesas" 
          value={`R$ ${data.expense_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={<TrendingDown className="text-rose-600" />}
          description="Custos de operação"
          className="border-l-4 border-l-rose-500"
        />
        <StatCard 
          title="Saldo" 
          value={`R$ ${data.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={<Wallet className="text-blue-600" />}
          description="Lucro disponível"
          className="border-l-4 border-l-blue-500"
        />
        <StatCard 
          title="Vendidos" 
          value={data.product_sold_total} 
          icon={<ShoppingBag className="text-amber-600" />}
          description="Volumes hoje"
        />
        <StatCard 
          title="Estoque" 
          value={data.stock_current} 
          icon={<Package className="text-purple-600" />}
          description="Itens em armazém"
        />
      </div>

      {/* Layout das Tabelas e Gráficos Mentais */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Coluna de Transações (Larga) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800">Transações Recentes</h2>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {data.transactions_recent.length} registros
            </span>
          </div>
          <div className="p-0">
            <RecentTransactions data={data.transactions_recent} />
          </div>
        </div>
      </div>
    </div>
  )
}