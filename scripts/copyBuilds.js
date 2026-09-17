const fs = require('fs');
const path = require('path');

const packagePath = path.resolve(__dirname, '../packages');
const desinationPath = path.resolve(__dirname, '../dist');
if (!fs.existsSync(desinationPath)) {
  fs.mkdirSync(desinationPath);
}
fs.readdirSync(packagePath).forEach(file => {
  const packageJson = require(`${packagePath}/${file}/package.json`);
  // Skip private packages (e.g. vendored `rtm-core`, our internal build tooling) - they
  // aren't published/bundled and have no `build/index.js` output to copy.
  if (packageJson.private) {
    return;
  }
  fs.copyFileSync(
    `${packagePath}/${file}/build/index.js`,
    `${desinationPath}/${file}.${packageJson.version}.min.js`
  );
});
