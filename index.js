#!/usr/bin/env node

const DeploymentsTracker = require('./lib/deployments-tracker.js');
const dt = new DeploymentsTracker();

const run = async function () {
  try {
    await dt.run();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

run();
