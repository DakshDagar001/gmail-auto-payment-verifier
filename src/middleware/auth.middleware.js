const env = require('../config/env');

const requireApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey || apiKey !== env.apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing API Key'
    });
  }

  next();
};

module.exports = {
  requireApiKey
};
