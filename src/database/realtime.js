const admin = require('firebase-admin');
const logger = require('../utils/logger');

// Note: If you want to use Realtime DB instead of Firestore, initialize it in config/firebase.js
// This is a placeholder structure for Realtime DB usage.

const getDb = () => {
  try {
    if (admin.apps.length > 0) {
      return admin.database();
    }
  } catch (e) {
    return null;
  }
  return null;
};

const saveTransactionRT = async (data) => {
  const db = getDb();
  if (!db) return false;
  try {
    await db.ref(`transactions/${data.transactionId}`).set({
      ...data,
      processedAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    logger.error('RTDB save error:', err);
    return false;
  }
};

module.exports = {
  saveTransactionRT
};
