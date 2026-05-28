const { REGEX_PATTERNS, extractMatch } = require('../utils/regex');
const { formatAmount } = require('../utils/formatter');

const parseFamPayEmail = (emailBody) => {
  const amountStr = extractMatch(emailBody, REGEX_PATTERNS.FAMPAY.amount);
  const senderName = extractMatch(emailBody, REGEX_PATTERNS.FAMPAY.senderName);
  const referenceId = extractMatch(emailBody, REGEX_PATTERNS.FAMPAY.referenceId);
  
  if (!amountStr || !senderName) {
    return null;
  }

  return {
    provider: 'FamPay',
    amount: formatAmount(amountStr),
    senderName,
    referenceId: referenceId || 'N/A',
    rawAmount: amountStr
  };
};

module.exports = parseFamPayEmail;
