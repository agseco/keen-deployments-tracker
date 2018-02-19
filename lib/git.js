'use-strict';
const path = require('path');
const NodeGit = require('nodegit');

class Git {
  constructor(repositoryPath, branch) {
    this.repositoryPath = repositoryPath;
    this.branch = branch;
  }

  async init() {
    const repositoryPath = path.resolve(this.repositoryPath);
    this.repository = await NodeGit.Repository.open(repositoryPath);
  }

  async lastCommit() {
    const lastCommit = await this.repository.getBranchCommit(this.branch);

    const id = lastCommit.id().tostrS();
    const message = lastCommit.message();

    const signature = lastCommit.author();
    const authorName = signature.name();
    const authorEmail = signature.email();

    return { id, message, author: { name: authorName, email: authorEmail }};
  }
}

module.exports = Git;