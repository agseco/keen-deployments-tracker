'use-strict';

const parseArgs = require('minimist');

class Options {
  static build() {
    const keenProjectId = Options._getArg('keen-project-id', true);
    const keenReadKey = Options._getArg('keen-read-key', true);
    const keenWriteKey = Options._getArg('keen-write-key', true);
    const repositoryPath = Options._getArg('repository-path', true);
    const branch = Options._getArg('branch', false, 'master');

    return { keenProjectId, keenReadKey, keenWriteKey, repositoryPath, branch};
  }

  static _getArg(name, required, defaultValue) {
    const args = parseArgs(process.argv);
    const arg = args[name];

    if (!arg) {
      if (required) {
        console.error(`Missing option --${name}`);
        process.exit(1);
      }

      return defaultValue;
    }

    return arg;
  }
}

module.exports = Options;