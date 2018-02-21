'use-strict';

const Keen = require('keen-analysis');

class KeenFacade {
  constructor(projectId, readKey, writeKey) {
    this.keenClient = new Keen({
      projectId: projectId,
      readKey: readKey,
      writeKey: writeKey
    });
  }

  async fetchLastDeploymentEvent() {
    return await this.keenClient.query('extraction', {
      event_collection: 'deployments',
      latest: 1
    });
  }
}

module.exports = KeenFacade;
