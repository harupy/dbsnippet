import React from 'react';

const replacePlaceholder = (body, ranges = []) => {
  const pattern = /\$\{([^{}]*)\}/;
  const match = body.match(pattern);
  if (!match) {
    return [body, ranges];
  } else {
    const [placeholder, hint] = match;
    const start = match.index;
    const end = start + hint.length;
    const newBody = body.replace(placeholder, hint);
    return replacePlaceholder(newBody, [...ranges, { start, end }]);
  }
};

const colorText = body => {
  const [newBody, ranges] = replacePlaceholder(body);

  const hints = ranges.map(({ start, end }) => newBody.slice(start, end));
  const others = ranges.concat({ start: newBody.length }).map((range, idx, arr) => {
    return newBody.slice(idx > 0 ? arr[idx - 1].end : 0, range.start);
  });
  const style = { backgroundColor: 'lightblue' };
  return others.map((o, idx) => (
    <span key={idx}>
      {o}
      <span style={style}>{hints[idx]}</span>
    </span>
  ));
};

const Row = ({ prefix, body, index, removeSnippet, updateSnippet }) => {
  return (
    <tr style={{ fontFamily: 'monospace' }}>
      <td>
        <span>{index}</span>
      </td>
      <td>
        <div className="ui input" style={{ width: '100%' }}>
          <input
            name="prefix"
            value={prefix}
            onChange={e => updateSnippet(e, index)}
            style={{ fontFamily: 'monospace' }}
          />
        </div>
      </td>
      <td>
        <div className="ui input" style={{ width: '100%' }}>
          <input
            name="body"
            value={body}
            onChange={e => updateSnippet(e, index)}
            style={{ fontFamily: 'monospace' }}
          />
        </div>
      </td>
      <td>
        <div>{colorText(body)}</div>
      </td>
      <td style={{ textAlign: 'middle' }}>
        <div
          className="ui icon basic button"
          style={{ width: '100%' }}
          onClick={() => removeSnippet(index)}
        >
          <i className="trash alternate big icon" style={{ color: '#db2828' }}></i>
        </div>
      </td>
    </tr>
  );
};

export default Row;
