export type ObjStr = { [key: string]: string };
export type Snippet = {
  prefix: string;
  body: string;
};
export type SnippetItem = Snippet & { selected: boolean };
