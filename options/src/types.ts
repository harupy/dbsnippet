export type ObjStr = { [key: string]: string };
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Snippet = {
  prefix: string;
  body: string;
};
export type SnippetItem = Snippet & { selected: boolean };
