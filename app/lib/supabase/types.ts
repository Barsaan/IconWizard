export interface User {
  id: string
  email?: string
  created_at: string
}

export interface Session {
  user: User
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
}
