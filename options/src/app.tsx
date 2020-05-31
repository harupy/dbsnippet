import * as React from 'react';
import Container from '@material-ui/core/Container';

import { SnippetsProvider } from './contexts/snippets-context';
import { NavBar } from './nav-bar';
import { SnippetsTable } from './snippets-table';

export const App: React.FC<{}> = () => {
  return (
    <SnippetsProvider>
      <Container>
        <NavBar />
        <SnippetsTable />
      </Container>
    </SnippetsProvider>
  );
};
