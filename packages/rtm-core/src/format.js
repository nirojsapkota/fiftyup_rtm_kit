const prettier = require('prettier');
const fs = require('fs');
const stagedGitFiles = require('staged-git-files');
const chalk = require('chalk');

const tester = () => {};

const format = () => {
  stagedGitFiles((err, data) => {
    if (err) console.log(err);

    const stagedJsFiles = data.filter(({ filename, status }) => {
      // Only format .js files
      const isJs = filename.split('.')[filename.split('.').length - 1] === 'js';
      return isJs && status === 'Modified';
    });

    if (stagedJsFiles.length === 0) {
      console.log(chalk.green(`No staged .js files to format`));
    }

    stagedJsFiles.map(({ filename }) => {
      const currentDir = process.cwd();
      const filePath = `${currentDir}/${filename}`;
      const text = fs.readFileSync(filePath, 'utf8');
      // We do this to expose the options which relies on normal prettier resolution
      // so that the editor prettier plugins can rely on the same config as this
      // script. So we'll probably remove opts in favor of a prettier config file
      // that we publish from this package
      const opts = { parser: 'babel', tabWidth: 2, trailingComma: 'es5' };
      prettier.resolveConfig(filePath).then(options => {
        console.log(options);
        const formatted = prettier.format(text, opts);
        if (text !== formatted) {
          fs.writeFileSync(filePath, formatted, err => {
            if (err) throw err;

            console.log(`${chalk.green.bold('Formatted')} ${filePath}`);
          });
        } else {
          console.log(`No need to format ${chalk.green(filePath)}. Skipping`);
        }
      });
    });
  });
};

module.exports = format;
