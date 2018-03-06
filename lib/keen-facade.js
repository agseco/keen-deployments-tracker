'use-strict';

const Keen = require('keen-js');

class KeenFacade {
  constructor(projectId, readKey, writeKey) {
    this.keenClient = new Keen({
      projectId: projectId,
      readKey: readKey,
      writeKey: writeKey
    });
  }

  async addDeploymentEvent(data) {
    try {
      await this.keenClient.recordEvent('deployments', data);
    } catch (e) {
      console.log('Failed to add deployment event: ', e);
    }
  }

  async fetchLastDeploymentEvent() {
    return await this.keenClient.query('extraction', {
      event_collection: 'deployments',
      latest: 1
    });
  }
}

module.exports = KeenFacade;
