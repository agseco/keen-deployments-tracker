#!/usr/bin/env node

const DeploymentsTracker = require('./lib/deployments-tracker.js');
new DeploymentsTracker().run();