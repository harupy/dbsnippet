import * as React from 'react';
import { splitByPlaceholders } from './utils';

type Style = { [key: string]: string | number | undefined };

const highlightPlaceholders: React.SFC<{
  body: string;
  style: Style;
}> = ({ body, style }) => {
  const [placeholders, pieces] = splitByPlaceholders(body);

  return (
    <div>
      {pieces.map((piece, idx) => (
        <span key={piece}>
          {piece}
          <span style={style}>{placeholders[idx]}</span>
        </span>
      ))}
    </div>
  );
};

export default highlightPlaceholders;
