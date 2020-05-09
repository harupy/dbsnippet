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

      {/* Input boxes */}
      {Object.entries({ prefix, body }).map(([key, value]) => (
        <td>
          <div className="ui input" style={{ width: '100%' }}>
            <input
              name={key}
              value={value}
              onChange={handleInputChange}
              style={{ fontFamily: 'monospace' }}
            />
          </div>
        </td>
      ))}

      {/* Result after expanding snippet */}
      <td>
        <HighlightPlaceholders
          body={body}
          style={{ backgroundColor: 'lightblue' }}
        />
      </td>

      {/* Delete button */}
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
