import * as React from 'react';
import SnippetContext from '../contexts/snippets-context';

const SaveButton: React.FC<{}> = () => {
  const { updated, saveSnippets } = React.useContext(SnippetContext);

  return (
    <button
      type="button"
      className={`ui button ${updated ? 'positive' : ''}`}
      onClick={(): void => {
        saveSnippets?.();
      }}
    >
      <i className="save icon" />
      Save
    </button>
  );
};

export default SaveButton;
