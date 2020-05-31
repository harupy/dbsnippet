import * as React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import SnippetContext from '../contexts/snippets-context';
import { useButtonStyles } from './button-styles';

export const AddButton: React.FC<{}> = () => {
  const { addSnippet } = React.useContext(SnippetContext);
  const classes = useButtonStyles();

  return (
    <Button
      onClick={(): void => {
        if (addSnippet) {
          addSnippet({ prefix: '', body: '', selected: false });
        }
      }}
    >
      <AddIcon className={classes.icon} />
      ADD
    </Button>
  );
};
