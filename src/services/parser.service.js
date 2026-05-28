const parseFamPayEmail = require('../parsers/fampay.parser');
const parsePaytmEmail = require('../parsers/paytm.parser');
const parsePhonePeEmail = require('../parsers/phonepe.parser');
const parseGPayEmail = require('../parsers/gpay.parser');
const parseCustomEmail = require('../parsers/custom.parser');

const parseEmail = (email) => {
  const body = email.body || '';
  const from = email.from.toLowerCase();
  const subject = email.subject.toLowerCase();

  let parsedData = null;

  // Route to the appropriate parser based on sender or subject
  if (from.includes('famapp') || subject.includes('fampay')) {
    parsedData = parseFamPayEmail(body);
  } else if (from.includes('paytm') || subject.includes('paytm')) {
    parsedData = parsePaytmEmail(body);
  } else if (from.includes('phonepe') || subject.includes('phonepe')) {
    parsedData = parsePhonePeEmail(body);
  } else if (from.includes('google') && (subject.includes('pay') || subject.includes('gpay'))) {
    parsedData = parseGPayEmail(body);
  } else {
    // Fallback to custom parser
    parsedData = parseCustomEmail(body);
  }

  if (parsedData) {
    return {
      ...parsedData,
      emailId: email.id,
      emailDate: email.date
    };
  }

  return null;
};

module.exports = {
  parseEmail
};
