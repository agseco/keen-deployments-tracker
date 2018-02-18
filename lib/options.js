'use-strict';

const parseArgs = require('minimist');

class Options {
  static build() {
    const keenReadKey = Options._getArg('keen-read-key');
    const keenWriteKey = Options._getArg('keen-write-key');
    const repositoryPath = Options._getArg('repository-path');

    return { keenReadKey, keenWriteKey, repositoryPath};
  }

  static _getArg(name, required) {
    const args = parseArgs(process.argv);
    const arg = args[name];
    if (!arg) {
      console.error(`Missing option --${name}`);
      process.exit(1);
    }
    return arg;
  }
}

module.exports = Options;