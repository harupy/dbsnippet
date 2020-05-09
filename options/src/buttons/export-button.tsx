import * as React from 'react';
import Button from '@material-ui/core/Button';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

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
    <Button
      target="_blank"
      rel="noopener noreferrer"
      download="snippets.json"
      href={`data:application/json;charset=utf-8;,${encodeSnippets()}`}
    >
      <VerticalAlignBottomIcon style={{ marginRight: 3 }} />
      Export
    </Button>
  );
};

export default SaveButton;
