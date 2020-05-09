import * as React from 'react';
import SnippetContext from '../contexts/snippets-context';

const SaveButton: React.FC<{}> = () => {
  const { snippets } = React.useContext(SnippetContext);

  const encodeSnippets = (): string => {
    return encodeURIComponent(
      JSON.stringify(
        snippets?.reduce(
          (prev, { prefix, body }) => ({ ...prev, [prefix]: body }),
          {},
        ),
      ),
    );
  };

  return (
    <a
      className="ui button"
      target="_blank"
      rel="noopener noreferrer"
      download="snippets.json"
      href={`data:application/json;charset=utf-8;,${encodeSnippets()}`}
    >
      <i className="download icon" />
      Export
    </a>
  );
};

export default SaveButton;
