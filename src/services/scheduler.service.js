const cron = require('node-cron');
const env = require('../config/env');
const logger = require('../utils/logger');
const verificationService = require('./verification.service');

let task;

const start = () => {
  if (task) {
    logger.warn('Scheduler is already running.');
    return;
  }

  // Determine if OAuth credentials exist before scheduling
  if (!env.gmail.clientId || !env.gmail.clientSecret || !env.gmail.refreshToken) {
    logger.warn('Missing Gmail OAuth configs. Auto-scheduler will NOT start.');
    return;
  }

  task = cron.schedule(env.cronSchedule, async () => {
    logger.debug('Running scheduled cron job to check for payments...');
    try {
      await verificationService.processNewPayments();
    } catch (error) {
      logger.error('Error during scheduled verification run:', error);
    }
  });
};

const stop = () => {
  if (task) {
    task.stop();
    task = null;
    logger.info('Scheduler stopped.');
  }
};

module.exports = {
  start,
  stop
};
