export type Snippet = {
  prefix: string;
  body: string;
};

export type SnippetItem = Snippet & { selected: boolean };
