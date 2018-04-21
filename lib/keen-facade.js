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

  async addDeploymentEvent(collectionName, data) {
    try {
      await this.keenClient.recordEvent(collectionName, data);
    } catch (e) {
      console.error('Failed to add deployment event: ', e);
    }
  }

  async fetchLastDeploymentEvent(collectionName) {
    try {
      const response = await this.keenClient.query('extraction', {
        event_collection: collectionName,
        latest: 1
      });

      const result = response.result;
      if (result && result.length > 0) {
        return result[0];
      }
    } catch (e) {
      console.error('Could not fetch last deployment event: ', e);
    }

    return undefined;
  }
}

module.exports = KeenFacade;
