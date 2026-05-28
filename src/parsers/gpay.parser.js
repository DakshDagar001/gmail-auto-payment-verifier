const { REGEX_PATTERNS, extractMatch } = require('../utils/regex');
const { formatAmount } = require('../utils/formatter');

const parseGPayEmail = (emailBody) => {
  const amountStr = extractMatch(emailBody, REGEX_PATTERNS.GPAY.amount);
  const senderName = extractMatch(emailBody, REGEX_PATTERNS.GPAY.senderName);
  const referenceId = extractMatch(emailBody, REGEX_PATTERNS.GPAY.referenceId);
  
  if (!amountStr || !senderName) {
    return null;
  }

  return {
    provider: 'Google Pay',
    amount: formatAmount(amountStr),
    senderName,
    referenceId: referenceId || 'N/A',
    rawAmount: amountStr
  };
};

module.exports = parseGPayEmail;
