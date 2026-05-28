/**
 * Collection of Regular Expressions for parsing various payment emails.
 * Customize these based on the actual email format you receive.
 */
const REGEX_PATTERNS = {
  // Example for typical Indian payment apps (FamPay, PhonePe, Paytm, etc)
  FAMPAY: {
    amount: /(?:Rs\.|₹)\s*([\d,]+\.?\d*)/i,
    senderName: /from\s+([A-Za-z\s]+?)\s*(?:for|on|via)/i,
    referenceId: /(?:Ref|UTR|Transaction)\s*(?:No|ID)?[:\s]*([A-Z0-9]+)/i,
    date: /(?:on|dated)\s+(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i
  },
  PAYTM: {
    amount: /(?:Received)\s*(?:Rs\.|₹)\s*([\d,]+\.?\d*)/i,
    senderName: /from\s+([A-Za-z\s]+?)\s*has/i,
    referenceId: /Wallet\s*Txn\s*ID[:\s]*([0-9]+)/i
  },
  PHONEPE: {
    amount: /(?:Rs\.|₹)\s*([\d,]+\.?\d*)/i,
    senderName: /from\s+([A-Za-z\s]+?)\s*(?:successful)/i,
    referenceId: /UTR[:\s]*([0-9]+)/i
  },
  GPAY: {
    amount: /(?:Rs\.|₹)\s*([\d,]+\.?\d*)/i,
    senderName: /from\s+([A-Za-z\s]+?)\s*(?:using)/i,
    referenceId: /UPI\s*transaction\s*ID[:\s]*([0-9]+)/i
  }
};

/**
 * Helper function to extract data using regex
 * @param {string} text - The email body text
 * @param {RegExp} pattern - The regex pattern to apply
 * @returns {string|null} The matched group or null
 */
const extractMatch = (text, pattern) => {
  const match = text.match(pattern);
  return match && match[1] ? match[1].trim() : null;
};

module.exports = {
  REGEX_PATTERNS,
  extractMatch
};
