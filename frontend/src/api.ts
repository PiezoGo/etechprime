import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export type GalleryImage = {
  id: string
  url: string
  name: string
  alt: string
}

export type Category = {
  id: number
  name: string
  slug: string
}

export type Project = {
  id: number
  title: string
  slug: string
  category: Category
  description: string
  cover_image_url: string
  created_at: string
}

export type YouTubeVideo = {
  id: number
  title: string
  video_id: string
  order: number
}

export const fetchGallery = (): Promise<GalleryImage[]> =>
  api.get('/gallery/').then(r => r.data)

export const fetchProjects = (): Promise<Project[]> =>
  api.get('/projects/').then(r => r.data)

export const fetchCategories = (): Promise<Category[]> =>
  api.get('/categories/').then(r => r.data)

export const fetchVideos = (): Promise<YouTubeVideo[]> =>
  api.get('/videos/').then(r => r.data)

export const submitInquiry = (data: { name: string; email: string; message: string }) =>
  api.post('/inquiries/', data).then(r => r.data)

export default api
