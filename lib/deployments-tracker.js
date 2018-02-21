'use-strict';

const Options = require('./options.js');
const GitFacade = require('./git-facade.js');
const KeenFacade = require('./keen-facade.js');

class DeploymentsTracker {
  async run() {
    const options = Options.build();

    const git = new GitFacade(options.repositoryPath, options.branch);
    await git.init();

    const latestCommit = await git.latestCommit();
    console.log(latestCommit);

    const latestCommitDeployed = 'b622591fb75f539797a5fe6e303663bac4a93b15';
    const logFromLastDeployment = await git.logUntilCommit(latestCommitDeployed);
    console.log(logFromLastDeployment);

    const keen = new KeenFacade(options.keenProjectId, options.keenReadKey, options.keenWriteKey);
    const lastDeploymentEvent = await keen.fetchLastDeploymentEvent();
    console.log(lastDeploymentEvent);
  }
}

module.exports = DeploymentsTracker;