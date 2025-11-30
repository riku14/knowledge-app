import { useRef } from 'react'

/**
 * Markdownエディタコンポーネント
 */
export interface MarkdownEditorProps {
  /** エディタの値 */
  value: string
  /** 値が変更されたときのコールバック */
  onChange: (value: string) => void
  /** プレースホルダー */
  placeholder?: string
  /** 行数 */
  rows?: number
}

/**
 * テキストエリアのカーソル位置にテキストを挿入する
 */
const insertTextAtCursor = (
  textarea: HTMLTextAreaElement,
  beforeText: string,
  afterText: string = '',
  selectText: string = ''
) => {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = textarea.value.substring(start, end)
  const textToInsert = selectText || selectedText

  const newValue =
    textarea.value.substring(0, start) +
    beforeText +
    textToInsert +
    afterText +
    textarea.value.substring(end)

  // カーソル位置を更新
  const newCursorPos = start + beforeText.length + textToInsert.length + afterText.length

  textarea.value = newValue
  textarea.setSelectionRange(newCursorPos, newCursorPos)
  textarea.focus()

  return newValue
}

export const MarkdownEditor = ({
  value,
  onChange,
  placeholder = 'Markdownで記事を書いてください...',
  rows = 15,
}: MarkdownEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // ツールバーアクション
  const handleToolbarAction = (action: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    let newValue = value

    switch (action) {
      case 'bold':
        newValue = insertTextAtCursor(textarea, '**', '**', '太字')
        break
      case 'italic':
        newValue = insertTextAtCursor(textarea, '*', '*', '斜体')
        break
      case 'heading1':
        newValue = insertTextAtCursor(textarea, '# ', '', '見出し1')
        break
      case 'heading2':
        newValue = insertTextAtCursor(textarea, '## ', '', '見出し2')
        break
      case 'heading3':
        newValue = insertTextAtCursor(textarea, '### ', '', '見出し3')
        break
      case 'link':
        newValue = insertTextAtCursor(textarea, '[', '](URL)', 'リンクテキスト')
        break
      case 'code':
        newValue = insertTextAtCursor(textarea, '`', '`', 'code')
        break
      case 'codeBlock':
        newValue = insertTextAtCursor(textarea, '```\n', '\n```', 'コード')
        break
      case 'unorderedList':
        newValue = insertTextAtCursor(textarea, '- ', '', 'リスト項目')
        break
      case 'orderedList':
        newValue = insertTextAtCursor(textarea, '1. ', '', 'リスト項目')
        break
      default:
        return
    }

    onChange(newValue)
  }

  return (
    <div className="rounded-lg border border-gray-300 bg-white">
      {/* ツールバー */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-3 py-2">
        {/* 太字 */}
        <button
          type="button"
          onClick={() => handleToolbarAction('bold')}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
          title="太字"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
            />
          </svg>
        </button>

        {/* 斜体 */}
        <button
          type="button"
          onClick={() => handleToolbarAction('italic')}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
          title="斜体"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </button>

        {/* 区切り線 */}
        <div className="mx-1 h-6 w-px bg-gray-300" />

        {/* 見出し1 */}
        <button
          type="button"
          onClick={() => handleToolbarAction('heading1')}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
          title="見出し1"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>

        {/* 見出し2 */}
        <button
          type="button"
          onClick={() => handleToolbarAction('heading2')}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
          title="見出し2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h7"
            />
          </svg>
        </button>

        {/* 見出し3 */}
        <button
          type="button"
          onClick={() => handleToolbarAction('heading3')}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
          title="見出し3"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </button>

        {/* 区切り線 */}
        <div className="mx-1 h-6 w-px bg-gray-300" />

        {/* リンク */}
        <button
          type="button"
          onClick={() => handleToolbarAction('link')}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
          title="リンク"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-5.656-3.555a4 4 0 003.555-3.555m0 0l4-4m-4 4l4 4"
            />
          </svg>
        </button>

        {/* コード */}
        <button
          type="button"
          onClick={() => handleToolbarAction('code')}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
          title="インラインコード"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </button>

        {/* コードブロック */}
        <button
          type="button"
          onClick={() => handleToolbarAction('codeBlock')}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
          title="コードブロック"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        {/* 区切り線 */}
        <div className="mx-1 h-6 w-px bg-gray-300" />

        {/* 順序なしリスト */}
        <button
          type="button"
          onClick={() => handleToolbarAction('unorderedList')}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
          title="順序なしリスト"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* 順序付きリスト */}
        <button
          type="button"
          onClick={() => handleToolbarAction('orderedList')}
          className="rounded p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
          title="順序付きリスト"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </svg>
        </button>
      </div>

      {/* テキストエリア */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full min-h-[400px] rounded-b-lg border-0 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 font-mono resize-y"
      />
    </div>
  )
}