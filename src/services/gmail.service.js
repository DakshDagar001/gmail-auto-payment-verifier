const { getGmailClient } = require('../config/gmail');
const { decodeBase64 } = require('../utils/helpers');
const env = require('../config/env');
const logger = require('../utils/logger');

const fetchRecentEmails = async (maxResults = 10) => {
  try {
    const gmail = getGmailClient();
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: env.gmail.queryFilter,
      maxResults
    });

    const messages = response.data.messages;
    if (!messages || messages.length === 0) {
      logger.debug('No new payment emails found.');
      return [];
    }

    const emailDetails = [];

    for (const msg of messages) {
      const msgData = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'full'
      });

      const payload = msgData.data.payload;
      const headers = payload.headers;
      
      const subject = headers.find(h => h.name === 'Subject')?.value || '';
      const from = headers.find(h => h.name === 'From')?.value || '';
      const date = headers.find(h => h.name === 'Date')?.value || '';

      // Extract body
      let body = '';
      if (payload.parts) {
        // multipart
        const part = payload.parts.find(p => p.mimeType === 'text/plain' || p.mimeType === 'text/html');
        if (part && part.body && part.body.data) {
          body = decodeBase64(part.body.data);
        }
      } else if (payload.body && payload.body.data) {
        body = decodeBase64(payload.body.data);
      }

      emailDetails.push({
        id: msg.id,
        subject,
        from,
        date,
        body
      });
    }

    return emailDetails;

  } catch (error) {
    logger.error('Error fetching emails from Gmail API:', error.message);
    throw error;
  }
};

module.exports = {
  fetchRecentEmails
};
