import * as React from 'react';
import { findPlaceholders, splitByPlaceholder } from '../utils';

export const HighlightPlaceholders: React.FC<{
  body: string;
  backgroundColor: string;
}> = ({ body, backgroundColor }) => {
  const placeholders = findPlaceholders(body);
  const pieces = splitByPlaceholder(body);

  return (
    <div>
      {pieces.map((piece, idx) =>
        idx > placeholders.length - 1 ? (
          <span key={piece}>{piece}</span>
        ) : (
          <span key={piece}>
            {piece}
            <span style={{ backgroundColor }}>{placeholders[idx]}</span>
          </span>
        ),
      )}
    </div>
  );
};
