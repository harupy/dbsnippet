import * as React from 'react';
import SnippetContext from './contexts/snippets-context';
import HighlightPlaceholders from './highlight-placeholders';

type RowProps = {
  prefix: string;
  body: string;
  index: number;
};

const Row: React.FC<RowProps> = ({ prefix, body, index }) => {
  const { updateSnippet, deleteSnippet } = React.useContext(SnippetContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    const { name, value } = e.target;
    updateSnippet?.(name, value, index);
  };

  return (
    <tr style={{ fontFamily: 'monospace' }}>
      <td style={{ textAlign: 'center' }}>
        <span>{index}</span>
      </td>
      <td>
        <div className="ui input" style={{ width: '100%' }}>
          <input
            name="prefix"
            value={prefix}
            onChange={handleInputChange}
            style={{ fontFamily: 'monospace' }}
          />
        </div>
      </td>
      <td>
        <div className="ui input" style={{ width: '100%' }}>
          <input
            name="body"
            value={body}
            onChange={handleInputChange}
            style={{ fontFamily: 'monospace' }}
          />
        </div>
      </td>
      <td>
        <HighlightPlaceholders
          body={body}
          style={{ backgroundColor: 'lightblue' }}
        />
      </td>
      <td style={{ textAlign: 'center' }}>
        <button
          type="button"
          className="ui icon basic button"
          style={{ width: '100%' }}
          onClick={(): void => deleteSnippet?.(index)}
        >
          <i
            className="trash alternate large icon"
            style={{ color: '#db2828' }}
          />
        </button>
      </td>
    </tr>
  );
};

export default Row;
