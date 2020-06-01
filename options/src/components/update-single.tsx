import * as React from 'react';
import TextField from '@material-ui/core/TextField';

import { SnippetsContext } from '../contexts/snippets-context';

interface UpdateSingleProps {
  keyName: 'prefix' | 'body';
  index: number;
}

export const UpdateSingle: React.FC<UpdateSingleProps> = ({
  keyName,
  index,
}) => {
  const { snippets, updateSnippet } = React.useContext(SnippetsContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    const { value } = e.target;

    if (updateSnippet) {
      updateSnippet(keyName, value, index);
    }
  };

  if (!snippets) {
    return null;
  }

  return (
    <TextField
      name={keyName}
      value={snippets[index][keyName]}
      onChange={handleInputChange}
      variant="outlined"
      size="small"
      fullWidth
    />
  );
};
