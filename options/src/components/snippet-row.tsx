import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

import { SnippetsContext } from '../contexts/snippets-context';
import { HighlightPlaceholders } from './highlight-placeholders';

type RowProps = {
  prefix: string;
  body: string;
  selected: boolean;
  index: number;
};

const useStyles = makeStyles({
  checkbox: {
    width: 10,
    paddingRight: 0,
    paddingLeft: 0,
  },

  table: {
    marginTop: 80,
  },
});

export const SnippetRow: React.FC<RowProps> = ({
  prefix,
  body,
  selected,
  index,
}) => {
  const { updateSnippet, selectSnippet } = React.useContext(SnippetsContext);
  const classes = useStyles();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    const { name, value } = e.target;

    if (updateSnippet) {
      updateSnippet(name, value, index);
    }
  };

  return (
    <TableRow>
      <TableCell className={classes.checkbox}>
        <Checkbox
          checked={selected}
          onChange={(e): void => selectSnippet?.(e.target.checked, index)}
        />
      </TableCell>

      {/* Input boxes */}
      {Object.entries({ prefix, body }).map(([key, value]) => (
        <TableCell key={`${index}-${key}`}>
          <TextField
            name={key}
            value={value}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </TableCell>
      ))}

      {/* Expanded snippet */}
      <TableCell>
        <HighlightPlaceholders body={body} backgroundColor="lightblue" />
      </TableCell>
    </TableRow>
  );
};
