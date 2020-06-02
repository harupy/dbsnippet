import * as utils from '../utils';

describe('utils', () => {
  it('nbsp', () => {
    expect(utils.nbsp()).toEqual('\u00A0');
    expect(utils.nbsp(2)).toEqual('\u00A0\u00A0');
  });

  it('findPlaceholders', () => {
    let placeholders: string[];

    // No placeholder
    placeholders = utils.findPlaceholders('func(x)');
    expect(placeholders).toEqual([]);

    // Single placeholder
    placeholders = utils.findPlaceholders('func(${x})');
    expect(placeholders).toEqual(['x']);

    // Multiple placeholder
    placeholders = utils.findPlaceholders('func(${x}, ${x})');
    expect(placeholders).toEqual(['x', 'x']);

    // When a placeholder is located at the start
    placeholders = utils.findPlaceholders('${x}.func()');
    expect(placeholders).toEqual(['x']);

    // When a placeholder is located at the end
    placeholders = utils.findPlaceholders('func().${x}');
    expect(placeholders).toEqual(['x']);
  });

  it('splitByPlaceholder', () => {
    let pieces: string[];

    // No placeholder
    pieces = utils.splitByPlaceholder('func()');
    expect(pieces).toEqual(['func()']);

    // Single placeholder
    pieces = utils.splitByPlaceholder('func(${x})');
    expect(pieces).toEqual(['func(', ')']);

    // Multiple placeholders
    pieces = utils.splitByPlaceholder('func(${x}, ${x})');
    expect(pieces).toEqual(['func(', ', ', ')']);

    // When a placeholder is located at the start
    pieces = utils.splitByPlaceholder('${x}.func()');
    expect(pieces).toEqual(['', '.func()']);

    // When a placeholder is located at the end
    pieces = utils.splitByPlaceholder('func().${x}');
    expect(pieces).toEqual(['func().', '']);
  });

  it('alternateConcat', () => {
    let res: string[];

    res = utils.alternateConcat(['a', 'b'], ['1', '2']);
    expect(res).toEqual(['a', '1', 'b', '2']);

    res = utils.alternateConcat(['a', 'b'], ['1']);
    expect(res).toEqual(['a', '1', 'b']);

    res = utils.alternateConcat(['a'], ['1', '2']);
    expect(res).toEqual(['a', '1']);
  });

  it('ByDataTestId', () => {
    expect(utils.ByDataTestId('x')).toEqual('[data-testid="x"]');
  });
});
