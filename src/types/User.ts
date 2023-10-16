export interface User {
  id?: number
  email: string
  password: string
  name: string
  role?: string
  avatar: string
}

export interface CreateUser {
  name: string
  email: string
  password: string
  avatar: string
}

export interface UserState {
  users: User[]
  currentUser?: User
  loading:boolean
  error?: string | null
}
