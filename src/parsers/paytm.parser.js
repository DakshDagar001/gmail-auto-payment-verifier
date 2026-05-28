const { REGEX_PATTERNS, extractMatch } = require('../utils/regex');
const { formatAmount } = require('../utils/formatter');

const parsePaytmEmail = (emailBody) => {
  const amountStr = extractMatch(emailBody, REGEX_PATTERNS.PAYTM.amount);
  const senderName = extractMatch(emailBody, REGEX_PATTERNS.PAYTM.senderName);
  const referenceId = extractMatch(emailBody, REGEX_PATTERNS.PAYTM.referenceId);
  
  if (!amountStr || !senderName) {
    return null;
  }

  return {
    provider: 'Paytm',
    amount: formatAmount(amountStr),
    senderName,
    referenceId: referenceId || 'N/A',
    rawAmount: amountStr
  };
};

module.exports = parsePaytmEmail;
