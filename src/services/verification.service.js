const { fetchRecentEmails } = require('./gmail.service');
const { parseEmail } = require('./parser.service');
const { generateTransactionId } = require('../utils/formatter');
const firestore = require('../database/firestore');
const memoryCache = require('../database/memory-cache');
const logger = require('../utils/logger');
const { getDb } = require('../config/firebase');

const processNewPayments = async () => {
  logger.info('Starting manual or scheduled payment verification check...');
  
  try {
    const emails = await fetchRecentEmails(20); // fetch last 20 matching emails
    const newTransactions = [];

    const useFirebase = !!getDb();

    for (const email of emails) {
      const parsed = parseEmail(email);
      
      if (parsed) {
        // Generate a unique ID based on immutable properties
        const txId = generateTransactionId(parsed.senderName, parsed.amount, parsed.emailDate);
        
        let exists = false;
        
        if (useFirebase) {
          exists = await firestore.checkExists(txId);
        } else {
          exists = memoryCache.existsInCache(txId);
        }

        if (!exists) {
          const txData = {
            transactionId: txId,
            ...parsed,
            status: 'VERIFIED'
          };

          if (useFirebase) {
            await firestore.saveTransaction(txData);
          } else {
            memoryCache.saveToCache(txId, txData);
          }
          
          newTransactions.push(txData);
          logger.info(`New verified payment: ${parsed.provider} | ${parsed.amount} | ${parsed.senderName}`);
        }
      }
    }

    logger.info(`Verification cycle complete. Found ${newTransactions.length} new transactions.`);
    return newTransactions;

  } catch (error) {
    logger.error('Error in processNewPayments cycle:', error);
    throw error;
  }
};

const getVerifiedPayments = async () => {
  const useFirebase = !!getDb();
  if (useFirebase) {
    return await firestore.getAllTransactions(100);
  } else {
    return memoryCache.getAllFromCache();
  }
};

module.exports = {
  processNewPayments,
  getVerifiedPayments
};
