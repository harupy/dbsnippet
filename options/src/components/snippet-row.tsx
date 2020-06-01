import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

import { SnippetsContext } from '../contexts/snippets-context';
import { HighlightPlaceholders } from './highlight-placeholders';
import { SelectSingle } from './select-single';

interface RowProps {
  prefix: string;
  body: string;
  index: number;
}

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

export const SnippetRow: React.FC<RowProps> = ({ prefix, body, index }) => {
  const { updateSnippet } = React.useContext(SnippetsContext);
  const classes = useStyles();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    const { name, value } = e.target;

    if (updateSnippet) {
      updateSnippet(name, value, index);
    }
  };

  const renderInputBoxes = (): JSX.Element[] =>
    Object.entries({ prefix, body }).map(([key, value]) => (
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
    ));

  return (
    <TableRow>
      <TableCell className={classes.checkbox}>
        <SelectSingle index={index} />
      </TableCell>

      {renderInputBoxes()}

      {/* Expanded snippet */}
      <TableCell>
        <HighlightPlaceholders body={body} backgroundColor="lightblue" />
      </TableCell>
    </TableRow>
  );
};
