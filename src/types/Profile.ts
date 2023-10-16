export type Role = 'customer' | 'admin'

export interface Profile {
  id?: number
  email: string
  password: string
  name: string
  role: Role
  avatar: string
}

export interface ProfileState {
  profiles: Profile[]
  currentProfile?: Profile
  loading: boolean
  error: string | null | undefined
}
