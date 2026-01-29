type Transaction = {
  id: string
  type: string
  sale: number
  data: string
}

export function RecentTransactions({ data }: { data: Transaction[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-bold text-slate-700">
        Transações Recentes
      </h3>

      <ul className="space-y-3">
        {data.map((item) => (
          <li key={item.id} className="flex justify-between text-sm">
            <span className="font-medium text-slate-700">
              {item.type}
            </span>
            <span className="font-bold text-slate-900">
              R$ {item.sale.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
