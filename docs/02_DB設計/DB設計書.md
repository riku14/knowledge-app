# データベース設計書

## 1. 概要

本ドキュメントは、ナレッジ共有アプリケーションのデータベース設計を記載します。
初心者にも理解しやすいよう、シンプルで明確な設計を心がけています。

### 1.1 設計方針

- **正規化**: 第三正規形（3NF）まで正規化
- **シンプルさ**: 必要最小限のテーブル構成
- **明確な関係**: 外部キーによる明確な関連付け
- **拡張性**: 将来的な機能追加に対応可能な構造

### 1.2 データベース選定

- **推奨DBMS**: PostgreSQL / MySQL / SQLite
- **文字コード**: UTF-8
- **文字照合順序**: utf8mb4_unicode_ci (MySQLの場合)

---

## 2. エンティティ一覧

| No. | エンティティ名 | 説明 | 主キー |
|-----|--------------|------|--------|
| 1 | users | ユーザー情報 | id |
| 2 | teams | チーム情報 | id |
| 3 | team_members | チームメンバー（中間テーブル） | id |
| 4 | categories | カテゴリ情報 | id |
| 5 | tags | タグ情報 | id |
| 6 | articles | 記事情報 | id |
| 7 | article_tags | 記事-タグ関連（中間テーブル） | id |
| 8 | comments | コメント情報 | id |
| 9 | favorites | お気に入り情報 | id |

---

## 3. テーブル定義

### 3.1 users（ユーザー）

ユーザー基本情報を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|---------|---------|------|------|
| id | VARCHAR(36) | PRIMARY KEY | ユーザーID（UUID） |
| name | VARCHAR(100) | NOT NULL | ユーザー名 |
| email | VARCHAR(255) | NOT NULL, UNIQUE | メールアドレス |
| password_hash | VARCHAR(255) | NOT NULL | パスワードハッシュ |
| role | VARCHAR(20) | NOT NULL, DEFAULT 'member' | 権限（admin/leader/member） |
| avatar_url | VARCHAR(500) | | アバター画像URL |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 登録日時 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス:**
- `idx_users_email` ON `email`
- `idx_users_role` ON `role`

**制約:**
- `role` は 'admin', 'leader', 'member' のいずれか

---

### 3.2 teams（チーム）

チーム情報を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|---------|---------|------|------|
| id | VARCHAR(36) | PRIMARY KEY | チームID（UUID） |
| name | VARCHAR(100) | NOT NULL | チーム名 |
| leader_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | チームリーダーID |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'active' | 状態（active/closed） |
| is_public | BOOLEAN | NOT NULL, DEFAULT false | 公開フラグ |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス:**
- `idx_teams_leader` ON `leader_id`
- `idx_teams_status` ON `status`

**外部キー:**
- `leader_id` → `users(id)` ON DELETE RESTRICT

**制約:**
- `status` は 'active', 'closed' のいずれか

---

### 3.3 team_members（チームメンバー）

チームとメンバーの関連を管理する中間テーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|---------|---------|------|------|
| id | VARCHAR(36) | PRIMARY KEY | ID（UUID） |
| team_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | チームID |
| user_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | ユーザーID |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 登録日時 |

**インデックス:**
- `idx_team_members_team` ON `team_id`
- `idx_team_members_user` ON `user_id`
- `UNIQUE(team_id, user_id)` - 同一チームへの重複登録を防止

**外部キー:**
- `team_id` → `teams(id)` ON DELETE CASCADE
- `user_id` → `users(id)` ON DELETE CASCADE

---

### 3.4 categories（カテゴリ）

記事のカテゴリを管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|---------|---------|------|------|
| id | VARCHAR(36) | PRIMARY KEY | カテゴリID（UUID） |
| name | VARCHAR(50) | NOT NULL, UNIQUE | カテゴリ名 |
| color | VARCHAR(20) | NOT NULL, DEFAULT 'blue' | 色（blue/green/purple） |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |

**制約:**
- `color` は 'blue', 'green', 'purple' のいずれか

---

### 3.5 tags（タグ）

記事のタグを管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|---------|---------|------|------|
| id | VARCHAR(36) | PRIMARY KEY | タグID（UUID） |
| name | VARCHAR(50) | NOT NULL, UNIQUE | タグ名 |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |

**インデックス:**
- `idx_tags_name` ON `name`

---

### 3.6 articles（記事）

記事情報を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|---------|---------|------|------|
| id | VARCHAR(36) | PRIMARY KEY | 記事ID（UUID） |
| title | VARCHAR(200) | NOT NULL | タイトル |
| content | TEXT | NOT NULL | 本文（Markdown形式） |
| category_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | カテゴリID |
| author_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 投稿者ID |
| team_id | VARCHAR(36) | FOREIGN KEY | チームID（team限定時のみ） |
| scope | VARCHAR(20) | NOT NULL, DEFAULT 'team' | 公開範囲（public/team） |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'draft' | ステータス（draft/pending/published/rejected） |
| rejection_reason | TEXT | | 差し戻し理由 |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス:**
- `idx_articles_category` ON `category_id`
- `idx_articles_author` ON `author_id`
- `idx_articles_team` ON `team_id`
- `idx_articles_status` ON `status`
- `idx_articles_scope` ON `scope`
- `idx_articles_created` ON `created_at` DESC

**外部キー:**
- `category_id` → `categories(id)` ON DELETE RESTRICT
- `author_id` → `users(id)` ON DELETE RESTRICT
- `team_id` → `teams(id)` ON DELETE SET NULL

**制約:**
- `scope` は 'public', 'team' のいずれか
- `status` は 'draft', 'pending', 'published', 'rejected' のいずれか
- `scope='team'` の場合、`team_id` は必須

---

### 3.7 article_tags（記事-タグ関連）

記事とタグの多対多の関連を管理する中間テーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|---------|---------|------|------|
| id | VARCHAR(36) | PRIMARY KEY | ID（UUID） |
| article_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 記事ID |
| tag_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | タグID |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 登録日時 |

**インデックス:**
- `idx_article_tags_article` ON `article_id`
- `idx_article_tags_tag` ON `tag_id`
- `UNIQUE(article_id, tag_id)` - 重複を防止

**外部キー:**
- `article_id` → `articles(id)` ON DELETE CASCADE
- `tag_id` → `tags(id)` ON DELETE CASCADE

---

### 3.8 comments（コメント）

記事へのコメントを管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|---------|---------|------|------|
| id | VARCHAR(36) | PRIMARY KEY | コメントID（UUID） |
| article_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 記事ID |
| user_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 投稿者ID |
| content | TEXT | NOT NULL | コメント内容 |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 投稿日時 |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新日時 |

**インデックス:**
- `idx_comments_article` ON `article_id`
- `idx_comments_user` ON `user_id`
- `idx_comments_created` ON `created_at` DESC

**外部キー:**
- `article_id` → `articles(id)` ON DELETE CASCADE
- `user_id` → `users(id)` ON DELETE RESTRICT

---

### 3.9 favorites（お気に入り）

記事のお気に入り登録を管理するテーブルです。

| カラム名 | データ型 | 制約 | 説明 |
|---------|---------|------|------|
| id | VARCHAR(36) | PRIMARY KEY | ID（UUID） |
| article_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | 記事ID |
| user_id | VARCHAR(36) | NOT NULL, FOREIGN KEY | ユーザーID |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 登録日時 |

**インデックス:**
- `idx_favorites_article` ON `article_id`
- `idx_favorites_user` ON `user_id`
- `UNIQUE(article_id, user_id)` - 重複登録を防止

**外部キー:**
- `article_id` → `articles(id)` ON DELETE CASCADE
- `user_id` → `users(id)` ON DELETE CASCADE

---

## 4. リレーション概要

### 4.1 主要なリレーション

1. **users → teams（1対多）**
   - ユーザーが複数のチームのリーダーになることができます
   - `teams.leader_id` → `users.id`

2. **users ↔ teams（多対多）**
   - ユーザーは複数のチームに所属できます
   - チームには複数のメンバーが所属できます
   - `team_members` テーブルで関連付け

3. **users → articles（1対多）**
   - ユーザーは複数の記事を投稿できます
   - `articles.author_id` → `users.id`

4. **teams → articles（1対多）**
   - チーム限定記事の場合、チームに紐づきます
   - `articles.team_id` → `teams.id`

5. **categories → articles（1対多）**
   - カテゴリは複数の記事に紐づきます
   - `articles.category_id` → `categories.id`

6. **articles ↔ tags（多対多）**
   - 記事には複数のタグが付けられます
   - タグは複数の記事で使用されます
   - `article_tags` テーブルで関連付け

7. **articles → comments（1対多）**
   - 記事には複数のコメントが付けられます
   - `comments.article_id` → `articles.id`

8. **users → comments（1対多）**
   - ユーザーは複数のコメントを投稿できます
   - `comments.user_id` → `users.id`

9. **articles ↔ users（多対多：お気に入り）**
   - ユーザーは複数の記事をお気に入り登録できます
   - 記事は複数のユーザーにお気に入り登録されます
   - `favorites` テーブルで関連付け

---

## 5. データ整合性

### 5.1 外部キー制約

- **CASCADE**: 親レコード削除時、子レコードも自動削除
  - `team_members`, `article_tags`, `comments`, `favorites`
  
- **RESTRICT**: 子レコードが存在する場合、親レコードの削除を禁止
  - `articles`, `comments`
  
- **SET NULL**: 親レコード削除時、外部キーをNULLに設定
  - `articles.team_id`

### 5.2 ユニーク制約

- `users.email`: メールアドレスの重複を禁止
- `categories.name`: カテゴリ名の重複を禁止
- `tags.name`: タグ名の重複を禁止
- `team_members(team_id, user_id)`: 同一ユーザーの同一チームへの重複登録を禁止
- `article_tags(article_id, tag_id)`: 同一記事への同一タグの重複登録を禁止
- `favorites(article_id, user_id)`: 同一記事への同一ユーザーの重複登録を禁止

---

## 6. パフォーマンス考慮

### 6.1 インデックス戦略

- **検索頻度の高いカラム**: インデックスを設定
- **外部キー**: すべてインデックス設定
- **ソート頻度の高いカラム**: 降順インデックス設定（例: `created_at DESC`）

### 6.2 クエリ最適化のポイント

1. **記事一覧取得**: `status`, `scope`, `category_id`, `created_at` でフィルタリング・ソート
2. **チーム記事取得**: `team_id`, `status` でフィルタリング
3. **ユーザーの記事取得**: `author_id`, `status` でフィルタリング
4. **検索機能**: 全文検索エンジン（例: Elasticsearch）の併用を推奨

---

## 7. 将来の拡張性

### 7.1 予想される拡張

1. **通知機能**: `notifications` テーブルを追加
2. **いいね機能**: `likes` テーブルを追加（`favorites` とは別）
3. **閲覧履歴**: `view_history` テーブルを追加
4. **ファイル添付**: `attachments` テーブルを追加
5. **バージョン管理**: `article_versions` テーブルを追加

---

## 8. サンプルデータ

### 8.1 users テーブル

```sql
INSERT INTO users (id, name, email, password_hash, role) VALUES
('user1', '山田太郎', 'yamada@example.com', '$2b$10$...', 'admin'),
('user2', '佐藤花子', 'sato@example.com', '$2b$10$...', 'leader'),
('user3', '鈴木一郎', 'suzuki@example.com', '$2b$10$...', 'member');
```

### 8.2 teams テーブル

```sql
INSERT INTO teams (id, name, leader_id, status, is_public) VALUES
('team1', '開発チーム', 'user2', 'active', true),
('team2', 'デザインチーム', 'user5', 'active', true);
```

### 8.3 articles テーブル

```sql
INSERT INTO articles (id, title, content, category_id, author_id, team_id, scope, status) VALUES
('art1', 'Reactの基本的な使い方', '# Reactの基本的な使い方\n\n...', 'cat1', 'user1', 'team1', 'team', 'published'),
('art2', 'データベース設計のベストプラクティス', '# データベース設計のベストプラクティス\n\n...', 'cat1', 'user2', NULL, 'public', 'published');
```

---

## 9. 注意事項

1. **UUIDの使用**: IDにはUUIDを使用することを推奨（セキュリティ面でランダム性が高い）
2. **パスワード**: 必ずハッシュ化して保存（bcrypt等を使用）
3. **ソフトデリート**: 重要なデータは論理削除（deleted_atカラム）を検討
4. **バックアップ**: 定期的なバックアップを実施
5. **マイグレーション**: スキーマ変更時は適切なマイグレーション手順を実行

---

**文書管理情報**
- 作成日: 2024年12月22日
- バージョン: 1.0
- 最終更新日: 2024年12月22日

