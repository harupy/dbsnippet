import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import { SnippetsContext } from '../contexts/snippets-context';

interface SelectSingleProps {
  index: number;
}

export const SelectSingle: React.FC<SelectSingleProps> = ({ index }) => {
  const { snippets, selectSnippet } = React.useContext(SnippetsContext);

  if (!snippets) {
    return null;
  }

  const { selected } = snippets[index];

  return (
    <Checkbox
      checked={selected}
      onChange={(e): void => selectSnippet?.(e.target.checked, index)}
    />
  );
};
