const fs = require("fs");

const fileContent = fs.readFileSync("main/src/defaultSnippets.js", {
  encoding: "utf8",
});

const getSnippetsObject = fc => {
  const pattern = /\{([\s\S]+?)\};/;
  return fc.match(pattern)[1];
};

const removePlaceholders = body => {
  return body.replace(/\$\{([^{}]*)\}/g, "");
};

const removeArgStrings = body => {
  return body.replace(/'.*?'/g, "");
};

const extractSnippets = snippetsString => {
  const snippetLines = snippetsString.match(/\s+(.+?):(.+)/gm);
  return snippetLines.map(line => {
    const [snippet, body] = line
      .trim() // Remove leading and trailing empty strings
      .match(/(.+?):\s+(.+),/) // Find snippet and body
      .slice(1, 3); // Extract 1st and 2nd matching groups

    const funcs = [removePlaceholders, removeArgStrings];
    // Slice here removes outer single quotes.
    return [snippet, funcs.reduce((s, f) => f(s), body.slice(1, -1))];
  });
};

const makeMarkdownTable = (headers, data) => {
  const makeRow = items => ["", ...items, ""].join("|");

  return [
    makeRow(headers),
    makeRow(Array(headers.length).fill(" :-- ")),
    ...data.map(makeRow),
  ].join("\n");
};

const snippets = extractSnippets(getSnippetsObject(fileContent));
const markdownTable = makeMarkdownTable(["Prefix", "Body"], snippets);

fs.writeFile("docs/snippets.md", markdownTable, err => {
  if (err) console.error(err);
});
