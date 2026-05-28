const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { requireApiKey } = require('../middleware/auth.middleware');

// If you integrate with external payment gateways that support webhooks natively
// you can define those endpoints here.

router.post('/generic', requireApiKey, (req, res) => {
  const data = req.body;
  
  logger.info('Received generic webhook data:', JSON.stringify(data));
  
  // Example of handling raw incoming data
  res.json({
    success: true,
    message: 'Webhook received'
  });
});

module.exports = router;
