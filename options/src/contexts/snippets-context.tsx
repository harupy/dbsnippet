import * as React from 'react';

import { SnippetItem, ObjStr } from '../types';

export const objToSnippets = (obj: ObjStr): SnippetItem[] => {
  return Object.entries(obj).map(([key, value]) => ({
    prefix: key,
    body: value,
    selected: false,
  }));
};

export const snippetsToObj = (snippets: SnippetItem[]): ObjStr => {
  return snippets.reduce(
    (acc, { prefix, body }) => ({ ...acc, [prefix]: body }),
    {},
  );
};

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
  useChromeStorageSyncGet: {
    <T>(
      setter: React.Dispatch<React.SetStateAction<T>>,
      f: { (obj: ObjStr): T },
    ): {
      (): void;
    };
  };
  useChromeStorageSyncSet: {
    <T>(f: { (snippets: T): ObjStr }): {
      (snippets: T): void;
    };
  };
}

export const SnippetsContext = React.createContext<
  Partial<SnippetsContextProps>
>({});

export const SnippetsProvider: React.FC<SnippetsProviderProps> = ({
  children,
  useChromeStorageSyncGet,
  useChromeStorageSyncSet,
}) => {
  const [snippets, setSnippets] = React.useState<SnippetItem[]>([]);
  const [updated, setUpdated] = React.useState<boolean>(false);

  const loadSnippets = useChromeStorageSyncGet<SnippetItem[]>(
    setSnippets,
    objToSnippets,
  );

  const saveSnippets = (): void => {
    useChromeStorageSyncSet<SnippetItem[]>(snippetsToObj)(snippets);
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
