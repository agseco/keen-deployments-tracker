'use-strict';

const parseArgs = require('minimist');
const debug = require('debug')('options');

const DEFAULT_COLLECTION_NAME = 'keen-deployments-tracker';
const DEFAULT_BRANCH = 'master';

class Options {
  static build() {
    const host = Options._getArg('host', true);
    const environment = Options._getArg('environment', true);

    const keenProjectId = Options._getArg('keen-project-id', true);
    const keenReadKey = Options._getArg('keen-read-key', true);
    const keenWriteKey = Options._getArg('keen-write-key', true);
    const keenCollectionName = Options._getArg('keen-collection-name', false, DEFAULT_COLLECTION_NAME);

    const repositoryPath = Options._getArg('repository-path', true);
    const branch = Options._getArg('branch', false, DEFAULT_BRANCH);

    const dryRun = Options._getArg('dry-run', false, false);

    const parsedOptions = {
      host,
      environment,
      keenProjectId,
      keenReadKey,
      keenWriteKey,
      keenCollectionName,
      repositoryPath,
      branch,
      dryRun
    };
    debug('parsed otions: %j', parsedOptions);
    return parsedOptions;
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