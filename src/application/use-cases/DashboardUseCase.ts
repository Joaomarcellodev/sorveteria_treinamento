import { DashboardOutput } from "../dtos/DashboardDTO";

export interface DashboardRepository {
  getIindicators(): Promise<DashboardOutput>
}

export class GetDashboardUseCase {
  constructor(
    private readonly dashboardRepository: DashboardRepository
  ) {}

  async implement(): Promise<DashboardOutput> {
    return this.dashboardRepository. getIindicators()
  }
}

