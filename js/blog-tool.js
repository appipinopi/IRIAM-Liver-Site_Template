/**
 * ブログ記事生成ツールの機能をセットアップします。
 */
function setupBlogTool() {
  const form = document.getElementById('blog-tool-form');
  const output = document.getElementById('output-code');
  const copyButton = document.getElementById('copy-button');

  if (!form || !output || !copyButton) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const icon = formData.get('icon');
    const title = formData.get('title');
    const date = formData.get('date');
    // content内の改行を <br> タグに変換
    const content = formData.get('content').replace(/\n/g, '<br>');

    const generatedCode = `
  {
    icon: "${icon}",
    title: "${title}",
    date: "${date}",
    content: "${content}"
  },
`;

    output.value = generatedCode.trim();
    copyButton.disabled = false;
    copyButton.textContent = 'コピーする';
  });

  copyButton.addEventListener('click', () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(output.value).then(() => {
        copyButton.textContent = 'コピーしました！';
      }).catch(err => {
        console.error('コピーに失敗しました: ', err);
        copyButton.textContent = 'コピー失敗';
      });
    }
  });
}

/**
 * ページの読み込みが完了したら各機能を初期化する
 */
document.addEventListener('DOMContentLoaded', () => {
  setupBlogTool();
});