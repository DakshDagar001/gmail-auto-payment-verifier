const admin = require('firebase-admin');
const env = require('./env');
const logger = require('../utils/logger');

let db = null;

const initFirebase = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }

  if (!env.firebase.projectId || !env.firebase.clientEmail || !env.firebase.privateKey) {
    logger.warn('Firebase credentials missing. Using memory cache for transactions.');
    return null;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.firebase.projectId,
        clientEmail: env.firebase.clientEmail,
        privateKey: env.firebase.privateKey,
      })
    });
    db = admin.firestore();
    logger.info('Firebase Admin initialized.');
    return db;
  } catch (error) {
    logger.error('Error initializing Firebase:', error);
    return null;
  }
};

const getDb = () => db;

module.exports = {
  initFirebase,
  getDb
};
