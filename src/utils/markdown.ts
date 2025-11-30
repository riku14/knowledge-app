import { marked } from 'marked'
import Prism from 'prismjs'

import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-markdown'

/**
 * MarkdownをHTMLに変換する関数
 * @param markdown Markdown文字列
 * @returns HTML文字列
 */
export const markdownToHtml = (markdown: string): string => {
  if (!markdown) return ''

  // Markdownのレンダラーを作成
  const renderer = new marked.Renderer()

  // コードブロック（```で囲まれた部分）の処理
  renderer.code = ({ text, lang }) => {
    const language = lang || 'text'
    // Prism.jsでサポートされている言語かチェック
    const prismLang = Prism.languages[language] || Prism.languages.text
    const highlighted = Prism.highlight(text, prismLang, language)
    return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`
  }

  // インラインコード（`で囲まれた部分）の処理
  renderer.codespan = ({ text }) => {
    return `<code class="language-text">${text}</code>`
  }

  // markedのオプションを設定
  marked.use({
    renderer: renderer,
    breaks: true, // 改行を<br>に変換
    gfm: true, // GitHub Flavored Markdownを有効化
  })

  const html = marked.parse(markdown) as string
  return html
}
