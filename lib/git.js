'use-strict';
const path = require('path');
const NodeGit = require('nodegit');

class Git {
  constructor(repositoryPath) {
    this.repositoryPath = repositoryPath;
  }

  async init() {
    const repositoryPath = path.resolve(this.repositoryPath);
    this.repository = await NodeGit.Repository.open(repositoryPath);
  }

  async lastCommit() {
    const lastCommit = await this.repository.getBranchCommit('master');

    const id = lastCommit.id().tostrS();
    const message = lastCommit.message();

    const signature = lastCommit.author();
    const authorName = signature.name();
    const authorEmail = signature.email();

    return { id, message, author: { name: authorName, email: authorEmail }};
  }
}

module.exports = Git;