'use-strict';

const debug = require('debug')('tracker');

const Options = require('./options.js');
const GitFacade = require('./git-facade.js');
const KeenFacade = require('./keen-facade.js');

class DeploymentsTracker {
  async run() {
    const options = Options.build();
    const keenCollectionName = options.keenCollectionName;

    const keen = new KeenFacade(options.keenProjectId, options.keenReadKey, options.keenWriteKey);
    let latestDeploymentEvent = await keen.fetchLastDeploymentEvent(keenCollectionName);
    debug('last deployment event: %j', latestDeploymentEvent);

    const git = new GitFacade(options.repositoryPath, options.branch);
    await git.init();

    const latestCommit = await git.latestCommit();
    debug('latest local commit: %j', latestCommit);

    let logFromLastDeployment;
    if (latestDeploymentEvent) {
      const latestDeployedCommit = latestDeploymentEvent.latestCommit;
      debug('latest commit deployed: %j', latestDeployedCommit);

      logFromLastDeployment = await git.logUntilCommit(latestDeployedCommit.id);
      debug('log from latest deployment: %j', logFromLastDeployment);
    }

    const deploymentEvent = {
      type: 'DEPLOYMENT',
      host: options.host,
      environment: options.environment,
      latestCommit,
      previousCommits: logFromLastDeployment
    };
    debug('adding deployment event: %j', deploymentEvent);
    await keen.addDeploymentEvent(keenCollectionName, deploymentEvent);
  }
}

module.exports = DeploymentsTracker;