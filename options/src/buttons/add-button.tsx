import * as React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import SnippetContext from '../contexts/snippets-context';

const AddButton: React.FC<{}> = () => {
  const { addSnippet } = React.useContext(SnippetContext);

  return (
    <Button onClick={(): void => addSnippet?.({ prefix: '', body: '' })}>
      <AddIcon style={{ marginRight: 3 }} />
      Add
    </Button>
  );
};

export default AddButton;
