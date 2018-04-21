'use-strict';

const parseArgs = require('minimist');

const DEFAULT_COLLECTION_NAME = 'keen-deployments-tracker';
const DEFAULT_BRANCH = 'master';

class Options {
  static build() {
    const keenProjectId = Options._getArg('keen-project-id', true);
    const keenReadKey = Options._getArg('keen-read-key', true);
    const keenWriteKey = Options._getArg('keen-write-key', true);
    const keenCollectionName = Options._getArg('keen-collection-name', true, DEFAULT_COLLECTION_NAME);
    const repositoryPath = Options._getArg('repository-path', true);
    const branch = Options._getArg('branch', false, DEFAULT_BRANCH);

    return { keenProjectId, keenReadKey, keenWriteKey, keenCollectionName, repositoryPath, branch };
  }

  static _getArg(name, required, defaultValue) {
    const args = parseArgs(process.argv);
    const arg = args[name];

    if (!arg) {
      if (required) {
        console.error(`Missing required option --${name}`);
        process.exit(1);
      }

      return defaultValue;
    }

    return arg;
  }
}

module.exports = Options;