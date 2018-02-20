'use-strict';

const Options = require('./options.js');
const GitFacade = require('./git-facade.js');

class DeploymentsTracker {
  async run() {
    const options = Options.build();

    const git = new GitFacade(options.repositoryPath, options.branch);
    await git.init();

    const latestCommit = await git.latestCommit();
    console.log(latestCommit);

    // TODO: get "until commit" from Keen.io (last event)
    const latestCommitDeployed = 'b622591fb75f539797a5fe6e303663bac4a93b15';
    const logFromLastDeployment = await git.logUntilCommit(latestCommitDeployed);
    console.log(logFromLastDeployment);
  }
}

module.exports = DeploymentsTracker;