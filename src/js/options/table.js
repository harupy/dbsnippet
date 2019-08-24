import React, { useState } from 'react';
import { SnippetConsumer } from './context';
import Row from './row';

const Table = () => {
  const [message, setMessage] = useState('');
  return (
    <SnippetConsumer>
      {context => {
        const saveSnippets = () => {
          chrome.storage.sync.clear();
          chrome.storage.sync.set(
            context.snippets.reduce((acc, { prefix, body }) => ({ ...acc, [prefix]: body }), {}),
          );
        };

        const handleFile = file => {
          const reader = new FileReader();
          reader.onload = event => {
            const snippets = JSON.parse(event.target.result);
            context.setSnippets(
              Object.entries(snippets).map(([prefix, body]) => ({ prefix, body })),
            );
          };
          reader.readAsText(file);
        };

        const rows = context.snippets.map(({ prefix, body }, index) => (
          <Row
            prefix={prefix}
            body={body}
            index={index}
            key={index}
            removeSnippet={context.removeSnippet}
            updateSnippet={context.updateSnippet}
          />
        ));

        return (
          <div>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Prefix</th>
                  <th>{'Body ( ${...} : placholder)'}</th>
                  <th>
                    Result (&nbsp;
                    <span style={{ backgroundColor: 'lightblue', fontFamily: 'monospace' }}>
                      &nbsp;&nbsp;&nbsp;
                    </span>
                    &nbsp;: selection after expansion)
                  </th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>

            <button
              className="ui button"
              onClick={() => context.addSnippet({ prefix: '', body: '' })}
            >
              Add a New Snippet
            </button>
            <button
              className={`ui button ${context.updated ? 'positive' : ''}`}
              onClick={() => {
                saveSnippets();
                context.setUpdated(false);
                setMessage('Successfully saved!');
              }}
            >
              Save Snippets
            </button>
            <a
              className="ui button"
              target="_blank"
              rel="noopener noreferrer"
              download="snippets.json"
              href={
                'data:application/json;charset=utf-8;,' +
                encodeURIComponent(
                  JSON.stringify(
                    context.snippets.reduce(
                      (prev, { prefix, body }) => ({ ...prev, [prefix]: body }),
                      {},
                    ),
                  ),
                )
              }
            >
              Export Snippets
            </a>
            <input
              className="ui button"
              id="importButton"
              style={{ display: 'None' }}
              type="file"
              onChange={e => handleFile(e.target.files[0])}
              accept=".json"
            />
            <label className="ui button" htmlFor="importButton">
              Import Snippets
            </label>

            <h3 className="ui green header" style={{ marginTop: 15 }}>
              {message}
            </h3>
          </div>
        );
      }}
    </SnippetConsumer>
  );
};

export default Table;
