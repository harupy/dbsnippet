import * as React from 'react';

export type Snippet = {
  prefix: string;
  body: string;
  selected: boolean;
};

type SnippetsContextProps = {
  snippets: Snippet[];
  setSnippets: (snippets: Snippet[]) => void;
  addSnippet: (snippet: Snippet) => void;
  selectSnippet: (selected: boolean, index: number) => void;
  selectAll: () => void;
  deselectAll: () => void;
  deleteSelected: () => void;
  deleteSnippet: (index: number) => void;
  updateSnippet: (
    // event: React.ChangeEvent<HTMLInputElement>,
    key: string,
    value: string,
    index: number,
  ) => void;
  saveSnippets: () => void;

  updated: boolean;
};

type SnippetsProviderProps = {
  children: React.ReactNode;
};

export const SnippetsContext = React.createContext<
  Partial<SnippetsContextProps>
>({});

export const SnippetsProvider: React.FC<SnippetsProviderProps> = ({
  children,
}) => {
  const [snippets, setSnippets] = React.useState<Snippet[]>([]);
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

  const addSnippet = (snippet: Snippet): void => {
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
    // event.persist();
    // const { name, value } = event.target;
    setSnippets(oldSnippets => {
      const newSnippets = [...oldSnippets];
      newSnippets[index][key] = value;
      return newSnippets;
    });
    setUpdated(true);
  };

  const selectAll = (): void => {
    // event.persist();
    // const { name, value } = event.target;
    setSnippets(oldSnippets => {
      return oldSnippets.map(({ prefix, body }) => ({
        prefix,
        body,
        selected: true,
      }));
    });
  };

  const deselectAll = (): void => {
    // event.persist();
    // const { name, value } = event.target;
    setSnippets(oldSnippets => {
      return oldSnippets.map(({ prefix, body }) => ({
        prefix,
        body,
        selected: false,
      }));
    });
  };

  const deleteSelected = (): void => {
    // event.persist();
    // const { name, value } = event.target;
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
