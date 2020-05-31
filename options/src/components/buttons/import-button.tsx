import * as React from 'react';
import Button from '@material-ui/core/Button';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';

import { SnippetsContext } from '../../contexts/snippets-context';
import { useButtonStyles } from './button-styles';

export const ImportButton: React.FC<{}> = () => {
  const { setSnippets } = React.useContext(SnippetsContext);
  const classes = useButtonStyles();

  const handleFile = (file: File | undefined): void => {
    const reader = new FileReader();

    reader.onload = (event): void => {
      if (typeof event.target?.result !== 'string') {
        return;
      }

      const parsed = JSON.parse(event.target.result) as {
        [key: string]: string;
      };

      if (setSnippets) {
        setSnippets(
          Object.entries(parsed).map(([prefix, body]) => ({
            prefix,
            body,
            selected: false,
          })),
        );
      }
    };

    if (file === undefined) {
      return;
    }

    reader.readAsText(file);
  };

  return (
    <Button component="label">
      <VerticalAlignTopIcon className={classes.icon} />
      IMPORT
      <input
        id="importButton"
        style={{ display: 'None' }}
        type="file"
        onChange={(e): void => handleFile(e.target.files?.[0])}
        accept=".json"
      />
    </Button>
  );
};
