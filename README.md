## GitHubを使ったことがない方へ

### 1. GitHubアカウント作成（任意）
アカウントがなくてもダウンロードは可能ですが、編集や公開には無料アカウント登録が必要です。
1. https://github.com/ にアクセス
2. 画面右上の「Sign up」からアカウント作成

### 2. テンプレートのダウンロード
1. このページの「Code」ボタンをクリック
2. 「Download ZIP」を選択し、PCに保存
3. ZIPファイルを解凍

### 3. 編集方法
解凍したフォルダ内の `index.html` などをメモ帳やVSCodeなどのエディタで編集します。

### 4. 公開方法（GitHub Pagesを使う場合）
1. GitHubにログインし、右上の「+」→「New repository」で新しいリポジトリを作成
2. 作成したリポジトリにファイル一式をアップロード
3. 「Settings」→「Pages」→「Branch」を`main`に設定し保存
4. 数分後、表示されたURLでWebサイトが公開されます

---

# IRIAM Liver Site Template

IRIAMライバー向けの自己紹介・イベント・ブログ機能付きWebサイトテンプレートです。

## 構成
- HTML, CSS, JavaScriptのみで動作
- 各ページ共通ヘッダー・フッター
- HOME：自己紹介、画像、動画、X（Twitter）最新投稿埋め込み
- event：イベント順位・今後の予定
- blog：パスワード認証付き投稿・削除、アイコン・タイトル付きブログ

## 使い方
1. このリポジトリをクローンまたはダウンロード
2. `img/` フォルダにプロフィール画像や動画を配置
3. `index.html` で自己紹介や画像・動画を編集
4. `event.html` でイベント情報を編集
5. `blog.html` でブログ投稿（パスワード認証あり）
6. X（Twitter）埋め込みはアカウント名を変更
7. メール送信機能を使う場合はFormspreeの設定が必要

## ブログ機能
- 投稿・削除時にパスワード認証（`js/main.js` の `BLOG_PASSWORD` を編集）
- 投稿時にアイコン画像・タイトル・本文を入力可能
- 投稿はローカルストレージに保存


## メール送信機能（Formspree）
1. https://formspree.io/ にアクセスし、無料アカウントを作成
2. 新しいフォームを作成し、表示される「formspreeのフォームID（例：f/xxxxxxx）」をコピー
3. `js/main.js` の `footerHTML` 内、`action="https://formspree.io/f/xxxxxxxx"` の`xxxxxxxx`部分を自分のIDに変更
4. これでメールが安全に送信され、パスワードやAPIキーは誰にも見えません

## パスワード・カスタマイズ箇所
- ブログ投稿・削除のパスワードは `js/main.js` の `BLOG_PASSWORD` を編集してください
- メール送信先はFormspreeの管理画面で設定できます
- デザイン（色・レイアウト）は `css/style.css` で編集できます（例：`background`や`color`を変更）
- ヘッダー・フッターのリンクは `js/main.js` で編集できます

## ライセンス
MIT
