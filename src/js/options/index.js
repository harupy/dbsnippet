import React from 'react';
import ReactDOM from 'react-dom';
import { SnippetProvider } from './context';
import Table from './table';

const App = () => {
  return (
    <SnippetProvider>
      <div className="ui container">
        <h1 className="ui header" style={{ marginTop: 10 }}>
          DBSnippet : User Custom Snippets
        </h1>
        <Table />
      </div>
    </SnippetProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
