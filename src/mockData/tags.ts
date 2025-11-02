import type { Tag } from '../types'

export const mockTags: Tag[] = [
  { id: '1', name: 'JavaScript', count: 25 },
  { id: '2', name: 'React', count: 18 },
  { id: '3', name: 'TypeScript', count: 15 },
  { id: '4', name: 'API', count: 12 },
  { id: '5', name: 'Node.js', count: 8 },
  { id: '6', name: 'Java', count: 6 },
  { id: '7', name: 'Python', count: 5 },
  { id: '8', name: 'データベース', count: 4 },
  { id: '9', name: 'バックエンド', count: 3 },
  { id: '10', name: 'フロントエンド', count: 2 },
]

export const getTagRanking = (limit: number = 5): Tag[] => {
  return [...mockTags].sort((a, b) => b.count - a.count).slice(0, limit)
}
