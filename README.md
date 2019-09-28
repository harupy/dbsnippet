# DBSnippet

A Chrome extension to provide code snippets on Databricks.

<img width="70%" src="https://user-images.githubusercontent.com/17039389/63638189-e2f0dd00-c6bf-11e9-92a0-a27c6bcb346d.gif">

## Installation

[DBSnippet - Chrome Web Store](https://chrome.google.com/webstore/detail/dbsnippet/lnnfckpmnjkjakgjiinhlnlkmeoodlhb?hl=en&authuser=0)

## Getting Started

1. Open a Databricks notebook.
1. Make sure the extension is enabled.
1. Select a cell.
1. Type `dp` and press `Tab` (`dp` will be expanded to `display()`).
1. Type `df.gb` and press `Tab` (`gb` will be expanded to `groupBy()`).

## Build from the Source

1. Clone this repository.
1. Run `npm install`.
1. Run `npm run build` (or `npm run dev`).
1. Open `chrome://extensions` on Chrome.
1. Enable `Developer mode` if it's disabled.
1. Click `Load unpacked`.
1. Select `src` in the extension directory.

## Snippet List

[Snippet List](./docs/snippets.md)

## Custom Snippets

You can add your own snippets on the option page (implemented using React and Semantic-UI).

1. Click the extension logo and select `options`.
2. Update the snippets.
3. Click the save button.

![custom snippet](./img/custom_snippet.png)

## How this extension works?

Each cell on the notebook has an object called `CodeMirror` which manages the cell content and state. This extension injects a JS script to override the properties related to key bindings and add new features not provided by default.

## Other Extensions

| Extension                                  | Feature                                   |
| :----------------------------------------- | :---------------------------------------- |
| [DBVim](https://github.com/harupy/dbvim)   | Enable Vim on Databricks                  |
| [DBDark](https://github.com/harupy/dbdark) | Apply dark theme on Databricks            |
| [DBToc](https://github.com/harupy/dbtoc)   | Create a table of contents with one click |

## Acknowledgements

A huge thanks to Databricks for making big data simple.

## License

MIT
