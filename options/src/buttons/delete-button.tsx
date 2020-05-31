import * as React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import { SnippetsContext } from '../contexts/snippets-context';
import { useButtonStyles } from './button-styles';

export const DeleteButton: React.FC<{}> = () => {
  const { deleteSelected, snippets } = React.useContext(SnippetsContext);
  const classes = useButtonStyles();

  const disabled = snippets?.every(({ selected }) => !selected);

  return (
    <Button
      disabled={disabled}
      color={disabled ? 'default' : 'secondary'}
      onClick={(): void => deleteSelected?.()}
    >
      <DeleteIcon
        color={disabled ? 'disabled' : 'secondary'}
        className={classes.icon}
      />
      DELETE
    </Button>
  );
};
