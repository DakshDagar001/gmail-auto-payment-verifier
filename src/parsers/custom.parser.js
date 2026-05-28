const { formatAmount } = require('../utils/formatter');

/**
 * Example of a custom parser for a generic webhook or new email format
 */
const parseCustomEmail = (emailBody) => {
  // Define custom logic here
  // e.g. amount: /Received \$([\d.]+)/
  
  const amountMatch = emailBody.match(/Received\s*\$?([\d,]+\.?\d*)/i);
  const senderMatch = emailBody.match(/from\s+([A-Za-z\s]+?)\s*on/i);

  if (!amountMatch || !senderMatch) {
    return null;
  }

  return {
    provider: 'Custom',
    amount: formatAmount(amountMatch[1]),
    senderName: senderMatch[1].trim(),
    referenceId: 'N/A',
    rawAmount: amountMatch[1]
  };
};

module.exports = parseCustomEmail;
