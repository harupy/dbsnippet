import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import SnippetContext from './contexts/snippets-context';

const SelectAll: React.FC<{}> = () => {
  const { snippets, selectAll, deselectAll } = React.useContext(SnippetContext);

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

export default SelectAll;
