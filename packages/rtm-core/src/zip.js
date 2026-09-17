const shell = require('shelljs');
const chalk = require('chalk');

const zip = (_, opt) => {
  const workingDir = process.cwd();
  shell.cd(opt.p);
  const folderName = opt.p.split('/')[opt.p.split('/').length - 1];
  shell.exec(`zip -q -r ../${folderName}.zip . > /dev/null 2>&1`);
  console.log(chalk.cyan.bold(`Zipped package to ${opt.p}.zip`));
  shell.cd(workingDir);
};

module.exports = zip;
