const { REGEX_PATTERNS, extractMatch } = require('../utils/regex');
const { formatAmount } = require('../utils/formatter');

const parsePhonePeEmail = (emailBody) => {
  const amountStr = extractMatch(emailBody, REGEX_PATTERNS.PHONEPE.amount);
  const senderName = extractMatch(emailBody, REGEX_PATTERNS.PHONEPE.senderName);
  const referenceId = extractMatch(emailBody, REGEX_PATTERNS.PHONEPE.referenceId);
  
  if (!amountStr || !senderName) {
    return null;
  }

  return {
    provider: 'PhonePe',
    amount: formatAmount(amountStr),
    senderName,
    referenceId: referenceId || 'N/A',
    rawAmount: amountStr
  };
};

module.exports = parsePhonePeEmail;
