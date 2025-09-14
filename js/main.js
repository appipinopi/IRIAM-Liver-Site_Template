/**
 * サイト全体の設定
 * ご自身の情報に合わせて、以下の値を書き換えてください。
 */
const siteConfig = {
  formspreeURL: "https://formspree.io/f/xandkgne", // FormspreeのエンドポイントURL
  youtubeURL: "https://www.youtube.com/@your_account", // YouTubeチャンネルのURL
  xURL: "https://x.com/your_account", // X(旧Twitter)のプロフィールURL
  xAccount: "appipinopi", // XアカウントのID (@は不要)
};

/**
 * ブログ記事のデータ
 * ここに記事を追加・編集してください。
 * icon: 表示したい画像のパス (例: 'img/icon1.png')。不要な場合は '' または削除。
 * title: 記事のタイトル
 * date: 日付
 * content: 記事の本文。HTMLタグも使えます (例: <br> で改行)。
 */
const blogPosts = [
  {
    icon: "img/IRIAM-Liver-Site_Template-icon.png",
    title: "テンプレートへようこそ！",
    date: "2024-01-01",
    content: "これはブログ記事のサンプルです。js/main.js ファイルを編集して、ご自身の記事を追加してください。<br>HTMLタグを使って、このように<a href='https://github.com/appipinopi/IRIAM-Liver-Site_Template' target='_blank'>リンク</a>を貼ることもできます。"
  },
  // 他の記事を追加する場合は、この下に同じ形式で追加します。
  // { icon: "...", title: "...", date: "...", content: "..." },
];

/**
 * イベント履歴のデータ
 * ここにイベントの履歴を追加・編集してください。
 * name: イベント名
 * rank: 順位 (例: "1位", "B1-B3 1位")
 * reward: 報酬 (不要な場合は '')
 * comment: 一言コメント (不要な場合は '')
 */
const eventData = [
  {
    name: "新人ライバーの進撃",
    rank: "1位",
    reward: "オリジナル背景",
    comment: "たくさんの応援ありがとうございました！"
  },
  // 他のイベントを追加する場合は、この下に同じ形式で追加します。
];

/**
 * サイトのデザイン設定
 * ここの値を変更すると、サイト全体の色やフォントが変わります。
 * Google Fontsを使いたい場合は、fontFamilyにフォント名、googleFontURLにURLを指定してください。
 */
const designConfig = {
  // 基本のフォント設定
  fontFamily: "'Helvetica Neue', Arial, sans-serif", // フォントファミリー
  googleFontURL: "", // Google FontsのURL (例: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap")

  // ライトモードの色設定
  light: {
    '--bg-color': '#f4f7f6',
    '--text-color': '#333',
    '--card-bg-color': '#fff',
    '--header-bg-color': '#fff',
    '--header-text-color': '#555',
    '--footer-bg-color': '#87CEEB',
    '--footer-text-color': '#fff',
    '--primary-color': '#007bff',
    '--border-color': '#e0e0e0',
    '--shadow-color': 'rgba(0, 0, 0, 0.08)',
  },
  // ダークモードの色設定
  dark: {
    '--bg-color': '#121212',
    '--text-color': '#e0e0e0',
    '--card-bg-color': '#1e1e1e',
    '--header-bg-color': '#1e1e1e',
    '--primary-color': '#3498db',
    '--border-color': '#333',
    '--shadow-color': 'rgba(0, 0, 0, 0.2)',
  }
};

/**
 * 共通ヘッダーを挿入します。
 */
function setupHeader() {
  const headerHTML = `
    <nav>
      <a href="index.html">HOME</a>
      <a href="event.html">EVENT</a>
      <a href="blog.html">BLOG</a>
      <a href="blog-tool.html">BLOG TOOL</a>
      <div class="theme-switch-wrapper">
        <label class="theme-switch" for="checkbox">
          <input type="checkbox" id="checkbox" />
          <div class="slider"></div>
        </label>
      </div>
    </nav>
  `;
  const headerElement = document.getElementById('header');
  if (headerElement) {
    headerElement.innerHTML = headerHTML;
  }
}

/**
 * 共通フッターを挿入します。
 */
function setupFooter() {
  const footerElement = document.getElementById('footer');
  if (!footerElement) return;

  const footerHTML = `
    <form id="message-form" action="${siteConfig.formspreeURL}" method="POST">
      <input type="text" name="message" id="message-input" placeholder="応援メッセージ・依頼内容" required>
      <input type="email" name="email" id="email-input" placeholder="メールアドレス" required>
      <button type="submit">送信</button>
    </form>
    <div class="footer-links">
      // ↓↓↓コード書き換えないでください↓↓↓
      <a href="https://github.com/appipinopi/IRIAM-Liver-Site_Template" target="_blank">ソースコード</a>
      // ↑↑↑コード書き換えないでください↑↑↑
      <a href="https://web.iriam.com/" target="_blank">IRIAM</a> |
      <a href="${siteConfig.youtubeURL}" target="_blank">YouTube</a> |
      <a href="${siteConfig.xURL}" target="_blank">X</a>
    </div>
  `;
  footerElement.innerHTML = footerHTML;

  // Formspree送信後のアラート
  const messageForm = document.getElementById('message-form');
  if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
      // デフォルトの送信を少し遅らせて、非同期送信が完了するのを待つ
      e.preventDefault();
      fetch(siteConfig.formspreeURL, {
          method: 'POST',
          body: new FormData(messageForm),
          headers: {
              'Accept': 'application/json'
          }
      }).then(response => {
          if (response.ok) {
              alert('メッセージを送信しました！');
              messageForm.reset();
          } else {
              alert('メッセージの送信に失敗しました。');
          }
      }).catch(error => {
          alert('メッセージの送信中にエラーが発生しました。');
      });
    });
  }
}

/**
 * ブログ記事を `blog-posts.json` から読み込んで表示します。
 */
function setupBlog() {
  const blogList = document.getElementById('blog-list');
  if (!blogList) return;

  if (blogPosts.length === 0) {
    blogList.innerHTML = "<p>まだ記事がありません。</p>";
    return;
  }

  blogList.innerHTML = blogPosts.map(post => `
      <div class="blog-post">
        ${post.icon ? `<img src="${post.icon}" alt="icon" class="blog-icon">` : ''}
        <div class="blog-post-content">
          <h3>${post.title}</h3>
          <small>${post.date}</small>
          <p>${post.content}</p>
        </div>
      </div>`
  ).join('');
}

/**
 * イベント履歴をデータから読み込んで表示します。
 */
function setupEvents() {
  const eventList = document.getElementById('event-list');
  if (!eventList) return;

  if (eventData.length === 0) {
    eventList.innerHTML = "<p>まだイベント履歴がありません。</p>";
    return;
  }

  eventList.innerHTML = eventData.map(event => `
    <div class="event-item">
      <h3>${event.name}</h3>
      <ul>
        <li><strong>結果:</strong> ${event.rank}</li>
        ${event.reward ? `<li><strong>特典:</strong> ${event.reward}</li>` : ''}
        ${event.comment ? `<li><strong>コメント:</strong> ${event.comment}</li>` : ''}
      </ul>
    </div>
  `).join('');
}

/**
 * X (旧Twitter) のタイムラインを埋め込みます。
 */
function setupXTimeline() {
  const timelineContainer = document.getElementById('x-timeline');
  if (!timelineContainer) return;

  timelineContainer.innerHTML = `<a class="twitter-timeline" data-height="400" href="https://x.com/${siteConfig.xAccount}">Tweets by ${siteConfig.xAccount}</a>`;

  // Twitterのウィジェットスクリプトが既に読み込まれていないか確認
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load(timelineContainer);
  } else if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://platform.twitter.com/widgets.js";
    script.charset = "utf-8";
    document.body.appendChild(script);
    // スクリプト読み込み後にタイムラインを初期化
    script.onload = () => window.twttr.widgets.load(timelineContainer);
  }
}

/**
 * designConfigに基づいてサイトのデザイン（色とフォント）を適用します。
 */
function applyDesignConfig() {
  // Google Fontsの読み込み
  if (designConfig.googleFontURL) {
    const link = document.createElement('link');
    link.href = designConfig.googleFontURL;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  // フォントファミリーの適用
  document.documentElement.style.setProperty('--font-family', designConfig.fontFamily);

  // 現在のテーマ（ライト/ダーク）を取得
  const currentTheme = localStorage.getItem('theme') || 'light';
  const themeColors = designConfig[currentTheme] || designConfig.light;

  // 色の適用
  for (const [key, value] of Object.entries(themeColors)) {
    document.documentElement.style.setProperty(key, value);
  }
}

/**
 * テーマ（ライト/ダークモード）の切り替え機能をセットアップします。
 */
function setupThemeSwitcher() {
  const themeSwitch = document.getElementById('checkbox');
  if (!themeSwitch) return;
  
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeSwitch.checked = theme === 'dark';
    // テーマ変更時に色を再適用
    const themeColors = designConfig[theme] || designConfig.light;
    for (const [key, value] of Object.entries(themeColors)) {
      document.documentElement.style.setProperty(key, value);
    }
  };

  // ページの読み込み時に保存されたテーマを適用
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme) {
    setTheme(currentTheme);
  }

  themeSwitch.addEventListener('change', (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  });
}

/**
 * ページの読み込みが完了したら各機能を初期化する
 */
document.addEventListener('DOMContentLoaded', () => {
  applyDesignConfig(); // ★最初にデザインを適用
  setupHeader();
  setupFooter();
  setupBlog();
  setupEvents();
  setupXTimeline();
  setupThemeSwitcher();
});

/**
 * ページの全リソースが読み込まれたらローディング画面を非表示にする
 */
window.onload = function() {
  const loader = document.getElementById('loader-bg');
  if (loader) loader.style.display = 'none';
};