import * as React from 'react';
import SnippetContext from './contexts/snippets-context';
import Row from './row';
import { AddButton, SaveButton, ExportButton, ImportButton } from './buttons';

const Table: React.FC<{}> = () => {
  const { snippets } = React.useContext(SnippetContext);

  const renderTable = () => {
    const rows = snippets?.map(({ prefix, body }, index) => (
      <Row prefix={prefix} body={body} index={index} key={index} />
    ));

    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>ID</th>
            <th>Prefix</th>
            <th>{'Body ( ${...} : placholder)'}</th>
            <th>
              Result (&nbsp;
              <span
                style={{
                  backgroundColor: 'lightblue',
                  fontFamily: 'monospace',
                }}
              >
                &nbsp;&nbsp;&nbsp;
              </span>
              &nbsp;: selection after expanded)
            </th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return (
    <div>
      {renderTable()}
      <AddButton />
      <SaveButton />
      <ExportButton />
      <ImportButton />
    </div>
  );
};

export default Table;
