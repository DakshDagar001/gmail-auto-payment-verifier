const { google } = require('googleapis');
const env = require('./env');
const logger = require('../utils/logger');

let oAuth2Client;

const initGmailAuth = () => {
  if (oAuth2Client) return oAuth2Client;

  if (!env.gmail.clientId || !env.gmail.clientSecret) {
    logger.warn('Gmail OAuth credentials not found in env. Email reading will fail.');
    return null;
  }

  oAuth2Client = new google.auth.OAuth2(
    env.gmail.clientId,
    env.gmail.clientSecret,
    env.gmail.redirectUri
  );

  if (env.gmail.refreshToken) {
    oAuth2Client.setCredentials({
      refresh_token: env.gmail.refreshToken
    });
    logger.info('Gmail OAuth credentials loaded from refresh token.');
  } else {
    logger.warn('GMAIL_REFRESH_TOKEN not set. You must authenticate to get one.');
  }

  return oAuth2Client;
};

const getGmailClient = () => {
  const auth = initGmailAuth();
  if (!auth) throw new Error('OAuth2Client not initialized');
  return google.gmail({ version: 'v1', auth });
};

module.exports = {
  initGmailAuth,
  getGmailClient,
  getOAuth2Client: () => oAuth2Client
};
