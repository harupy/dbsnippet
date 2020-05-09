import * as React from 'react';
import { SnippetsProvider } from './contexts/snippets-context';
import Table from './table';

const App: React.FC<{}> = () => {
  return (
    <SnippetsProvider>
      <div className="ui container">
        <h1 className="ui header" style={{ marginTop: 30 }}>
          DBSnippet : User Snippets
        </h1>
        <Table />
      </div>
    </SnippetsProvider>
  );
};

export default App;
