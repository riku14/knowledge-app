import { ArticleCard } from '../components/ArticleCard'
import { mockArticles } from '../mockData'

export const HomePage = () => {
  return (
    // TODO:API実装後モックデータ置き換え
    // 記事カード
    <div>
      {mockArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
