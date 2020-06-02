export type SelectRange = {
  start: number | undefined;
  end: number | undefined;
};

export const findMatches = (
  str: string,
  regex: RegExp,
  matches: string[] = [],
): string[] => {
  const match = regex.exec(str);

  if (!match) {
    return matches;
  }

  return findMatches(str, regex, [...matches, match[1]]);
};

export const findPlaceholders = (str: string): string[] => {
  return findMatches(str, /\$\{([^{}]*)\}/g);
};

export const splitByPlaceholder = (str: string): string[] => {
  return str.split(/\$\{[^{}]*\}/g);
};

export const sliceSnippet = (snippet: string): [string[], string[]] => {
  return [findPlaceholders(snippet), splitByPlaceholder(snippet)];
};

export const nbsp = (repeat = 1): string => '\u00A0'.repeat(repeat);

export const alternateConcat = <T>(arr1: T[], arr2: T[]): T[] => {
  const res: T[] = [];
  arr1.forEach((x1, idx1) => {
    res.push(x1);
    if (arr2[idx1]) {
      res.push(arr2[idx1]);
    }
  });
  return res;
};
