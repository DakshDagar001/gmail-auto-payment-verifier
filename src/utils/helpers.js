/**
 * Delay execution for a given number of milliseconds
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Basic base64 decode for Gmail API email body
 */
const decodeBase64 = (encodedStr) => {
  if (!encodedStr) return '';
  return Buffer.from(encodedStr.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
};

module.exports = {
  sleep,
  decodeBase64
};
