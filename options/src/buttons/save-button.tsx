import * as React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import SnippetContext from '../contexts/snippets-context';

const SaveButton: React.FC<{}> = () => {
  const { updated, saveSnippets } = React.useContext(SnippetContext);

  return (
    <Button
      onClick={(): void => {
        saveSnippets?.();
      }}
      color={updated ? 'secondary' : 'default'}
    >
      <SaveIcon style={{ marginRight: 3 }} />
      Save
    </Button>
  );
};

export default SaveButton;
