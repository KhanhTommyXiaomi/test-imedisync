export interface PaginationQueryParameters {
  page: number
  limit: number
}

export interface PhotosQueryParameters extends PaginationQueryParameters {}

export interface PhotoItem {
  id?: string
  width?: number
  height?: number
  description?: string
  alt_description?: string
  urls?: {
    full: string
    raw: string
    regular: string
    small: string
    small_s3: string
    thumb: string
  }
  links?: {
    download: string
    download_location: string
    html: string
    self: string
  }
  user?: any
}

export interface PhotoItemResponse extends PhotoItem {
  blur_hash: string
  breadcrumbs: any
  color: string
  created_at: string
  current_user_collections: any
  liked_by_user: boolean
  likes: number
  promoted_at: any
  slug: any
  sponsorship: any
  topic_submissions: any
  updated_at: string
}
