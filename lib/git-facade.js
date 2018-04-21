'use-strict';

const path = require('path');
const NodeGit = require('nodegit');
const Revwalk = NodeGit.Revwalk;

class GitFacade {
  constructor(repositoryPath, branch) {
    this.repositoryPath = repositoryPath;
    this.branch = branch;
  }

  async init() {
    const repositoryPath = path.resolve(this.repositoryPath);
    this.repository = await NodeGit.Repository.open(repositoryPath);
  }

  /**
   * Gets the newest commit from the history, a.k.a the reference commit (ref).
   */
  async latestCommit() {
    const latestCommit = await this.repository.getBranchCommit(this.branch);
    return this._mapCommit(latestCommit);
  }

  /**
   * Gets the history of commits from the latest (newest) commit until the target commit specified as argument. The target
   * commit is excluded from the results.
   */
  async logUntilCommit(targetCommitHash) {
    // Avoids logging the whole history
    if (!targetCommitHash) {
      return [];
    }

    const latestCommit = await this.repository.getBranchCommit(this.branch);
    const latestCommitHash = latestCommit.id();

    const revwalk = await this.repository.createRevWalk();
    revwalk.push(latestCommitHash);

    const commits = await revwalk.getCommitsUntil(c => {
      const keepWalking = c.id().tostrS() !== targetCommitHash;
      return keepWalking;
    });

    let result = [];
    if (commits && commits.length > 0) {
      const self = this;
      result = commits.map(c => self._mapCommit(c));
    }

    // Avoid redundant commits by removing first and last commits (latest & target commits, respectively)
    result.shift();
    result.pop();

    return result;
  }

  _mapCommit(commit) {
    const id = commit.id().tostrS();
    const message = commit.message();

    const signature = commit.author();
    const authorName = signature.name();
    const authorEmail = signature.email();

    return { id, message, author: { name: authorName, email: authorEmail }};
  }
}

module.exports = GitFacade;