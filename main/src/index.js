import { enableSnippets } from './enableSnippets';
import { defaultSnippets } from './defaultSnippets';
import { TEXTAREA_ID } from './constants';

(() => {
  const updateCell = () => {
    const activeCell = document.querySelector('div.is-editing div.CodeMirror');

    if (activeCell && activeCell.CodeMirror) {
      const customSnippets = JSON.parse(
        document.querySelector(`textarea#${TEXTAREA_ID}`).textContent,
      );

      // Override the default sippets with the custom snippets
      const snippets = { ...defaultSnippets, ...customSnippets };
      const cm = activeCell.CodeMirror;

      if (!cm.snippets) {
        cm.snippets = snippets;
        enableSnippets(cm);
      }
    }
  };

  document.addEventListener('mouseup', updateCell, false);
  document.addEventListener('keyup', updateCell, false);
})();
