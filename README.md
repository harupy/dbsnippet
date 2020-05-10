# DBSnippet

A Chrome extension to provide code snippets on Databricks.

<img width="80%" src="https://user-images.githubusercontent.com/17039389/65810979-c4b15c00-e1ec-11e9-8f6a-45e766bcd7d3.gif">

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

You can add custom snippets on the option page.

1. Click the extension logo and select `options`.
2. Add snippets.
3. Click the save button.

![custom snippet](https://user-images.githubusercontent.com/17039389/81496312-b6cec800-92f1-11ea-90e8-39f058e7aabc.png)

## How this extension works?

Each cell on the notebook has an object called `CodeMirror` which manages the cell content and state. This extension injects a JS script to override the properties related to key bindings and add new features not provided by default.

## License

MIT
