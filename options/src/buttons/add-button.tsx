import * as React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import SnippetContext from '../contexts/snippets-context';
import useStyles from './button-styles';

const AddButton: React.FC<{}> = () => {
  const { addSnippet } = React.useContext(SnippetContext);
  const classes = useStyles();

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

export default AddButton;
