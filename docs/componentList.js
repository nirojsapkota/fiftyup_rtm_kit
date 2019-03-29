const glob = require('glob');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');

module.exports = async () => {
  const files = await glob.sync(path.resolve(__dirname + '/../**/*.mdx'), {});
  const json = files
    .filter(file => file.split('/').includes('node_modules'))
    .map(file => {
      console.log(file);
      const data = fs.readFileSync(file, 'utf8');
      return fm(data).attributes;
    });

  fs.writeFileSync('./frontMatter.json', JSON.stringify(json, 0, 2));
};
