/**
 * 共通ヘッダーを挿入します。
 */
function setupHeader() {
  const headerHTML = `
    <nav>
      <a href="index.html">HOME</a>
      <a href="event.html">EVENT</a>
      <a href="blog.html">BLOG</a>
      <a href="badge-earners.html">BADGE</a>
      <a href="blog-tool.html">BLOG TOOL</a>
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

  // ↓↓↓ ご自身のFormspreeのエンドポイントURLに書き換えてください ↓↓↓
  const formspreeURL = "https://formspree.io/f/xandkgne";
  // ↓↓↓ ご自身のYouTubeとX(Twitter)のURLに書き換えてください ↓↓↓
  const youtubeURL = "https://www.youtube.com/@your_account";
  const xURL = "https://x.com/your_account";

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
  footerElement.innerHTML = footerHTML;

  // Formspree送信後のアラート
  const messageForm = document.getElementById('message-form');
  if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
      // デフォルトの送信を少し遅らせて、非同期送信が完了するのを待つ
      e.preventDefault();
      fetch(formspreeURL, {
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
async function setupBlog() {
  const ITEMS_PER_PAGE = 5;
  let currentPage = 1;

  const blogList = document.getElementById('blog-list');
  if (!blogList) return;
  const paginationContainer = document.getElementById('blog-pagination');
  if (!blogList || !paginationContainer) return;

  try {
    const response = await fetch('js/blog-posts.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blogs = await response.json();
    const allPosts = await response.json();

    blogList.innerHTML = blogs.map(post => `
    /* blogList.innerHTML = blogs.map(post => `
      <div class="blog-post">
        ${post.icon ? `<img src="${post.icon}" alt="icon" class="blog-icon">` : ''}
        <div class="blog-post-content">
          <h3>${post.title}</h3>
          <small>${post.date}</small>
          <p>${post.content}</p>
        </div>
      </div>`
    ).join('');
    */
    const renderBlog = (filterTag = '', page = 1) => {
      currentPage = page;
      paginationContainer.innerHTML = ''; // ページネーションをクリア

      const filteredBlogs = filterTag
        ? allPosts.filter(post => post.tags && post.tags.includes(filterTag))
        : allPosts;

      const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

      if (paginatedBlogs.length === 0) {
        blogList.innerHTML = '<p>表示する記事がありません。</p>';
        return;
      }

      blogList.innerHTML = paginatedBlogs.map(post => `
        <article class="blog-post">
          ${post.icon ? `<img src="${post.icon}" alt="icon" class="blog-icon">` : ''}
          <div class="blog-post-content">
            <h3>${post.title}</h3>
            <small>${post.date}</small>
            ${post.tags && post.tags.length > 0 ? `
              <div class="blog-tags">
                ${post.tags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join('')}
              </div>
            ` : ''}
            <p>${post.content}</p>
          </div>
        </article>`
      ).join('');

      // ページネーションを描画
      if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
          const pageButton = document.createElement('button');
          pageButton.textContent = i;
          if (i === currentPage) {
            pageButton.classList.add('active');
          }
          pageButton.addEventListener('click', () => {
            const activeTag = document.querySelector('.blog-tags .tag.active');
            renderBlog(activeTag ? activeTag.dataset.tag : '', i);
          });
          paginationContainer.appendChild(pageButton);
        }
      }

      // タグにクリックイベントを設定
      document.querySelectorAll('.blog-tags .tag').forEach(tagElement => {
        tagElement.addEventListener('click', (e) => {
          const clickedTag = e.target.dataset.tag;
          // クリックされたタグをアクティブにする
          document.querySelectorAll('#blog-list .tag').forEach(el => {
            el.classList.toggle('active', el.dataset.tag === clickedTag && !el.classList.contains('active'));
          });
          // activeなタグがあればそれで絞り込み、なければ全表示
          const activeTag = document.querySelector('#blog-list .tag.active');
          renderBlog(activeTag ? activeTag.dataset.tag : '');
        });
      });
    };

    renderBlog(); // 初期表示
  } catch (error) {
    console.error("ブログ記事の読み込みに失敗しました:", error);
    blogList.innerHTML = "<p>ブログ記事の読み込みに失敗しました。管理者にお問い合わせください。</p>";
  }
}

/**
 * イベントを `js/events.json` から読み込んで表示し、検索機能を提供します。
 */
async function setupEvents() {
  const ITEMS_PER_PAGE = 5;
  let currentPage = 1;

  const eventList = document.getElementById('event-list');
  const searchInput = document.getElementById('event-search-input');
  const paginationContainer = document.getElementById('event-pagination');
  if (!eventList || !searchInput || !paginationContainer) return;

  try {
    const response = await fetch('js/events.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const allEvents = await response.json();

    const renderEvents = (filter = '', filterTag = '', page = 1) => {
      currentPage = page;
      paginationContainer.innerHTML = ''; // ページネーションをクリア
      let filteredEvents = allEvents;

      // タグで絞り込み
      if (filterTag) {
        // TODO: タグの active class の管理
        filteredEvents = filteredEvents.filter(event => event.tags && event.tags.includes(filterTag));
      }

      // 検索ボックスのテキストで絞り込み
      if (filter) {
        filteredEvents = filteredEvents.filter(event =>
          event.title.includes(filter) || event.description.includes(filter)
        );
      }

      filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date)); // 日付の降順でソート

      const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

      if (paginatedEvents.length === 0) {
        eventList.innerHTML = '<p>表示するイベントがありません。</p>';
        return;
      }
      eventList.innerHTML = paginatedEvents.map(event => `
        <div class="event-item">
          <h3>${event.title}</h3>
          <small>${event.date}</small>
          ${event.tags && event.tags.length > 0 ? `
            <div class="event-tags">
              ${event.tags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join('')}
            </div>
          ` : ''}
          <p>${event.description}</p>
        </div>
      `).join('');

      // ページネーションを描画
      if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
          const pageButton = document.createElement('button');
          pageButton.textContent = i;
          if (i === currentPage) {
            pageButton.classList.add('active');
          }
          pageButton.addEventListener('click', () => {
            // TODO: タグの active 状態を維持する
            renderEvents(searchInput.value, '', i);
          });
          paginationContainer.appendChild(pageButton);
        }
      }

      // タグにクリックイベントを設定
      document.querySelectorAll('#event-list .tag').forEach(tagElement => {
        tagElement.addEventListener('click', (e) => {
          const clickedTag = e.target.dataset.tag;
          renderEvents(searchInput.value, clickedTag, 1); // タグクリック時は1ページ目から表示
        });
      });
    };

    renderEvents(); // 初期表示
    searchInput.addEventListener('input', (e) => renderEvents(e.target.value, '', 1)); // 検索時はタグフィルターをリセットし1ページ目から

  } catch (error) {
    console.error("イベントの読み込みに失敗しました:", error);
    eventList.innerHTML = "<p>イベントの読み込みに失敗しました。管理者にお問い合わせください。</p>";
  }
}

/**
 * バッジ獲得者を `js/badge-earners.json` から読み込んで表示し、検索機能を提供します。
 */
async function setupBadgeEarners() {
  const earnersList = document.getElementById('earners-list');
  const searchInput = document.getElementById('earner-search-input');
  if (!earnersList || !searchInput) return;

  try {
    const response = await fetch('js/badge-earners.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const earners = await response.json();

    const renderEarners = (filter = '') => {
      const lowerCaseFilter = filter.toLowerCase();
      const filteredEarners = earners.filter(earner =>
        earner.name.toLowerCase().includes(lowerCaseFilter) || earner.badge.toLowerCase().includes(lowerCaseFilter)
      ).sort((a, b) => new Date(b.date) - new Date(a.date)); // 日付の降順でソート
      earnersList.innerHTML = filteredEarners.map(earner => `
        <div class="earner-item">
          ${earner.icon ? `<img src="${earner.icon}" alt="icon" class="earner-icon">` : ''}
          <div class="earner-info">
            <h4>${earner.name}</h4>
            <p>獲得バッジ: ${earner.badge} (${earner.date})</p>
          </div>
        </div>
      `).join('');
    };

    renderEarners(); // 初期表示
    searchInput.addEventListener('input', (e) => renderEarners(e.target.value));

  } catch (error) {
    console.error("バッジ獲得者の読み込みに失敗しました:", error);
    earnersList.innerHTML = "<p>バッジ獲得者の読み込みに失敗しました。管理者にお問い合わせください。</p>";
  }
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

  // Twitterのウィジェットスクリプトが既に読み込まれていないか確認
  if (!window.twttr) {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://platform.twitter.com/widgets.js";
    script.charset = "utf-8";
    document.body.appendChild(script);
  }
}

/**
 * ページの読み込みが完了したら各機能を初期化する
 */
document.addEventListener('DOMContentLoaded', () => {
  setupHeader();
  setupFooter();
  setupBlog();
  setupEvents();
  setupBadgeEarners();
  setupXTimeline();
});