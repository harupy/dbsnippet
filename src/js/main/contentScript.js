(() => {
  // get snippets from storage and inject it using textarea
  const insertSnippets = snippets => {
    // insert the user snippets as a textarea
    const ta = document.createElement('textarea');
    ta.textContent = JSON.stringify(snippets);
    ta.id = 'user-snippets';
    ta.style = 'display: none';
    (document.head || document.documentElement).appendChild(ta);
  };

  const updateSnippets = changes => {
    // remove the old user-snippets textarea
    const oldTa = document.querySelector('textarea#user-snippets');
    if (oldTa) {
      oldTa.remove();
    }

    // "changes" looks like {"a": {"newValue": "b"}}
    const newSnippets = Object.entries(changes).reduce(
      (prev, [k, v]) => ({ ...prev, [k]: v['newValue'] }),
      {},
    );
    insertSnippets(newSnippets);
  };

  chrome.storage.sync.get(null, insertSnippets);
  chrome.storage.onChanged.addListener(updateSnippets);

  // it seems that CodeMirror object can be accessed with injected scripts.
  const main = document.createElement('script');
  main.src = chrome.extension.getURL('./dist/main.js');
  (document.head || document.documentElement).appendChild(main);
})();
