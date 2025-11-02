import { useNavigate } from 'react-router'
import { ArticleCard } from '../components/ArticleCard'
import { TagRanking } from '../components/TagRanking'
import { getRecentArticles, getTagRanking } from '../mockData'

export const HomePage = () => {
  const navigate = useNavigate()
  const top5Tags = getTagRanking(5)
  const recentArticles = getRecentArticles(10)

  const handleViewAll = () => {
    navigate('/articles')
  }
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
      {/* メインエリア */}
      <div className="lg:col-span-2">
        {/* 最近の投稿セクション */}
        <section>
          <div className="flex justify-between">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">最近の投稿</h2>
            <button
              onClick={handleViewAll}
              className="text-xs text-purple-600 hover:text-purple-900 hover:underline"
            >
              すべて見る →
            </button>
          </div>
          {/* 記事カードリスト */}
          <div className="space-y-4">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>

      {/* 右サイドバーエリア */}
      <aside className="lg:col-span-1">
        <TagRanking tags={top5Tags} />
      </aside>
    </div>
  )
}
