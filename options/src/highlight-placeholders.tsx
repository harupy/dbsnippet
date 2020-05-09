import * as React from 'react';
import { splitByPlaceholders } from './utils';

const highlightPlaceholders: React.FC<{
  body: string;
  backgroundColor: string;
}> = ({ body, backgroundColor }) => {
  const [placeholders, pieces] = splitByPlaceholders(body);

  return (
    <div>
      {pieces.map((piece, idx) => (
        <span key={piece}>
          {piece}
          <span style={{ backgroundColor }}>{placeholders[idx]}</span>
        </span>
      ))}
    </div>
  );
};

export default highlightPlaceholders;