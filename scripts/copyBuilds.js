const fs = require('fs');
const path = require('path');

const packagePath = path.resolve(__dirname, '../packages');
const desinationPath = path.resolve(__dirname, '../dist');
if (!fs.existsSync(desinationPath)) {
  fs.mkdirSync(desinationPath);
}
fs.readdirSync(packagePath).map(file => {
  const packageJson = require(`${packagePath}/${file}/package.json`);
  fs.copyFileSync(`${packagePath}/${file}/build/index.js`, `${desinationPath}/${file}.${packageJson.version}.min.js`);
});
