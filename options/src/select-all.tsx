import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import { SnippetsContext } from './contexts/snippets-context';

export const SelectAll: React.FC<{}> = () => {
  const { snippets, selectAll, deselectAll } = React.useContext(
    SnippetsContext,
  );

  const numSelected = snippets?.filter(({ selected }) => selected).length || 0;
  const allSelected = numSelected > 0 && numSelected === snippets?.length;
  const indeterminate = numSelected > 0 && !allSelected;
  const handleChange = allSelected ? deselectAll : selectAll;

  return (
    <Checkbox
      checked={allSelected}
      indeterminate={indeterminate}
      onChange={(): void => handleChange?.()}
    />
  );
};
