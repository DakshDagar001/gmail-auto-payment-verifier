const { getDb } = require('../config/firebase');
const logger = require('../utils/logger');

const COLLECTION = 'transactions';

const saveTransaction = async (data) => {
  const db = getDb();
  if (!db) return false;

  try {
    await db.collection(COLLECTION).doc(data.transactionId).set({
      ...data,
      processedAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    logger.error('Firestore save error:', err);
    return false;
  }
};

const checkExists = async (transactionId) => {
  const db = getDb();
  if (!db) return false;

  try {
    const doc = await db.collection(COLLECTION).doc(transactionId).get();
    return doc.exists;
  } catch (err) {
    logger.error('Firestore check error:', err);
    return false;
  }
};

const getAllTransactions = async (limit = 50) => {
  const db = getDb();
  if (!db) return [];

  try {
    const snapshot = await db.collection(COLLECTION)
      .orderBy('processedAt', 'desc')
      .limit(limit)
      .get();
    
    return snapshot.docs.map(doc => doc.data());
  } catch (err) {
    logger.error('Firestore fetch error:', err);
    return [];
  }
};

module.exports = {
  saveTransaction,
  checkExists,
  getAllTransactions
};
