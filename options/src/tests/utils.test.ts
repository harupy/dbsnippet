import * as utils from '../utils';

describe('utils', () => {
  it('nbsp', () => {
    expect(utils.nbsp()).toEqual('\u00A0');
    expect(utils.nbsp(2)).toEqual('\u00A0\u00A0');
  });

  it('findPlaceholder', () => {
    let match: RegExpMatchArray | null;

    // Contains placeholder
    match = utils.findPlaceholder('func(${x})');
    expect(match?.[0]).toEqual('${x}');
    expect(match?.[1]).toEqual('x');

    // Does not contain placeholder
    match = utils.findPlaceholder('func(x)');
    expect(match).toEqual(null);
  });

  it('replacePlaceholders', () => {
    let body: string;
    let ranges: utils.MatchRange[];

    // No placeholder
    [body, ranges] = utils.replacePlaceholders('func()');
    expect(body).toEqual('func()');
    expect(ranges).toEqual([]);

    // Single placeholder
    [body, ranges] = utils.replacePlaceholders('func(${x})');
    expect(body).toEqual('func(x)');
    expect(ranges).toEqual([{ start: 5, end: 6 }]);

    // Multiple placeholders
    [body, ranges] = utils.replacePlaceholders('func(${x}, ${x})');
    expect(body).toEqual('func(x, x)');
    expect(ranges).toEqual([
      { start: 5, end: 6 },
      { start: 8, end: 9 },
    ]);
  });

  it('splitByPlaceholders', () => {
    let placeholders: string[];
    let pieces: string[];

    // No placeholder
    [placeholders, pieces] = utils.splitByPlaceholders('func()');
    expect(placeholders).toEqual([]);
    expect(pieces).toEqual(['func()']);

    // Single placeholder
    [placeholders, pieces] = utils.splitByPlaceholders('func(${x})');
    expect(placeholders).toEqual(['x']);
    expect(pieces).toEqual(['func(', ')']);

    // Multiple placeholders
    [placeholders, pieces] = utils.splitByPlaceholders('func(${x}, ${x})');
    expect(placeholders).toEqual(['x', 'x']);
    expect(pieces).toEqual(['func(', ', ', ')']);
  });
});
