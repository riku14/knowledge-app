import { useState } from 'react'
import { useNavigate } from 'react-router'
import { getCategories, mockTags, createArticle } from '../mockData'
import { ArticleScope, ArticleStatus } from '../constants'
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

  // バリデーションエラー状態
  const [errors, setErrors] = useState<{
    title?: string
    category?: string
    team?: string
    content?: string
  }>({})

  // 保存中状態
  const [isSaving, setIsSaving] = useState(false)

  // TODO: 後でAuthContextから取得するように変更
  const getCurrentUserId = (): string => {
    return '1' // 例: 山田太郎のID
  }

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

  // バリデーション関数
  const validate = (isPublish: boolean): boolean => {
    const newErrors: typeof errors = {}

    // タイトル必須チェック
    if (!title.trim()) {
      newErrors.title = 'タイトルを入力してください'
    }

    // カテゴリ必須チェック
    if (!categoryId) {
      newErrors.category = 'カテゴリを選択してください'
    }

    // チーム必須チェック（チーム内限定の場合）
    if (scope === ArticleScope.TEAM && !teamId) {
      newErrors.team = 'チームを選択してください'
    }

    // 本文必須チェック（投稿時のみ）
    if (isPublish && !content.trim()) {
      newErrors.content = '本文を入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 下書き保存処理
  const handleSaveDraft = () => {
    // タイトルのみ必須
    if (!title.trim()) {
      setErrors({ title: 'タイトルを入力してください' })
      return
    }

    setIsSaving(true)
    try {
      const currentUserId = getCurrentUserId()
      createArticle({
        title: title.trim(),
        content: content.trim(),
        categoryId: categoryId || categories[0]?.id || '',
        tagIds: selectedTags,
        scope,
        teamId: scope === ArticleScope.TEAM ? teamId : undefined,
        status: ArticleStatus.DRAFT,
        userId: currentUserId,
      })

      alert('下書きを保存しました')
      navigate('/articles')
    } catch (error) {
      console.error('下書き保存エラー:', error)
      alert('下書きの保存に失敗しました')
    } finally {
      setIsSaving(false)
    }
  }

  // 投稿処理
  const handlePublish = () => {
    if (!validate(true)) {
      return
    }

    setIsSaving(true)
    try {
      const currentUserId = getCurrentUserId()
      const newArticle = createArticle({
        title: title.trim(),
        content: content.trim(),
        categoryId,
        tagIds: selectedTags,
        scope,
        teamId: scope === ArticleScope.TEAM ? teamId : undefined,
        status:
          scope === ArticleScope.PUBLIC ? ArticleStatus.PENDING : ArticleStatus.PUBLISHED,
        userId: currentUserId,
      })

      alert(
        scope === ArticleScope.PUBLIC
          ? '記事を投稿しました。承認待ちです。'
          : '記事を投稿しました。'
      )
      navigate(`/articles/${newArticle.id}`)
    } catch (error) {
      console.error('投稿エラー:', error)
      alert('記事の投稿に失敗しました')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (window.confirm('編集中の内容は保持されません。よろしいですか？')) {
      navigate('/articles')
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-full">
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
            onChange={(e) => {
              setTitle(e.target.value)
              if (errors.title) {
                setErrors({ ...errors, title: undefined })
              }
            }}
            placeholder="記事のタイトル"
            className={`w-full rounded-lg border px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
              errors.title
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>

        {/* カテゴリセレクト */}
        <div className="mb-3">
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
            カテゴリ <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value)
              if (errors.category) {
                setErrors({ ...errors, category: undefined })
              }
            }}
            className={`w-full rounded-lg border px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 ${
              errors.category
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          >
            <option value="">選択してください</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
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
              onChange={(e) => {
                setTeamId(e.target.value)
                if (errors.team) {
                  setErrors({ ...errors, team: undefined })
                }
              }}
              className={`w-full rounded-lg border px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 ${
                errors.team
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            >
              <option value="">選択してください</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            {errors.team && <p className="mt-1 text-xs text-red-500">{errors.team}</p>}
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
                onChange={(value) => {
                  setContent(value)
                  if (errors.content) {
                    setErrors({ ...errors, content: undefined })
                  }
                }}
                placeholder="Markdownで記事を書いてください..."
                rows={25}
              />
              {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
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
          disabled={isSaving}
          className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          キャンセル
        </button>
        <button
          onClick={handleSaveDraft}
          disabled={isSaving || !title.trim()}
          className="rounded-lg bg-gray-600 px-6 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? '保存中...' : '下書き保存'}
        </button>
        <button
          onClick={handlePublish}
          disabled={isSaving}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? '投稿中...' : '投稿'}
        </button>
      </div>
    </div>
  )
}
