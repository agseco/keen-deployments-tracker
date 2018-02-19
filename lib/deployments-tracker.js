'use-strict';

const Options = require('./options.js');
const Git = require('./git.js');

class DeploymentsTracker {
  async run() {
    const options = Options.build();

    const git = new Git(options.repositoryPath, options.branch);
    await git.init();

    const lastCommit = await git.lastCommit();
    console.log(lastCommit);
  }
}

module.exports = DeploymentsTracker;