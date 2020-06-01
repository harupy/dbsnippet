import { objToSnippets, snippetsToObj } from '../../contexts/snippets-context';

describe('snippets-context', () => {
  const obj = {
    foo: 'bar',
    yes: 'no',
  };
  const snippets = [
    { prefix: 'foo', body: 'bar', selected: false },
    { prefix: 'yes', body: 'no', selected: false },
  ];

  it('objToSnippets', () => {
    expect(objToSnippets(obj)).toEqual(snippets);
    expect(objToSnippets({})).toEqual([]);
  });

  it('snippetsToObj', () => {
    expect(snippetsToObj(snippets)).toEqual(obj);
    expect(snippetsToObj([])).toEqual({});
  });
});
