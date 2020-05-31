import * as React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import SnippetContext from '../contexts/snippets-context';
import { useButtonStyles } from './button-styles';

export const SaveButton: React.FC<{}> = () => {
  const { updated, saveSnippets } = React.useContext(SnippetContext);
  const classes = useButtonStyles();

  return (
    <Button
      onClick={(): void => {
        if (saveSnippets) {
          saveSnippets();
        }
      }}
      color={updated ? 'secondary' : 'default'}
    >
      <SaveIcon className={classes.icon} />
      SAVE
    </Button>
  );
};
