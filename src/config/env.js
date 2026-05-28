require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiKey: process.env.API_KEY || 'default_dev_key_change_in_production',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  gmail: {
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    redirectUri: process.env.GMAIL_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    queryFilter: process.env.GMAIL_QUERY_FILTER || 'subject:payment',
  },
  cronSchedule: process.env.CRON_SCHEDULE || '*/2 * * * *',
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined
  }
};
