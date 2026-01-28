import { DashboardOutput } from "../../application/dtos/DashboardDTO"

export class DashboardMapper {
  static toDomain(raw: any): DashboardOutput {
    return {
      revenueTotal: Number(raw.revenue_total),
      expenseTotal: Number(raw.expense_total),
      balance: Number(raw.balance),
      productSoldTotal: Number(raw.product_sold_total),
      stockCurrent: Number(raw.stock_current),
      transactionsRecent: raw.transactions_recent.map((t: any) => ({
        id: t.id,
        type: t.type,
        sale: Number(t.sale),
        data: new Date(t.data),
      })),
    }
  }
}
