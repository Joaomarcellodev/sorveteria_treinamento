import { ReactNode } from "react"

type StatCardProps = {
  title: string
  value: string | number
  icon?: ReactNode      
  description?: string 
  className?: string    
}

export function StatCard({ title, value, icon, description, className }: StatCardProps) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <p className="text-2xl font-bold text-slate-900 leading-none">{value}</p>
        {description && (
          <p className="mt-2 text-xs text-slate-400 font-medium italic">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}