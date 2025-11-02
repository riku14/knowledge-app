現在のコードを確認し、定数化すべき箇所を洗い出します。


[5 tools called]

定数化すべき箇所を洗い出しました。以下をまとめます。


[1 tool called]

定数化すべき箇所を洗い出しました。

## 定数化すべき箇所の洗い出し

### 1. **ソートタイプ**（最優先）
現状: `'newest' | 'oldest' | 'updated' | 'popular'` が複数箇所でベタ書き

**使用箇所:**
- `src/pages/ArticlesPage.tsx` (3箇所)
  - 9行目: `useState` の型定義
  - 79行目: `onChange` の型アサーション
  - 82-85行目: `option` の `value` 属性
- `src/mockData/articles.ts` (5箇所)
  - 87行目: 関数パラメータの型定義とデフォルト値
  - 103, 108, 113, 117行目: `if` 条件での文字列比較

### 2. **フィルター値「all」**
現状: `'all'` が複数箇所でベタ書き

**使用箇所:**
- `src/pages/ArticlesPage.tsx` (4箇所)
  - 7, 8行目: `useState` の初期値
  - 42, 62行目: `option` の `value` 属性
- `src/mockData/articles.ts` (2箇所)
  - 92, 97行目: フィルター条件での比較

### 3. **記事ステータス**
現状: `'published' | 'draft'` が複数箇所でベタ書き

**使用箇所:**
- `src/types/article.ts` (1箇所)
  - 22行目: 型定義
- `src/mockData/articles.ts` (4箇所)
  - 25, 49行目: モックデータの値
  - 56, 67行目: フィルター条件

---

## 定数化の提案

`src/constants/` に以下を追加します:

### 1. `src/constants/article.ts`（新規作成）
```typescript
// ソートタイプ
export const SortType = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  UPDATED: 'updated',
  POPULAR: 'popular',
} as const

export type SortType = typeof SortType[keyof typeof SortType]

// フィルター値
export const FILTER_ALL = 'all' as const

// 記事ステータス
export const ArticleStatus = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
} as const

export type ArticleStatus = typeof ArticleStatus[keyof typeof ArticleStatus]
```

### 2. `src/constants/index.ts` の更新
```typescript
// 定数のエクスポート
export type { MenuItem } from './menuItems'
export { menuItems, getPageNameByPath } from './menuItems'
// 【追加】
export * from './article'
```

---

## 適用が必要なファイル

1. `src/types/article.ts` - `ArticleStatus` 型を使用
2. `src/pages/ArticlesPage.tsx` - `SortType` と `FILTER_ALL` を使用
3. `src/mockData/articles.ts` - `SortType`, `FILTER_ALL`, `ArticleStatus` を使用

---

この構成で適用を進めますか？それとも別の構成（例: enum使用）にしますか？