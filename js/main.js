// 共通ヘッダー
const headerHTML = `
  <nav>
    <a href="index.html">HOME</a>
    <a href="event.html">EVENT</a>
    <a href="blog.html">BLOG</a>
  </nav>
`;
document.getElementById('header').innerHTML = headerHTML;

// 共通フッター（Formspree対応）
const footerHTML = `
  <form id="message-form" action="https://formspree.io/f/xxxxxxxx" method="POST">
  <form id="message-form" action="https://formspree.io/f/xandkgne" method="POST">
    <input type="text" name="message" id="message-input" placeholder="応援メッセージ・依頼内容" required>
    <input type="email" name="email" id="email-input" placeholder="メールアドレス" required>
    <button type="submit">送信</button>
  </form>
  <div class="footer-links">
    <a href="https://github.com/appipinopi/IRIAM-Liver-Site_Template" target="_blank">ソースコード</a> |
    <a href="https://web.iriam.com/" target="_blank">IRIAM</a> |
    <a href="https://www.youtube.com/" target="_blank">YouTube</a> |
    <a href="https://x.com/" target="_blank">X</a>
    <a href="https://www.youtube.com/@appipinopi" target="_blank">YouTube</a> |
    <a href="https://x.com/@appipinopi" target="_blank">X</a>
  </div>
`;
document.getElementById('footer').innerHTML = footerHTML;

// メール送信後のアラート（Formspree用）
if (document.getElementById('message-form')) {
  document.getElementById('message-form').addEventListener('submit', function(e) {
    setTimeout(() => {
      alert('メッセージを送信しました！');
    }, 500);
  });
}

// ブログ投稿機能（ローカルストレージ保存）
if (document.getElementById('blog-form')) {
  const blogForm = document.getElementById('blog-form');
  const blogList = document.getElementById('blog-list');
  const BLOG_PASSWORD = 'liverpass'; // ここを好きなパスワードに変更可
  function renderBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    blogList.innerHTML = blogs.map((b, i) =>
      `<div class="blog-post">
        ${b.icon ? `<img src="${b.icon}" alt="icon" class="blog-icon" style="width:48px;height:48px;border-radius:50%;vertical-align:middle;">` : ''}
        <h3 style="display:inline-block;margin-left:0.5em;vertical-align:middle;">${b.title}</h3>
        <p>${b.content}</p>
        <small>${b.date}</small><br>
        <button onclick="deleteBlog(${i})">削除</button>
      </div>`
    ).join('');
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
