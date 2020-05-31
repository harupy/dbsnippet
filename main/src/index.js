import { enableSnippets } from './enableSnippets';
import { defaultSnippets } from './defaultSnippets';
import { TEXTAREA_ID } from './constants';

(() => {
  const updateCell = () => {
    const activeCell = document.querySelector('div.is-editing div.CodeMirror');

    if (activeCell && activeCell.CodeMirror) {
      // Overwrite the default sippets with the custom snippets
      const userSnippets = JSON.parse(
        document.querySelector(`textarea#${TEXTAREA_ID}`).textContent,
      );
      const snippets = { ...defaultSnippets, ...userSnippets };
      const cm = activeCell.CodeMirror;

      if (!cm.snippets) {
        enableSnippets(cm);
      }

      // Attach the snippets to the cell so
      cm.snippets = snippets;
    }
  };

  document.addEventListener('mouseup', updateCell, false);
  document.addEventListener('keyup', updateCell, false);
})();
