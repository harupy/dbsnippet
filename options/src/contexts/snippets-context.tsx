import * as React from 'react';

export type Snippet = {
  [key: string]: string;
};

type SnippetsContextProps = {
  snippets: Snippet[];
  setSnippets: (snippets: Snippet[]) => void;
  addSnippet: (snippet: Snippet) => void;
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

const SnippetsContext = React.createContext<Partial<SnippetsContextProps>>({});

export const SnippetsProvider: React.FC<SnippetsProviderProps> = ({
  children,
}) => {
  const [snippets, setSnippets] = React.useState<Snippet[]>([]);
  const [updated, setUpdated] = React.useState<boolean>(false);

  React.useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = (): void => {
    chrome.storage.sync.get(items => {
      // Snippets are stored as an object. Convert it to a list of (key, value).
      const snippets = Object.entries(items).map(([prefix, body]) => ({
        prefix,
        body,
      }));
      setSnippets(snippets);
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
    setUpdated?.(false);
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

  const updateSnippet = (key: string, value: string, index: number): void => {
    // event.persist();
    // const { name, value } = event.target;
    setSnippets(oldSnippets => {
      const newSnippets = [...oldSnippets];
      newSnippets[index][key] = value;
      return newSnippets;
    });
    setUpdated(true);
  };

  return (
    <SnippetsContext.Provider
      value={{
        snippets,
        setSnippets,
        addSnippet,
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

export default SnippetsContext;
