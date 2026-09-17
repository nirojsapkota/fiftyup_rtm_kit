const { spawn } = require('child_process');

module.exports = {
  rollup: require('./rollup'),
  test: require('./test'),
  zip: require('./zip'),
  format: require('./format'),
  start: function() {
    spawn('node', require('./start'));
  },
  build: function() {
    spawn('node', require('./build'));
  },
};
