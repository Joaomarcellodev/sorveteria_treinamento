"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  Plus,
  Search,
  LayoutGrid,
  IceCream,
  MoreVertical,
  AlertCircle,
  Loader2,
  PackageOpen,
} from "lucide-react";
import { Button } from "@/app/components/Button";

interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function fetchProdutos() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("nome", { ascending: true });

      if (error) throw error;
      setProdutos(data || []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProdutos();
  }, []);

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.categoria.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <IceCream size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Gestão de Estoque
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Produtos
          </h1>
        </div>

        <Button className="h-12 bg-blue-600 px-6 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2 rounded-xl">
          <Plus size={20} strokeWidth={3} />
          <span className="font-bold whitespace-nowrap">Novo Produto</span>
        </Button>
      </header>

      <div className="mb-8 relative max-w-2xl">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Pesquisar por nome ou categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border-none bg-white px-12 py-4 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-600"
        />
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        </div>
      ) : produtosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              className="group bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                  <IceCream size={24} />
                </div>
                <button className="text-slate-300 hover:text-slate-600">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                  {produto.categoria}
                </span>
                <h3 className="font-bold text-slate-800 text-lg truncate">
                  {produto.nome}
                </h3>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Preço
                  </p>
                  <p className="text-xl font-black text-slate-900">
                    {Number(produto.preco).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Estoque
                  </p>
                  <div
                    className={`flex items-center gap-1.5 font-bold ${produto.estoque <= 5 ? "text-rose-500" : "text-slate-700"}`}
                  >
                    {produto.estoque <= 5 && <AlertCircle size={14} />}
                    <span>{produto.estoque} un</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <PackageOpen size={48} className="text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-900">
            Nenhum produto encontrado
          </h3>
          <p className="text-slate-500 mt-1">
            Tente ajustar sua busca ou cadastrar um novo item.
          </p>
        </div>
      )}
    </div>
  );
}
