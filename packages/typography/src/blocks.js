const identifier = ':::';

export default function blockPlugin() {
  function blockTokenizer(eat, value) {
    const self = this;
    const lines = value.split(/\n/);

    // We only care about blocks that start with the identifier
    if (lines[0].startsWith(identifier)) {
      const ruleObject = {};
      lines[0]
        .replace(identifier, '')
        .split(' ')
        .filter(item => item.includes(':'))
        .map(item => {
          const rule = item.split(':');
          ruleObject[rule[0]] = rule[1];
        });

      // Now we only care about finding the lines that end with the identifier
      const [_first, ...remainingLines] = lines;
      const firstRemainingDots = remainingLines.findIndex(line => {
        return line.startsWith(identifier);
      });
      if (firstRemainingDots > 0) {
        const newLines = lines.slice(1, firstRemainingDots + 1);
        const eatValue = lines.slice(0, firstRemainingDots + 2).join('\n');
        const strippedValue = newLines.join('\n');

        eat(eatValue)({
          type: 'block',
          rules: ruleObject,
          // Pass the children back to the top-level tokenizer
          children: self.tokenizeBlock(strippedValue, eat.now()),
        });
      }
    }
  }

  const Parser = this.Parser;

  const blockTokenizers = Parser.prototype.blockTokenizers;
  const blockMethods = Parser.prototype.blockMethods;
  blockTokenizers.blocks = blockTokenizer;
  blockMethods.splice(blockMethods.indexOf('newline'), 0, 'blocks');
}
