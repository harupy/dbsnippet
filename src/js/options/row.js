import React from 'react';

const replacePlaceholder = (body, ranges = []) => {
  const pattern = /\$\{([^{}]*)\}/;
  const match = body.match(pattern);
  if (!match) {
    return [body, ranges];
  }
  const [placeholder, hint] = match;
  const start = match.index;
  const end = start + hint.length;
  const newBody = body.replace(placeholder, hint);
  return replacePlaceholder(newBody, [...ranges, { start, end }]);
};

const colorText = body => {
  // "print(${foo})" is converted to:
  // hints: ["foo"]
  // other: ["print(", ")"]

  const [newBody, ranges] = replacePlaceholder(body);
  const hints = ranges.map(({ start, end }) => newBody.slice(start, end));
  const others = ranges.concat({ start: newBody.length }).map((range, idx, arr) => {
    return newBody.slice(idx > 0 ? arr[idx - 1].end : 0, range.start);
  });
  const style = { backgroundColor: 'lightblue' };
  return others.map((other, idx) => (
    <span key={other}>
      {other}
      <span style={style}>{hints[idx]}</span>
    </span>
  ));
};

const Row = ({ prefix, body, index, removeSnippet, updateSnippet }) => {
  const updateValue = e => updateSnippet(e, index);

  return (
    <tr style={{ fontFamily: 'monospace' }}>
      <td style={{ textAlign: 'center' }}>
        <span>{index}</span>
      </td>
      <td>
        <div className="ui input" style={{ width: '100%' }}>
          <input
            name="prefix"
            value={prefix}
            onChange={updateValue}
            style={{ fontFamily: 'monospace' }}
          />
        </div>
      </td>
      <td>
        <div className="ui input" style={{ width: '100%' }}>
          <input
            name="body"
            value={body}
            onChange={updateValue}
            style={{ fontFamily: 'monospace' }}
          />
        </div>
      </td>
      <td>
        <div>{colorText(body)}</div>
      </td>
      <td style={{ textAlign: 'middle' }}>
        <button
          type="button"
          className="ui icon basic button"
          style={{ width: '100%' }}
          onClick={() => removeSnippet(index)}
        >
          <i className="trash alternate large icon" style={{ color: '#db2828' }}></i>
        </button>
      </td>
    </tr>
  );
};

export default Row;
