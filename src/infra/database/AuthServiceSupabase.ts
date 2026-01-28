import { AuthService, AuthUser } from "../auth/AuthService"
import { mapSupabaseUser } from "../auth/AuthUserAdapter"
import { supabaseAuth } from "../auth/SupabaseAuthClient"


export class AuthServiceSupabase implements AuthService {
  async login(email: string, password: string): Promise<void> {
    const { error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  }

  async logout(): Promise<void> {
    await supabaseAuth.auth.signOut()
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data } = await supabaseAuth.auth.getUser()
    if (!data.user) return null

    return mapSupabaseUser(data.user)
  }
}
