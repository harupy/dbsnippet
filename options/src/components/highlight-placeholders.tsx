import * as React from 'react';
import {
  findPlaceholders,
  splitByPlaceholder,
  alternateConcat,
} from '../utils';

export const HighlightPlaceholders: React.FC<{
  body: string;
  backgroundColor: string;
}> = ({ body, backgroundColor }) => {
  const pieces = splitByPlaceholder(body);
  const placeholders = findPlaceholders(body);
  const concated = alternateConcat(pieces, placeholders);

  return (
    <div>
      {concated.map((text, idx) => {
        const shouldHighlight = idx % 2 === 1;
        const dataTestId = shouldHighlight ? 'highlight' : 'no-highlight';
        const key = `${text}-${idx}`;

        return shouldHighlight ? (
          <span key={key} style={{ backgroundColor }} data-testid={dataTestId}>
            {text}
          </span>
        ) : (
          <span key={key} data-testid={dataTestId}>
            {text}
          </span>
        );
      })}
    </div>
  );
};
