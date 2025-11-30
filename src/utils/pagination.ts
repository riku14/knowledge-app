/**
 * ページネーション計算用のユーティリティ関数
 */

/**
 * ページネーション情報を計算する
 */
export interface PaginationInfo {
  /** 総ページ数 */
  totalPages: number
  /** 現在のページ番号 */
  currentPage: number
  /** 1ページあたりのアイテム数 */
  itemsPerPage: number
  /** 総アイテム数 */
  totalItems: number
  /** 現在のページで表示される最初のアイテムのインデックス */
  startIndex: number
  /** 現在のページで表示される最後のアイテムのインデックス */
  endIndex: number
}

/**
 * ページネーション情報を計算する
 * @param {number} totalItems
 * @param {number} currentPage
 * @param {number=10} itemsPerPage
 * @returns {any}
 */
export const calculatePagination = (
  totalItems: number,
  currentPage: number,
  itemsPerPage: number = 10
): PaginationInfo => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const validPage = Math.max(1, Math.min(currentPage, totalPages))
  const startIndex = (validPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  return {
    totalPages,
    currentPage: validPage,
    itemsPerPage,
    totalItems,
    startIndex,
    endIndex,
  }
}

/**
 * 表示するページ番号配列を生成
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {number=10} maxVisiblePages
 * @returns {any}
 */

export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 10
): (number | string)[] => {
  if (totalPages <= maxVisiblePages) {
    // 総ページ数が最大表示数以下の場合は、すべて表示
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = []
  const halfVisible = Math.floor(maxVisiblePages / 2)

  let startPage = Math.max(1, currentPage - halfVisible)
  let endPage = Math.min(totalPages, currentPage + halfVisible)

  // 最初のページと最後のページを含めるように調整
  if (endPage - startPage < maxVisiblePages - 1) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    } else {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }
  }

  // 最初のページを追加
  if (startPage > 1) {
    pages.push(1)
    if (startPage > 2) {
      pages.push('...')
    }
  }

  // 中間のページを追加
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  // 最後のページを追加
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push('...')
    }
    pages.push(totalPages)
  }

  return pages
}
