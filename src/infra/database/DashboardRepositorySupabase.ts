import { DashboardRepository } from '../../application/use-cases/DashboardUseCase'
import { supabase } from './SupabaseClient'

export class DashboardRepositorySupabase
  implements DashboardRepository {

  async getIindicators() {
    const { data, error } = await supabase.rpc('obter_dashboard')

    if (error) {
      throw new Error(`Erro ao obter dashboard: ${error.message}`)
    }

    return data
  }
}
