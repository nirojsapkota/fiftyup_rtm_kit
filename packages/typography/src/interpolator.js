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

    if (value.startsWith('{{')) {
      // This will select the first one
      const endPosition = value.indexOf('}}');
      if (endPosition) {
        const innerValue = value.substring(2, endPosition);
        const eatValue = value.substring(0, endPosition + 2);
        const subValue = get(referenceObject, innerValue);
        // console.log('refernce object', referenceObject.campaign);
        // console.log('innerval', innerValue);
        // console.log('eatval', eatValue);
        // console.log('subval', subValue);
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
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'interpolator');
}
