import * as React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import SnippetContext from '../contexts/snippets-context';
import useStyles from './button-styles';

const SaveButton: React.FC<{}> = () => {
  const { updated, saveSnippets } = React.useContext(SnippetContext);
  const classes = useStyles();

  return (
    <Button
      onClick={(): void => {
        saveSnippets?.();
      }}
      color={updated ? 'secondary' : 'default'}
    >
      <SaveIcon className={classes.icon} />
      SAVE
    </Button>
  );
};

export default SaveButton;
