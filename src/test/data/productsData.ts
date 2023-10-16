import { Product } from '../../types/Product'

export const productsData: Product[] = [
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
  },
  {
    id: 10,
    title: 'Gorgeous Soft Hat',
    price: 635,
    description:
      'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    images: [
      'https://picsum.photos/640/640?r=3258',
      'https://picsum.photos/640/640?r=8943',
      'https://picsum.photos/640/640?r=3475',
    ],
    category: {
      id: 1,
      name: 'Clothes',
      image: 'https://picsum.photos/640/640?r=9423',
    },
  },
]
