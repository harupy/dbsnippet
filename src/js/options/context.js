import React from 'react';

const SnippetContext = React.createContext([]);

export class SnippetProvider extends React.Component {
  state = {
    snippets: [],
    updated: false,
  };

  componentDidMount = () => {
    chrome.storage.sync.get(items => {
      const snippets = Object.entries(items).map(([prefix, body]) => ({
        prefix,
        body,
      }));
      this.setState({ snippets });
    });
  };

  setSnippets = snippets => this.setState({ snippets, updated: true });

  setUpdated = bool => this.setState({ updated: bool });

  addSnippet = snippet => {
    this.setState({ snippets: [...this.state.snippets, snippet], updated: true });
  };

  removeSnippet = index => {
    const snippets = [...this.state.snippets];
    snippets.splice(index, 1);
    this.setState({ snippets, updated: true });
  };

  updateSnippet = (event, index) => {
    const snippets = [...this.state.snippets];
    snippets[index][event.target.name] = event.target.value;
    this.setState({ snippets, updated: true });
  };

  render() {
    return (
      <SnippetContext.Provider
        value={{
          snippets: this.state.snippets,
          updated: this.state.updated,
          setSnippets: this.setSnippets,
          setUpdated: this.setUpdated,
          addSnippet: this.addSnippet,
          removeSnippet: this.removeSnippet,
          updateSnippet: this.updateSnippet,
        }}
      >
        {this.props.children}
      </SnippetContext.Provider>
    );
  }
}

export const SnippetConsumer = SnippetContext.Consumer;
export default SnippetContext;
