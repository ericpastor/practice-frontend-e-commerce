export type ProductId = number | undefined

export interface ProductById {
  id?: number | undefined
}

export interface UpdateProductDto {
  title?: string
  price?: number
  description?: string
  categoryId?: CategoryId
  images?: string[]
}

export interface UpdateProduct {
  id: ProductId
  update: UpdateProductDto
}

export type CategoryId = number | undefined

export interface Category {
  id: number
  name?: string
  image?: string
}
export interface CategoryState {
  categories: Category[]
  loading: boolean
  error: string | null 
}

export interface CategoryById extends Category {}

export interface Product {
  id?: ProductId
  title: string
  price: number
  description: string
  category: Category | CategoryById
  images: string[]
}

export interface CreateProduct {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

export interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null | undefined
}

export interface PaginationProducts {
  offset: number
  limit: number
}
