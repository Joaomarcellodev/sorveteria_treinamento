import { AuthUser } from './AuthService'

export function mapSupabaseUser(user: any): AuthUser {
  return {
    id: user.id,
    email: user.email,
    role: user.user_metadata.role ?? 'FUNCIONARIO',
  }
}
