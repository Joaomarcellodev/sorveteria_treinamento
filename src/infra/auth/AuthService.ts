export interface AuthService {
  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
  getCurrentUser(): Promise<AuthUser | null>
}

export type AuthUser = {
  id: string
  email: string
  role: 'ADMIN' | 'FUNCIONARIO'
}
