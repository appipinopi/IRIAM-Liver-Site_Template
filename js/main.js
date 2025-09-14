// 共通ヘッダー
const headerHTML = `
  <nav>
    <a href="index.html">HOME</a>
    <a href="event.html">EVENT</a>
    <a href="blog.html">BLOG</a>
  </nav>
`;
document.getElementById('header').innerHTML = headerHTML;
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
    </nav>
  `;
  const headerElement = document.getElementById('header');
  if (headerElement) {
    headerElement.innerHTML = headerHTML;
  }
}

// 共通フッター（Formspree対応）
const footerHTML = `
  <form id="message-form" action="https://formspree.io/f/xxxxxxxx" method="POST">
    <input type="text" name="message" id="message-input" placeholder="応援メッセージ・依頼内容" required>
    <input type="email" name="email" id="email-input" placeholder="メールアドレス" required>
    <button type="submit">送信</button>
  </form>
  <div class="footer-links">
    <a href="https://github.com/appipinopi/IRIAM-Liver-Site_Template" target="_blank">ソースコード</a> |
    <a href="https://web.iriam.com/" target="_blank">IRIAM</a> |
    <a href="https://www.youtube.com/" target="_blank">YouTube</a> |
    <a href="https://x.com/" target="_blank">X</a>
  </div>
`;
document.getElementById('footer').innerHTML = footerHTML;
/**
 * 共通フッターを挿入します。
 */
function setupFooter() {
  // ↓↓↓ ご自身のFormspreeのエンドポイントURLに書き換えてください ↓↓↓
  const formspreeURL = "https://formspree.io/f/xandkgne";
  // ↓↓↓ ご自身のYouTubeとX(Twitter)のURLに書き換えてください ↓↓↓
  const youtubeURL = "https://www.youtube.com/@appipinopi";
  const xURL = "https://x.com/appipinopi";

// メール送信後のアラート（Formspree用）
if (document.getElementById('message-form')) {
  document.getElementById('message-form').addEventListener('submit', function(e) {
    setTimeout(() => {
      alert('メッセージを送信しました！');
    }, 500);
  });
  const footerHTML = `
    <form id="message-form" action="${formspreeURL}" method="POST">
      <input type="text" name="message" id="message-input" placeholder="応援メッセージ・依頼内容" required>
      <input type="email" name="email" id="email-input" placeholder="メールアドレス" required>
      <button type="submit">送信</button>
    </form>
    <div class="footer-links">
      <a href="https://github.com/appipinopi/IRIAM-Liver-Site_Template" target="_blank">ソースコード</a> |
      <a href="https://web.iriam.com/" target="_blank">IRIAM</a> |
      <a href="${youtubeURL}" target="_blank">YouTube</a> |
      <a href="${xURL}" target="_blank">X</a>
    </div>
  `;
  const footerElement = document.getElementById('footer');
  if (footerElement) {
    footerElement.innerHTML = footerHTML;
  }

  // Formspree送信後のアラート
  const messageForm = document.getElementById('message-form');
  if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
      setTimeout(() => {
        alert('メッセージを送信しました！');
      }, 500);
    });
  }
}

// ブログ投稿機能（ローカルストレージ保存）
if (document.getElementById('blog-form')) {
  const blogForm = document.getElementById('blog-form');
/**
 * ブログ記事を `blog-posts.json` から読み込んで表示します。
 */
async function setupBlog() {
  const blogList = document.getElementById('blog-list');
  const BLOG_PASSWORD = 'liverpass'; // ここを好きなパスワードに変更可
  function renderBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    blogList.innerHTML = blogs.map((b, i) =>
  if (!blogList) return;

  try {
    const response = await fetch('js/blog-posts.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blogs = await response.json();

    blogList.innerHTML = blogs.map(post => `
      `<div class="blog-post">
        ${b.icon ? `<img src="${b.icon}" alt="icon" class="blog-icon" style="width:48px;height:48px;border-radius:50%;vertical-align:middle;">` : ''}
        <h3 style="display:inline-block;margin-left:0.5em;vertical-align:middle;">${b.title}</h3>
        <p>${b.content}</p>
        <small>${b.date}</small><br>
        <button onclick="deleteBlog(${i})">削除</button>
        ${post.icon ? `<img src="${post.icon}" alt="icon" class="blog-icon">` : ''}
        <div class="blog-post-content">
          <h3>${post.title}</h3>
          <p>${post.content.replace(/\\n/g, '<br>')}</p>
          <small>${new Date(post.date).toLocaleString()}</small>
        </div>
      </div>`
    ).join('');
  } catch (error) {
    console.error("ブログ記事の読み込みに失敗しました:", error);
    blogList.innerHTML = "<p>ブログ記事の読み込みに失敗しました。管理者にお問い合わせください。</p>";
  }
  window.deleteBlog = function(index) {
    const pw = prompt('削除パスワードを入力してください');
    if (pw === BLOG_PASSWORD) {
      const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      blogs.splice(index, 1);
      localStorage.setItem('blogs', JSON.stringify(blogs));
      renderBlogs();
    } else {
      alert('パスワードが違います');
    }
  };
  blogForm.addEventListener('submit', function(e) {
}

/**
 * X (旧Twitter) のタイムラインを埋め込みます。
 */
function setupXTimeline() {
  const timelineContainer = document.getElementById('x-timeline');
  if (!timelineContainer) return;

  // ↓↓↓ ご自身のXアカウントIDに置き換えてください（@は不要） ↓↓↓
  const xAccount = "appipinopi";

  timelineContainer.innerHTML = `<a class="twitter-timeline" data-height="400" href="https://x.com/${xAccount}">Tweets by ${xAccount}</a>`;

  const script = document.createElement('script');
  script.async = true;
  script.src = "https://platform.twitter.com/widgets.js";
  script.charset = "utf-8";
  document.body.appendChild(script);
}

/**
 * ブログ作成ツールページの機能をセットアップします。
 */
function setupBlogTool() {
  const form = document.getElementById('blog-creator-form');
  if (!form) return;

  const outputContainer = document.getElementById('json-output-container');
  const outputTextarea = document.getElementById('json-output');
  const copyButton = document.getElementById('copy-json-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    const pw = document.getElementById('blog-password').value;
    const iconInput = document.getElementById('blog-icon');
    if (pw !== BLOG_PASSWORD) {
      alert('パスワードが違います');
      return;
    }
    const date = new Date().toLocaleString();
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    if (iconInput.files && iconInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        blogs.unshift({ title, content, date, icon: ev.target.result });
        localStorage.setItem('blogs', JSON.stringify(blogs));
        renderBlogs();
        blogForm.reset();
      };
      reader.readAsDataURL(iconInput.files[0]);
    } else {
      blogs.unshift({ title, content, date, icon: '' });
      localStorage.setItem('blogs', JSON.stringify(blogs));
      renderBlogs();
      blogForm.reset();
    }

    const title = document.getElementById('creator-title').value;
    const icon = document.getElementById('creator-icon').value;
    const content = document.getElementById('creator-content').value;

    const postData = {
      icon: icon,
      title: title,
      content: content.replace(/\n/g, '\\n'), // 本文の改行をJSONで扱えるように変換
      date: new Date().toISOString()
    };

    const jsonString = JSON.stringify(postData, null, 2);
    outputTextarea.value = jsonString + ',';

    outputContainer.style.display = 'block';
  });
  renderBlogs();

  copyButton.addEventListener('click', () => {
    outputTextarea.select();
    document.execCommand('copy');
    alert('コピーしました！');
  });
}

// X（Twitter）最新投稿埋め込み（HOMEのみ）
if (document.getElementById('x-timeline')) {
  document.getElementById('x-timeline').innerHTML = `
    <a class="twitter-timeline" data-height="400" href="https://x.com/your_x_account">Tweets by your_x_account</a>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  `;
}
// ページの読み込みが完了したら各機能を初期化する
document.addEventListener('DOMContentLoaded', () => {
  setupHeader();
  setupFooter();
  setupBlog();
  setupXTimeline();
  setupBlogTool();
});
