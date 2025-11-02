import React, { useState } from 'react'
import { useNavigate } from 'react-router'

export default function LoginPage() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    // バリデーションチェック
    if (!userId || !password) {
      setError('ユーザーIDとパスワードを入力してください')
      return
    }

    if (userId === 'admin' && password === 'password') {
      navigate('/home')
    } else {
      setError('ユーザーIDまたはパスワードが違います')
    }
  }

  return (
    // TODO:ログイン承認機能
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-linear-to-bl from-violet-500 to-fuchsia-500">
      <h1 className="mb-4 text-3xl font-bold">ナレッジ共有サイト</h1>
      {/* ログインフォーム */}
      <div className="w-full max-w-md p-8 rounded-sm bg-white shadow-2xl">
        <h2 className="mb-2 text-xl font-bold">ログイン</h2>

        {/* エラーメッセージ */}
        {error && (
          <div className="mb-4 p-3 rounded-sm bg-red-100 text-sm text-red-700">{error}</div>
        )}

        {/* 入力フォーム */}
        <form onSubmit={handleSubmit}>
          <p className="mb-1">ユーザーID</p>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-200 rounded-sm bg-white"
            placeholder="ユーザーIDを入力"
          />
          <p className="mb-1">パスワード</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-200 rounded-sm bg-white"
            placeholder="パスワードを入力"
          />

          <button
            type="submit"
            className="w-full py-2 mt-2 border-none rounded-sm bg-purple-400 hover:bg-purple-300 transition-colors"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  )
}
