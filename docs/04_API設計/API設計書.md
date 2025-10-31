# API設計書

## 1. 概要

ナレッジ共有アプリケーションのRESTful API設計書です。将来的なバックエンド実装時に使用されるAPI仕様を定義します。

### 1.1 API基本情報

- **ベースURL**: `https://api.example.com/v1`
- **認証方式**: JWT（JSON Web Token）
- **データ形式**: JSON
- **文字コード**: UTF-8

### 1.2 共通レスポンス形式

#### 成功レスポンス

```json
{
  "success": true,
  "data": { ... },
  "message": "処理が成功しました"
}
```

#### エラーレスポンス

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": { ... }
  }
}
```

### 1.3 HTTPステータスコード

| コード | 説明 |
|--------|------|
| 200 | 成功 |
| 201 | 作成成功 |
| 400 | リクエストエラー |
| 401 | 認証エラー |
| 403 | 権限不足 |
| 404 | リソースが見つからない |
| 422 | バリデーションエラー |
| 500 | サーバーエラー |

---

## 2. 認証API

### 2.1 ログイン

**エンドポイント**: `POST /api/auth/login`

**リクエスト**

```json
{
  "userId": "user123",
  "password": "password123"
}
```

**レスポンス（200）**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user1",
      "name": "山田太郎",
      "email": "yamada@example.com",
      "role": "admin",
      "avatar": "https://..."
    }
  }
}
```

**エラーレスポンス（401）**

```json
{
  "success": false,
  "error": {
    "code": "AUTH_FAILED",
    "message": "ユーザーIDまたはパスワードが正しくありません"
  }
}
```

### 2.2 ログアウト

**エンドポイント**: `POST /api/auth/logout`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**レスポンス（200）**

```json
{
  "success": true,
  "message": "ログアウトしました"
}
```

### 2.3 ログインユーザー情報取得

**エンドポイント**: `GET /api/auth/me`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**レスポンス（200）**

```json
{
  "success": true,
  "data": {
    "id": "user1",
    "name": "山田太郎",
    "email": "yamada@example.com",
    "role": "admin",
    "avatar": "https://...",
    "teams": [
      {
        "id": "team1",
        "name": "開発チーム",
        "role": "leader"
      }
    ]
  }
}
```

---

## 3. 記事API

### 3.1 記事一覧取得

**エンドポイント**: `GET /api/articles`

**クエリパラメータ**

| パラメータ | 型 | 説明 | デフォルト |
|-----------|-----|------|-----------|
| page | number | ページ番号 | 1 |
| limit | number | 1ページあたりの件数 | 10 |
| category | string | カテゴリID | - |
| tag | string | タグID | - |
| scope | string | 公開範囲（public/team） | - |
| teamId | string | チームID（team scope時） | - |
| sort | string | ソート順（created_at/updated_at/popular） | created_at |
| order | string | 並び順（asc/desc） | desc |
| search | string | 検索キーワード | - |

**レスポンス（200）**

```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "art1",
        "title": "Reactの基本的な使い方",
        "content": "...",
        "category": {
          "id": "cat1",
          "name": "技術ドキュメント",
          "color": "blue"
        },
        "tags": [
          { "id": "tag1", "name": "React" },
          { "id": "tag2", "name": "JavaScript" }
        ],
        "author": {
          "id": "user1",
          "name": "山田太郎",
          "avatar": "https://..."
        },
        "scope": "team",
        "team": {
          "id": "team1",
          "name": "開発チーム"
        },
        "status": "published",
        "createdAt": "2024-12-15T10:00:00Z",
        "updatedAt": "2024-12-15T10:00:00Z",
        "favoriteCount": 2,
        "commentCount": 2,
        "isFavorite": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### 3.2 記事詳細取得

**エンドポイント**: `GET /api/articles/:id`

**レスポンス（200）**

```json
{
  "success": true,
  "data": {
    "id": "art1",
    "title": "Reactの基本的な使い方",
    "content": "# Reactの基本的な使い方\n\n...",
    "category": { ... },
    "tags": [ ... ],
    "author": { ... },
    "scope": "team",
    "team": { ... },
    "status": "published",
    "createdAt": "2024-12-15T10:00:00Z",
    "updatedAt": "2024-12-15T10:00:00Z",
    "favoriteCount": 2,
    "commentCount": 2,
    "isFavorite": false,
    "canEdit": true,
    "canDelete": true
  }
}
```

**エラーレスポンス（404）**

```json
{
  "success": false,
  "error": {
    "code": "ARTICLE_NOT_FOUND",
    "message": "記事が見つかりません"
  }
}
```

### 3.3 記事作成

**エンドポイント**: `POST /api/articles`

**リクエストヘッダー**

```
Authorization: Bearer {token}
Content-Type: application/json
```

**リクエストボディ**

```json
{
  "title": "新規記事タイトル",
  "content": "# 記事本文\n\n...",
  "categoryId": "cat1",
  "tagIds": ["tag1", "tag2"],
  "scope": "team",
  "teamId": "team1",
  "status": "draft"
}
```

**バリデーション**

- `title`: 必須、1-200文字
- `content`: 必須、1文字以上
- `categoryId`: 必須、存在するカテゴリID
- `tagIds`: 任意、配列
- `scope`: 必須、'public' または 'team'
- `teamId`: scope='team' の場合必須
- `status`: 必須、'draft' または 'pending'

**レスポンス（201）**

```json
{
  "success": true,
  "data": {
    "id": "art123",
    "title": "新規記事タイトル",
    ...
  },
  "message": "記事を作成しました"
}
```

### 3.4 記事更新

**エンドポイント**: `PUT /api/articles/:id`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**リクエストボディ**

記事作成と同じ形式

**権限チェック**: 記事の投稿者のみ更新可能

**レスポンス（200）**

```json
{
  "success": true,
  "data": { ... },
  "message": "記事を更新しました"
}
```

### 3.5 記事削除

**エンドポイント**: `DELETE /api/articles/:id`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**権限チェック**: 記事の投稿者のみ削除可能

**レスポンス（200）**

```json
{
  "success": true,
  "message": "記事を削除しました"
}
```

### 3.6 お気に入り追加

**エンドポイント**: `POST /api/articles/:id/favorite`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**レスポンス（200）**

```json
{
  "success": true,
  "message": "お気に入りに追加しました"
}
```

### 3.7 お気に入り削除

**エンドポイント**: `DELETE /api/articles/:id/favorite`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**レスポンス（200）**

```json
{
  "success": true,
  "message": "お気に入りから削除しました"
}
```

### 3.8 記事承認

**エンドポイント**: `POST /api/articles/:id/approve`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**権限チェック**: 管理者またはリーダーのみ

**レスポンス（200）**

```json
{
  "success": true,
  "data": {
    "id": "art1",
    "status": "published",
    ...
  },
  "message": "記事を承認しました"
}
```

### 3.9 記事差し戻し

**エンドポイント**: `POST /api/articles/:id/reject`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**リクエストボディ**

```json
{
  "reason": "差し戻し理由を入力してください"
}
```

**バリデーション**

- `reason`: 必須、1文字以上

**権限チェック**: 管理者またはリーダーのみ

**レスポンス（200）**

```json
{
  "success": true,
  "data": {
    "id": "art1",
    "status": "rejected",
    "rejectionReason": "差し戻し理由を入力してください",
    ...
  },
  "message": "記事を差し戻しました"
}
```

---

## 4. コメントAPI

### 4.1 コメント一覧取得

**エンドポイント**: `GET /api/articles/:id/comments`

**レスポンス（200）**

```json
{
  "success": true,
  "data": [
    {
      "id": "com1",
      "content": "とても参考になりました！",
      "user": {
        "id": "user2",
        "name": "佐藤花子",
        "avatar": "https://..."
      },
      "createdAt": "2024-12-15T11:00:00Z",
      "canDelete": true
    }
  ]
}
```

### 4.2 コメント投稿

**エンドポイント**: `POST /api/articles/:id/comments`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**リクエストボディ**

```json
{
  "content": "コメント内容"
}
```

**バリデーション**

- `content`: 必須、1文字以上

**レスポンス（201）**

```json
{
  "success": true,
  "data": {
    "id": "com123",
    "content": "コメント内容",
    ...
  },
  "message": "コメントを投稿しました"
}
```

### 4.3 コメント削除

**エンドポイント**: `DELETE /api/comments/:id`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**権限チェック**: コメント投稿者または記事作者のみ削除可能

**レスポンス（200）**

```json
{
  "success": true,
  "message": "コメントを削除しました"
}
```

---

## 5. タグAPI

### 5.1 タグ一覧取得

**エンドポイント**: `GET /api/tags`

**レスポンス（200）**

```json
{
  "success": true,
  "data": [
    {
      "id": "tag1",
      "name": "React",
      "count": 5,
      "createdAt": "2024-01-15T00:00:00Z"
    }
  ]
}
```

### 5.2 タグ作成

**エンドポイント**: `POST /api/tags`

**リクエストヘッダー**

```
Authorization: Bearer {token}
```

**権限チェック**: 管理者またはリーダーのみ

**リクエストボディ**

```json
{
  "name": "新規タグ"
}
```

**バリデーション**

- `name`: 必須、1-50文字、ユニーク

**レスポンス（201）**

```json
{
  "success": true,
  "data": {
    "id": "tag123",
    "name": "新規タグ",
    "count": 0,
    ...
  },
  "message": "タグを作成しました"
}
```

### 5.3 タグ更新

**エンドポイント**: `PUT /api/tags/:id`

**権限チェック**: 管理者またはリーダーのみ

**リクエストボディ**

```json
{
  "name": "更新後のタグ名"
}
```

**レスポンス（200）**

```json
{
  "success": true,
  "data": { ... },
  "message": "タグを更新しました"
}
```

### 5.4 タグ削除

**エンドポイント**: `DELETE /api/tags/:id`

**権限チェック**: 管理者またはリーダーのみ

**レスポンス（200）**

```json
{
  "success": true,
  "message": "タグを削除しました"
}
```

**注意**: 使用中のタグの場合は警告を返す（削除は可能）

---

## 6. チームAPI

### 6.1 チーム一覧取得

**エンドポイント**: `GET /api/teams`

**クエリパラメータ**

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| status | string | active/closed |
| userId | string | ユーザーID（所属チーム取得） |

**レスポンス（200）**

```json
{
  "success": true,
  "data": [
    {
      "id": "team1",
      "name": "開発チーム",
      "leader": {
        "id": "user2",
        "name": "佐藤花子",
        "avatar": "https://..."
      },
      "memberCount": 3,
      "status": "active",
      "isPublic": true,
      "createdAt": "2024-01-15T00:00:00Z"
    }
  ]
}
```

### 6.2 チーム作成

**エンドポイント**: `POST /api/teams`

**権限チェック**: 管理者のみ

**リクエストボディ**

```json
{
  "name": "新規チーム",
  "leaderId": "user2",
  "memberIds": ["user1", "user2", "user3"],
  "isPublic": true
}
```

**バリデーション**

- `name`: 必須、1-100文字
- `leaderId`: 必須、存在するユーザーID
- `memberIds`: 任意、ユーザーID配列
- `isPublic`: boolean

**レスポンス（201）**

```json
{
  "success": true,
  "data": { ... },
  "message": "チームを作成しました"
}
```

### 6.3 チーム更新

**エンドポイント**: `PUT /api/teams/:id`

**権限チェック**: 管理者のみ

**レスポンス（200）**

```json
{
  "success": true,
  "data": { ... },
  "message": "チームを更新しました"
}
```

### 6.4 チーム閉鎖

**エンドポイント**: `DELETE /api/teams/:id`

**権限チェック**: 管理者のみ

**レスポンス（200）**

```json
{
  "success": true,
  "data": {
    "id": "team1",
    "status": "closed",
    ...
  },
  "message": "チームを閉鎖しました"
}
```

---

## 7. ユーザーAPI

### 7.1 ユーザー一覧取得

**エンドポイント**: `GET /api/users`

**権限チェック**: 管理者のみ

**レスポンス（200）**

```json
{
  "success": true,
  "data": [
    {
      "id": "user1",
      "name": "山田太郎",
      "email": "yamada@example.com",
      "role": "admin",
      "avatar": "https://...",
      "createdAt": "2024-01-15T00:00:00Z"
    }
  ]
}
```

### 7.2 ユーザー作成

**エンドポイント**: `POST /api/users`

**権限チェック**: 管理者のみ

**リクエストボディ**

```json
{
  "name": "新規ユーザー",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "member"
}
```

**バリデーション**

- `name`: 必須、1-100文字
- `email`: 必須、有効なメールアドレス、ユニーク
- `password`: 必須、8文字以上
- `role`: 必須、'admin'/'leader'/'member'

**レスポンス（201）**

```json
{
  "success": true,
  "data": { ... },
  "message": "ユーザーを作成しました"
}
```

### 7.3 ユーザー更新

**エンドポイント**: `PUT /api/users/:id`

**権限チェック**: 管理者のみ

**リクエストボディ**

```json
{
  "name": "更新後の名前",
  "email": "updated@example.com",
  "role": "leader"
}
```

**レスポンス（200）**

```json
{
  "success": true,
  "data": { ... },
  "message": "ユーザーを更新しました"
}
```

### 7.4 ユーザー削除

**エンドポイント**: `DELETE /api/users/:id`

**権限チェック**: 管理者のみ

**レスポンス（200）**

```json
{
  "success": true,
  "message": "ユーザーを削除しました"
}
```

---

## 8. 検索API

### 8.1 記事検索

**エンドポイント**: `GET /api/search/articles`

**クエリパラメータ**

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| q | string | 検索キーワード（必須） |
| targets | string[] | 検索対象（title/content/tags/author） |
| category | string | カテゴリID |
| scope | string | 公開範囲 |
| startDate | string | 開始日（ISO 8601） |
| endDate | string | 終了日（ISO 8601） |
| page | number | ページ番号 |
| limit | number | 1ページあたりの件数 |

**レスポンス（200）**

```json
{
  "success": true,
  "data": {
    "articles": [ ... ],
    "pagination": { ... },
    "query": "検索キーワード",
    "total": 10
  }
}
```

---

## 9. エラーハンドリング

### 9.1 エラーコード一覧

| コード | HTTPステータス | 説明 |
|--------|---------------|------|
| AUTH_FAILED | 401 | 認証失敗 |
| UNAUTHORIZED | 401 | 認証トークンなし |
| FORBIDDEN | 403 | 権限不足 |
| NOT_FOUND | 404 | リソースが見つからない |
| VALIDATION_ERROR | 422 | バリデーションエラー |
| DUPLICATE | 422 | 重複エラー |
| SERVER_ERROR | 500 | サーバーエラー |

### 9.2 バリデーションエラー例

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "バリデーションエラー",
    "details": {
      "title": ["タイトルは必須です"],
      "categoryId": ["存在しないカテゴリIDです"]
    }
  }
}
```

---

## 10. 認証・認可

### 10.1 JWTトークン

- **発行**: ログイン成功時に発行
- **有効期限**: 24時間（設定可能）
- **リフレッシュ**: 将来実装予定

### 10.2 認証ヘッダー

```
Authorization: Bearer {token}
```

### 10.3 権限チェック

各APIエンドポイントで、必要な権限をチェック：

- **全員**: 認証済みユーザー全員
- **管理者**: `role === 'admin'`
- **リーダー以上**: `role === 'admin' || role === 'leader'`
- **リソース所有者**: 自分のリソースのみ操作可能

---

**文書管理情報**
- 作成日: 2024年12月22日
- バージョン: 1.0
- 最終更新日: 2024年12月22日

