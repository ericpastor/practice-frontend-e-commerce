import { CartItem } from '../../types/CartItem'
import { categoriesData } from './categoriesData'

export const cartData: CartItem[] = [
  {
    id: 8,
    title: 'nuevo title',
    price: 987,
    description:
      'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    images: [
      'https://picsum.photos/640/640?r=3330',
      'https://picsum.photos/640/640?r=1129',
      'https://picsum.photos/640/640?r=4653',
    ],
    category: {
      id: 2,
      name: 'Electronics',
      image: 'https://picsum.photos/640/640?r=2586',
    },
    quantity: 1,
  },
  {
    id: 9,
    title: 'Bespoke Wooden Shirt',
    price: 551,
    description:
      'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    images: [
      'https://picsum.photos/640/640?r=1875',
      'https://picsum.photos/640/640?r=5383',
      'https://picsum.photos/640/640?r=4680',
    ],
    category: {
      id: 5,
      name: 'Others',
      image: 'https://picsum.photos/640/640?r=7483',
    },
    quantity: 2,
  },
]
