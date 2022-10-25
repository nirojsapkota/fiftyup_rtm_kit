var get = require('lodash.get');

function locator(value, fromIndex) {
  let index = -1;
  const found = [];
  index = value.indexOf('{{', fromIndex);
  if (index !== -1) {
    found.push(index);
  }
  if (found.length) {
    found.sort((a, b) => a - b);
    return found[0];
  }

  return -1;
}

export default function inlinePlugin(referenceObject) {
  function inlineTokenizer(eat, value, silent) {
    if (!this.escape.includes('{{')) this.escape.push('{{');

    const now = eat.now();
    now.column += 1;
    now.offset += 1;

    // FIXME: locator function does not return the value
    // for the handlebar when it's nested inside a link.
    // I think this is a bug so have created a ticket in
    // here https://github.com/remarkjs/remark/issues/410
    // If that's resolved we can remove this code
    if (
      !value.startsWith('[^') &&
      value.startsWith('[') &&
      value.includes('{{')
    ) {
      var endPosition = 0;
      if (value.includes('[!')) {
        endPosition = value.indexOf('})') + 2;
        console.log('endPosition: ', endPosition);
      } else {
        endPosition = value.indexOf(')') + 1;
      }

      const startHandlebarPosition = value.indexOf('{{') + 2;
      const endHandlebarPosition = value.indexOf('}}');
      const subbedValue = value.substring(
        startHandlebarPosition,
        endHandlebarPosition
      );
      const eatValue = value.substring(0, endPosition);
      const subValue = get(referenceObject, subbedValue);
      const linkValue = value.substring(
        value.indexOf('[') + 1,
        value.indexOf(']')
      );

      if (eatValue.indexOf('!') >= 0) {
        const imageValue = eatValue.substring(
          value.indexOf('(') + 1,
          value.indexOf(')]')
        );

        eat(eatValue)({
          type: 'link',
          url: subValue,
          title: '',
          children: [
            {
              type: 'image',
              url: imageValue,
              alt: imageValue,
            },
          ],
        });
      } else {
        eat(eatValue)({
          type: 'link',
          url: subValue,
          title: '',
          children: [
            {
              type: 'text',
              value: linkValue,
            },
          ],
        });
      }
    }
    // ENDFIXME

    if (value.startsWith('{{')) {
      // This will select the first one
      const endPosition = value.indexOf('}}');
      if (endPosition) {
        const innerValue = value.substring(2, endPosition);
        const eatValue = value.substring(0, endPosition + 2);
        const subValue = get(referenceObject, innerValue);
        const replacedText = subValue || 'undefined';
        eat(eatValue)({
          type: 'handlebars',
          children: [
            {
              type: 'text',
              value: replacedText,
            },
          ],
          data: {
            todo: 'Put some meaningful data here?',
          },
        });
      }
    }
  }

  inlineTokenizer.locator = locator;

  const Parser = this.Parser;

  // Inject inlineTokenizer
  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;
  inlineTokenizers.interpolator = inlineTokenizer;
  // Getting in front of the link parser is key due to
  // https://github.com/remarkjs/remark/issues/410
  inlineMethods.splice(inlineMethods.indexOf('url'), 0, 'interpolator');
}
