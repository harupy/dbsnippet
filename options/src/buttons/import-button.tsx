import * as React from 'react';
import SnippetContext from '../contexts/snippets-context';

const SaveButton: React.FC<{}> = () => {
  const { setSnippets } = React.useContext(SnippetContext);

  const handleFile = (file: File | undefined): void => {
    const reader = new FileReader();

    reader.onload = (event): void => {
      if (typeof event.target?.result !== 'string') {
        return;
      }

      const parsed = JSON.parse(event.target.result) as {
        [key: string]: string;
      };
      setSnippets?.(
        Object.entries(parsed).map(([prefix, body]) => ({
          prefix,
          body,
        })),
      );
    };

    if (file === undefined) {
      return;
    }

    reader.readAsText(file);
  };

  return (
    <label className="ui button" htmlFor="importButton">
      <i className="upload icon" />
      Import
      <input
        className="ui button"
        id="importButton"
        style={{ display: 'None' }}
        type="file"
        onChange={(e): void => handleFile(e.target.files?.[0])}
        accept=".json"
      />
    </label>
  );
};

export default SaveButton;
