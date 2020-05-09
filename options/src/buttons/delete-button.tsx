import * as React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import SnippetContext from '../contexts/snippets-context';
import useStyles from './button-styles';

const DeleteButton: React.FC<{}> = () => {
  const { deleteSelected, snippets } = React.useContext(SnippetContext);
  const classes = useStyles();

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

export default DeleteButton;
