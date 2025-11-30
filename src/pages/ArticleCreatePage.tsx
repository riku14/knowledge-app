import { useState } from 'react'
import { useNavigate } from 'react-router'
import { getCategories, mockTags } from '../mockData'
import { ArticleScope } from '../constants'
import { MarkdownPreview } from '../components/MarkdownPreview'
import { MarkdownEditor } from '../components/MarkdownEditor'

/**
 * 記事作成ページ
 */
export const ArticleCreatePage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  // フォーム状態管理
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [scope, setScope] = useState<ArticleScope>(ArticleScope.PUBLIC)
  const [teamId, setTeamId] = useState('')
  const [content, setContent] = useState('')

  // データ取得
  const categories = getCategories()

  // チーム一覧（仮データ、後でモックデータから取得）
  const teams = [
    { id: 'team1', name: '開発チーム' },
    { id: 'team2', name: 'デザインチーム' },
  ]

  // タグ選択のトグル処理
  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  const handleCancel = () => {
    if (window.confirm('編集中の内容は保持されません。よろしいですか？')) {
      navigate('/articles')
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* ヘッダー */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">記事作成</h1>
        <button
          onClick={handleCancel}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          キャンセル
        </button>
      </div>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
        {/* タイトル入力欄 */}
        <div className="mb-3">
          <label htmlFor="title" className=" mb-2 block text-sm font-medium text-gray-700">
            タイトル <span className=" text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="記事のタイトル"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* カテゴリセレクト */}
        <div className="mb-3">
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
            カテゴリ <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">選択してください</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* タグ選択 */}
        <div className="mb-3">
          <label className="mb-2 block text-sm font-medium text-gray-700">タグ</label>
          <div className="flex flex-wrap gap-2">
            {mockTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagToggle(tag.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedTags.includes(tag.id)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                #{tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* 公開範囲ラジオボタン */}
        <div className="mb-3">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            公開範囲 <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="scope"
                value={ArticleScope.PUBLIC}
                checked={scope === ArticleScope.PUBLIC}
                onChange={(e) => {
                  setScope(e.target.value as ArticleScope)
                  setTeamId('')
                }}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">全体公開（承認必要）</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="scope"
                value={ArticleScope.TEAM}
                checked={scope === ArticleScope.TEAM}
                onChange={(e) => setScope(e.target.value as ArticleScope)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">チーム内限定</span>
            </label>
          </div>
        </div>

        {/* チームセレクト（チーム内限定時のみ表示） */}
        {scope === ArticleScope.TEAM && (
          <div>
            <label htmlFor="team" className="mb-2 block text-sm font-medium text-gray-700">
              チーム <span className="text-red-500">*</span>
            </label>
            <select
              id="team"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">選択してください</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* モバイル版： タブ切り替え */}
      <div className="mb-4 lg:hidden">
        <div className=" flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'edit'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            編集
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'preview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            プレビュー
          </button>
        </div>
      </div>

      {/* PC版： 2カラムレイアウト */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* エディタエリア */}
        <div className={`${activeTab === 'edit' ? 'block' : 'hidden'} lg:block`}>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">編集</h2>

            {/* Markdownエディタ */}
            <div>
              <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
                本文
              </label>
              <MarkdownEditor
                value={content}
                onChange={setContent}
                placeholder="Markdownで記事を書いてください..."
                rows={15}
              />
            </div>
          </div>
        </div>

        {/* プレビューエリア */}
        <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} lg:block`}>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">プレビュー</h2>
            <MarkdownPreview content={content} />
          </div>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={handleCancel}
          className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          キャンセル
        </button>
        <button
          disabled
          className="rounded-lg bg-gray-400 px-6 py-2 text-sm font-medium text-white cursor-not-allowed"
        >
          下書き保存
        </button>
        <button
          disabled
          className="rounded-lg bg-gray-400 px-6 py-2 text-sm font-medium text-white cursor-not-allowed"
        >
          投稿
        </button>
      </div>
    </div>
  )
}
