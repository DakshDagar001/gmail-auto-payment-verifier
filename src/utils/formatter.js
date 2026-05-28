const { createHash } = require('crypto');

/**
 * Standardize amount format to 2 decimal places
 */
const formatAmount = (amountStr) => {
  if (!amountStr) return 0;
  // Remove commas (e.g. 1,000.50 -> 1000.50)
  const cleaned = amountStr.replace(/,/g, '').replace(/[^0-9.]/g, '');
  return parseFloat(cleaned);
};

/**
 * Create a unique ID for a transaction based on key details to prevent duplicates
 */
const generateTransactionId = (sender, amount, date) => {
  const rawStr = `${sender}_${amount}_${date}`;
  return createHash('sha256').update(rawStr).digest('hex');
};

module.exports = {
  formatAmount,
  generateTransactionId
};
