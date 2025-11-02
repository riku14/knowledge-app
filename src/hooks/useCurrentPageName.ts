import { useLocation } from 'react-router'
import { getPageNameByPath } from '../constants'

/**
 * 現在のページ名を取得
 */
export function useCurrentPageName(): string {
  const location = useLocation()
  return getPageNameByPath(location.pathname)
}
