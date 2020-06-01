import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { Snippet } from '../types';
import { HighlightPlaceholders } from './highlight-placeholders';
import { SelectSingle } from './select-single';
import { UpdateSingle } from './update-single';

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
  const classes = useStyles();

  const renderInputBoxes = (): JSX.Element[] =>
    Object.keys({ prefix, body }).map((key: keyof Snippet) => {
      return (
        <TableCell key={`${index}-${key}`}>
          <UpdateSingle keyName={key} index={index} />
        </TableCell>
      );
    });

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
