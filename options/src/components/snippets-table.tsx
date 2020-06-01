import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { SnippetsContext } from '../contexts/snippets-context';
import { SnippetRow } from './snippet-row';
import { SelectAll } from './select-all';
import {
  AddButton,
  SaveButton,
  ExportButton,
  ImportButton,
  DeleteButton,
} from './buttons';

const useStyles = makeStyles({
  checkbox: {
    width: 10,
    paddingRight: 0,
    paddingLeft: 0,
  },

  table: {
    marginTop: 80,
  },

  buttons: {
    marginBottom: 10,
  },
});

export const SnippetsTable: React.FC<{}> = () => {
  const { snippets } = React.useContext(SnippetsContext);
  const classes = useStyles();

  const renderTable = (): JSX.Element => {
    const rows = snippets?.map(({ prefix, body }, index) => (
      <SnippetRow prefix={prefix} body={body} index={index} key={index} />
    ));

    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.checkbox}>
                <SelectAll />
              </TableCell>
              <TableCell>Prefix</TableCell>
              {/* eslint-disable-next-line no-template-curly-in-string */}
              <TableCell>{'Body ( ${...} : placholder)'}</TableCell>
              <TableCell>
                Result (&nbsp;
                <span
                  style={{
                    backgroundColor: 'lightblue',
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;: selection after expanded)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderButtons = (): JSX.Element => (
    <div className={classes.buttons}>
      <AddButton />
      <DeleteButton />
      <SaveButton />
      <ExportButton />
      <ImportButton />
    </div>
  );

  return (
    <div className={classes.table}>
      {renderButtons()}
      {renderTable()}
    </div>
  );
};
