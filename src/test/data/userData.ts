import { User } from '../../types/User'

export const userData: User[] = [
  {
    id: 1,
    email: 'john@mail.com',
    password: 'changeme',
    name: 'Jhon',
    role: 'customer',
    avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
  },
  {
    id: 2,
    email: 'maria@mail.com',
    password: '12345',
    name: 'Maria',
    role: 'customer',
    avatar: 'https://i.imgur.com/00qWleT.jpeg',
  },
  {
    id: 3,
    email: 'admin@mail.com',
    password: 'admin123',
    name: 'Admin',
    role: 'admin',
    avatar: 'https://i.imgur.com/5mPmJYO.jpeg',
  },
]
