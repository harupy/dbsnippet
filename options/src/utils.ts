type Match = {
  start: number | undefined;
  end: number | undefined;
};

export const replacePlaceholders = (
  body: string,
  ranges: Match[] = [],
): [string, Match[]] => {
  const pattern = /\$\{([^{}]*)\}/;
  const match = body.match(pattern);
  if (!match) {
    return [body, ranges];
  }
  const [placeholder, hint] = match;
  const newBody = body.replace(placeholder, hint); // Convert ${<hint>} -> <hint>
  const start = match.index;
  const end = start ? start + hint.length : undefined;
  return replacePlaceholders(newBody, [...ranges, { start, end }]);
};

export const splitByPlaceholders = (body: string): [string[], string[]] => {
  const [newBody, ranges] = replacePlaceholders(body);
  const placeholders = ranges.map(({ start, end }) =>
    newBody.slice(start, end),
  );
  const pieces = ranges
    .concat({ start: newBody.length, end: undefined })
    .map((range, idx, arr) => {
      return newBody.slice(idx > 0 ? arr[idx - 1].end : 0, range.start);
    });

  return [placeholders, pieces];
};
