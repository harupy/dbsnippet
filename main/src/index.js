import enableSnippets from './enableSnippets';
import defaultSnippets from './defaultSnippets';

(() => {
  const updateCell = () => {
    const activeCell = document.querySelector('div.is-editing div.CodeMirror');

    if (activeCell && activeCell.CodeMirror) {
      // override default sippets with the user snippets
      const userSnippets = JSON.parse(document.querySelector('textarea#user-snippets').textContent);
      const snippets = { ...defaultSnippets, ...userSnippets };
      const cm = activeCell.CodeMirror;

      if (!cm.snippets) {
        enableSnippets(cm);
      }

      cm.snippets = snippets;
    }
  };

  document.addEventListener('mouseup', updateCell, false);
  document.addEventListener('keyup', updateCell, false);
})();
