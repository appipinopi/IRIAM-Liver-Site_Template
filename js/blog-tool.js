/**
 * コンテンツ生成ツールの機能をセットアップします。
 */
function setupBlogTool() {
  const form = document.getElementById('content-tool-form');
  const outputContainer = document.getElementById('output-container');
  const outputTextarea = document.getElementById('output-code');
  const copyButton = document.getElementById('copy-button');
  const modeSelector = document.getElementById('mode-selector');

  const formFields = {
    blog: document.getElementById('blog-form-fields'),
    event: document.getElementById('event-form-fields'),
  };

  if (!form || !outputContainer || !copyButton || !modeSelector) return;

  // --- イベントリスナー ---

  // モード切り替え
  modeSelector.addEventListener('change', () => {
    const selectedMode = modeSelector.value;
    for (const mode in formFields) {
      formFields[mode].style.display = mode === selectedMode ? 'block' : 'none';
    }
  });

  // フォーム送信（コード生成）
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedMode = modeSelector.value;
    let generatedCode = '';

    if (selectedMode === 'blog') {
      const icon = document.getElementById('blog-icon').value;
      const title = document.getElementById('blog-title').value;
      const date = document.getElementById('blog-date').value;
      const content = document.getElementById('blog-content').value.replace(/"/g, '\\"').replace(/\n/g, '<br>');

      generatedCode = `{
  icon: "${icon}",
  title: "${title}",
  date: "${date}",
  content: "${content}"
},`;
    } else if (selectedMode === 'event') {
      const name = document.getElementById('event-name').value;
      const rank = document.getElementById('event-rank').value;
      const reward = document.getElementById('event-reward').value;
      const comment = document.getElementById('event-comment').value.replace(/"/g, '\\"').replace(/\n/g, '<br>');

      generatedCode = `{
  name: "${name}",
  rank: "${rank}",
  reward: "${reward}",
  comment: "${comment}"
},`;
    }

    outputTextarea.value = generatedCode;
    outputContainer.style.display = 'block';
    copyButton.textContent = 'コピーする'; // ボタンのテキストをリセット
  });

  // コピーボタン
  copyButton.addEventListener('click', () => {
    outputTextarea.select();
    // navigator.clipboardが安全でないコンテキスト（httpなど）で使えない場合があるため、
    // document.execCommandをフォールバックとして使用します。
    try {
      const successful = document.execCommand('copy');
      copyButton.textContent = successful ? 'コピーしました！' : 'コピー失敗';
    } catch (err) {
      console.error('コピーに失敗しました: ', err);
      copyButton.textContent = 'コピー失敗';
    }
  });
}

/**
 * ページの読み込みが完了したら各機能を初期化する
 */
document.addEventListener('DOMContentLoaded', () => {
  setupBlogTool();
});