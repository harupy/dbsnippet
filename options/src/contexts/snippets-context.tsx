import * as React from 'react';

import { SnippetItem } from '../types';

interface SnippetsContextProps {
  snippets: SnippetItem[];
  updated: boolean;
  setSnippets: (snippets: SnippetItem[]) => void;
  addSnippet: (snippet: SnippetItem) => void;
  selectSnippet: (selected: boolean, index: number) => void;
  selectAll: () => void;
  deselectAll: () => void;
  deleteSelected: () => void;
  deleteSnippet: (index: number) => void;
  updateSnippet: (key: string, value: string, index: number) => void;
  saveSnippets: () => void;
}

interface SnippetsProviderProps {
  children: React.ReactNode;
}

export const SnippetsContext = React.createContext<
  Partial<SnippetsContextProps>
>({});

export const SnippetsProvider: React.FC<SnippetsProviderProps> = ({
  children,
}) => {
  const [snippets, setSnippets] = React.useState<SnippetItem[]>([]);
  const [updated, setUpdated] = React.useState<boolean>(false);

  const loadSnippets = (): void => {
    chrome.storage.sync.get(items => {
      // Snippets are stored as an object. Convert it to a list of (key, value).
      const snippetsList = Object.entries(items).map(([prefix, body]) => ({
        prefix,
        body,
        selected: false,
      }));
      setSnippets(snippetsList);
    });
  };

  const saveSnippets = (): void => {
    chrome.storage.sync.clear();
    // Convert to an object.
    const items = snippets?.reduce(
      (acc, { prefix, body }) => ({ ...acc, [prefix]: body }),
      {},
    );
    chrome.storage.sync.set(items || {});
    setUpdated(false);
  };

  const addSnippet = (snippet: SnippetItem): void => {
    setSnippets(oldSnippets => [...oldSnippets, snippet]);
    setUpdated(true);
  };

  const deleteSnippet = (index: number): void => {
    setSnippets(oldSnippets => {
      const newSnippets = [...oldSnippets];
      newSnippets.splice(index, 1);
      return newSnippets;
    });
    setUpdated(true);
  };

  const updateSnippet = (
    key: 'prefix' | 'body',
    value: string,
    index: number,
  ): void => {
    setSnippets(oldSnippets => {
      const newSnippets = [...oldSnippets];
      newSnippets[index][key] = value;
      return newSnippets;
    });
    setUpdated(true);
  };

  const selectAll = (): void => {
    setSnippets(oldSnippets => {
      return oldSnippets.map(({ prefix, body }) => ({
        prefix,
        body,
        selected: true,
      }));
    });
  };

  const deselectAll = (): void => {
    setSnippets(oldSnippets => {
      return oldSnippets.map(({ prefix, body }) => ({
        prefix,
        body,
        selected: false,
      }));
    });
  };

  const deleteSelected = (): void => {
    setSnippets(oldSnippets => {
      return oldSnippets.filter(({ selected }) => !selected);
    });
    setUpdated(true);
  };

  const selectSnippet = (selected: boolean, index: number): void => {
    setSnippets(oldSnippets => {
      const newSnippets = [...oldSnippets];
      newSnippets[index].selected = selected;
      return newSnippets;
    });
  };

  React.useEffect(() => {
    loadSnippets();
  }, []);

  return (
    <SnippetsContext.Provider
      value={{
        snippets,
        setSnippets,
        addSnippet,
        selectSnippet,
        selectAll,
        deselectAll,
        deleteSelected,
        deleteSnippet,
        updateSnippet,
        saveSnippets,
        updated,
      }}
    >
      {children}
    </SnippetsContext.Provider>
  );
};
