import * as React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import { SnippetsContext } from '../contexts/snippets-context';
import { useButtonStyles } from './button-styles';

export const SaveButton: React.FC<{}> = () => {
  const { updated, saveSnippets } = React.useContext(SnippetsContext);
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
