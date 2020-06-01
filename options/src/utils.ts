export type SelectRange = {
  start: number | undefined;
  end: number | undefined;
};

export const findPlaceholder = (text: string): RegExpMatchArray | null => {
  return text.match(/\$\{([^{}]*)\}/);
};

export const replacePlaceholders = (
  body: string,
  ranges: SelectRange[] = [],
): [string, SelectRange[]] => {
  const match = findPlaceholder(body);
  if (!match) {
    return [body, ranges];
  }
  const [placeholder, hint] = match;
  const newBody = body.replace(placeholder, hint);
  const start = match.index;
  const end = start ? start + hint.length : Infinity;
  return replacePlaceholders(newBody, [...ranges, { start, end }]);
};

export const splitByPlaceholders = (body: string): [string[], string[]] => {
  const [newBody, selectRanges] = replacePlaceholders(body);
  const placeholders = selectRanges.map(({ start, end }) =>
    newBody.slice(start, end),
  );
  const pieces = selectRanges
    .concat({ start: newBody.length, end: Infinity })
    .map((range, idx, arr) => {
      return newBody.slice(idx > 0 ? arr[idx - 1].end : 0, range.start);
    });

  return [placeholders, pieces];
};

export const nbsp = (repeat = 1): string => '\u00A0'.repeat(repeat);
