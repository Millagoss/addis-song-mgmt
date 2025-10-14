export type Song = {
  _id?: string
  title: string
  artist: string
  album: string
  genre: string
  createdAt?: string
  updatedAt?: string
}

export type SongsResponse = {
  data: Song[]
  page: number
  limit: number
  total: number
  totalPages: number
}
