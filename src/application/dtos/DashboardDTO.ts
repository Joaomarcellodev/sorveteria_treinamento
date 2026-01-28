

export type DashboardOutput = {
  revenueTotal: number
  expenseTotal: number
  balance: number
  productSoldTotal: number
  stockCurrent: number

  transactionsRecent: {
    id: string
    type: string
    sale: number
    data: Date
  }[]
}
