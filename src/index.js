const app = require('./server');
const env = require('./config/env');
const logger = require('./utils/logger');
const schedulerService = require('./services/scheduler.service');
const { initFirebase } = require('./config/firebase');

const startServer = async () => {
  try {
    // 1. Initialize Database (Firebase)
    try {
      initFirebase();
      logger.info('Firebase initialized successfully (if configured).');
    } catch (err) {
      logger.warn('Firebase initialization failed or not configured. Proceeding with in-memory fallback.');
    }

    // 2. Start Express Server
    app.listen(env.port, () => {
      logger.info(`🚀 Server running in ${env.nodeEnv} mode on port ${env.port}`);
      logger.info(`Health check: http://localhost:${env.port}/api/health`);
    });

    // 3. Start Background Email Polling Scheduler
    schedulerService.start();
    logger.info(`Scheduler started with cron: ${env.cronSchedule}`);

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
