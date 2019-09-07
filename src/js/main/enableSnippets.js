/* eslint-disable no-param-reassign */
import * as cu from './cursorUtils';

const replacePlaceholder = (body, ranges = []) => {
  // recursive function to replace placeholders and return their ranges
  const pattern = /\$\{([^{}]*)\}/;
  const match = body.match(pattern);
  if (!match) {
    return [body, ranges];
  }
  const [placeholder, defaultStr] = match;
  const head = cu.makeCursor(match.index, 0);
  const anchor = cu.withOffset(head, defaultStr.length);
  const newBody = body.replace(placeholder, defaultStr);
  return replacePlaceholder(newBody, [...ranges, { head, anchor }]);
};

const escapeRegExp = string => {
  const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  const reHasRegExpChar = RegExp(reRegExpChar.source);
  return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, '\\$&') : string;
};

const expandSnippet = cm => {
  const { snippets } = cm;
  const argSep = '/';
  const lineBeforeCursor = cu.getLineBeforeCursor(cm);
  const regex = new RegExp(`[^a-zA-Z0-9_]?([${escapeRegExp(argSep)}a-zA-Z0-9_,]+)$`);
  const match = lineBeforeCursor.match(regex);

  if (!match) {
    return false;
  }

  const text = match[1];
  const pieces = text.split(argSep);
  const prefix = pieces[0];
  const args = pieces.length > 1 ? pieces.slice(1) : [];

  if (prefix && prefix in snippets) {
    // TODO: add some comments here
    const body = snippets[prefix];
    const selections = cm.listSelections(); // for multiple selections
    const rangesToReplace = selections.map(({ anchor, head }) => {
      const len = (prefix + ['', ...args].join(argSep)).length;
      return { anchor, head: { line: head.line, ch: head.ch - len } };
    });
    const [newBody, rangesToSelect] = replacePlaceholder(body);

    // selections after expanding snippets
    const newSelections = selections
      .map(sel => {
        return rangesToSelect.map(range => {
          const len = (prefix + ['', ...args].join(argSep)).length;
          const anchor = cu.withOffset(cu.mergeCursors(sel.anchor, range.anchor), -len);
          const head = cu.withOffset(cu.mergeCursors(sel.head, range.head), -len);
          return { anchor, head };
        });
      })
      .flat();

    cm.setSelections(rangesToReplace);
    cm.replaceSelections(Array(selections.length).fill(newBody));
    cm.setSelections(newSelections);

    // if arguments were given, replace the current selections with the arguments
    if (args.length) {
      const replacement = args.map(arg => `'${arg}'`).join(', ');
      cm.replaceSelections(Array(selections.length).fill(replacement));
    }
    return true; // snippet found
  }
  return false;
};

export default cm => {
  // if snippet not found, execute the default Tab function
  const defaultTabFunc = cm.options.extraKeys.Tab;
  cm.options.extraKeys.Tab = cm_ => !expandSnippet(cm_) && defaultTabFunc(cm_);
};
