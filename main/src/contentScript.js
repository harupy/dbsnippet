import { TEXTAREA_ID } from './constants';

(() => {
  // Get custom snippets from chrome storage and inject it as a textarea content
  const injectSnippets = snippets => {
    // insert the user snippets as a textarea
    const textarea = document.createElement('textarea');
    textarea.textContent = JSON.stringify(snippets);
    textarea.id = TEXTAREA_ID;
    textarea.style = 'display: none';
    (document.head || document.documentElement).appendChild(textarea);
  };

  const updateSnippets = changes => {
    // Remove the old textarea that contain the custom snippets
    const oldTextarea = document.querySelector(`textarea#${TEXTAREA_ID}`);
    if (oldTextarea) {
      oldTextarea.remove();
    }

    // `changes` looks like {a: {newValue: "b"}}
    const newSnippets = Object.entries(changes).reduce(
      (prev, [k, v]) => ({ ...prev, [k]: v.newValue }),
      {},
    );
    injectSnippets(newSnippets);
  };

  chrome.storage.sync.get(null, injectSnippets);
  chrome.storage.onChanged.addListener(updateSnippets);

  // Inject `main.js` to enable snippets.
  const main = document.createElement('script');
  main.src = chrome.extension.getURL('./main.js');
  (document.head || document.documentElement).appendChild(main);
})();
