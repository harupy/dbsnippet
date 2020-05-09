import * as React from 'react';
import SnippetContext from '../contexts/snippets-context';

const AddButton: React.FC<{}> = () => {
  const { addSnippet } = React.useContext(SnippetContext);

  return (
    <button
      type="button"
      className="ui button"
      onClick={(): void => addSnippet?.({ prefix: '', body: '' })}
    >
      <i className="plus square icon" />
      Add
    </button>
  );
};

export default AddButton;
