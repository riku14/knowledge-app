export interface MenuItem {
  path: string
  label: string
}

export const menuItems: MenuItem[] = [
  { path: '/articles/new', label: '記事作成' },
  { path: '/home', label: 'ホーム' },
  { path: '/articles', label: '記事一覧' },
  // { path: '/tags', label: 'タグ管理' },
  // { path: '/teams', label: 'チーム管理' },
  // { path: '/users', label: 'ユーザー管理' },
]

/**
 * パスからページ名を取得する
 */
export function getPageNameByPath(path: string): string {
  const menuItem = menuItems.find((item) => item.path === path)
  return menuItem?.label || '不明なページ'
}