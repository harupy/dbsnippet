import React from 'react';

const SnippetContext = React.createContext([]);

export class SnippetProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: [],
      updated: false,
    };
  }

  componentDidMount = () => {
    chrome.storage.sync.get(items => {
      const snippets = Object.entries(items).map(([prefix, body]) => ({
        prefix,
        body,
      }));
      this.setState(() => ({ snippets }));
    });
  };

  setSnippets = snippets => this.setState(() => ({ snippets, updated: true }));

  setUpdated = bool =>
    this.setState(() => ({
      updated: bool,
    }));

  addSnippet = snippet => {
    this.setState(({ snippets }) => ({
      snippets: [...snippets, snippet],
      updated: true,
    }));
  };

  removeSnippet = index => {
    this.setState(({ snippets }) => {
      const newSnippets = [...snippets];
      newSnippets.splice(index, 1);
      return {
        snippets: newSnippets,
        updated: true,
      };
    });
  };

  updateSnippet = (event, index) => {
    event.persist();
    this.setState(({ snippets }) => {
      const newSnippets = [...snippets];
      newSnippets[index][event.target.name] = event.target.value;
      return { snippets: newSnippets, updated: true };
    });
  };

  render() {
    const { snippets, updated } = this.state;
    const { children } = this.props;
    return (
      <SnippetContext.Provider
        value={{
          snippets,
          updated,
          setSnippets: this.setSnippets,
          setUpdated: this.setUpdated,
          addSnippet: this.addSnippet,
          removeSnippet: this.removeSnippet,
          updateSnippet: this.updateSnippet,
        }}
      >
        {children}
      </SnippetContext.Provider>
    );
  }
}

export const SnippetConsumer = SnippetContext.Consumer;
export default SnippetContext;
