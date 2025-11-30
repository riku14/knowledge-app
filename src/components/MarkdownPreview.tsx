import { markdownToHtml } from '../utils'

/**
 * マークダウンプレビューコンポーネント
 */
export interface MarkdownPreviewProps {
  /**
   * マークダウン文字列
   */
  content: string
}

export const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  const htmlContent = markdownToHtml(content)

  if (!content.trim()) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p>プレビューが表示されます。</p>
      </div>
    )
  }

  return (
    <div className=" prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}
