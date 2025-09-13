// 共通ヘッダー
const headerHTML = `
  <nav>
    <a href="index.html">HOME</a>
    <a href="event.html">EVENT</a>
    <a href="blog.html">BLOG</a>
  </nav>
`;
document.getElementById('header').innerHTML = headerHTML;

// 共通フッター
const footerHTML = `
  <form id="message-form">
    <input type="text" id="message-input" placeholder="応援メッセージ・依頼内容" required>
    <input type="email" id="email-input" placeholder="メールアドレス" required>
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

// メール送信（ダミー処理）
document.getElementById('message-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('メッセージを送信しました！（ダミー）');
  this.reset();
});

// ブログ投稿機能（ローカルストレージ保存）
if (document.getElementById('blog-form')) {
  const blogForm = document.getElementById('blog-form');
  const blogList = document.getElementById('blog-list');
  function renderBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    blogList.innerHTML = blogs.map(b => `<div class="blog-post"><h3>${b.title}</h3><p>${b.content}</p><small>${b.date}</small></div>`).join('');
  }
  blogForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    const date = new Date().toLocaleString();
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    blogs.unshift({ title, content, date });
    localStorage.setItem('blogs', JSON.stringify(blogs));
    renderBlogs();
    blogForm.reset();
  });
  renderBlogs();
}

// X（Twitter）最新投稿埋め込み（HOMEのみ）
if (document.getElementById('x-timeline')) {
  document.getElementById('x-timeline').innerHTML = `
    <a class="twitter-timeline" data-height="400" href="https://x.com/your_x_account">Tweets by your_x_account</a>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  `;
}
