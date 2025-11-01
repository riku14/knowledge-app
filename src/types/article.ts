export interface Article {
  id: string
  title: string
  content: string
  category: {
    id: string
    name: string
  }
}