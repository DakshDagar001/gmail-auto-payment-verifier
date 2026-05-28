const express = require('express');
const router = express.Router();
const env = require('../config/env');
const { getDb } = require('../config/firebase');

router.get('/', (req, res) => {
  const firebaseStatus = getDb() ? 'connected' : 'not_configured_using_memory';
  
  res.json({
    success: true,
    status: 'ok',
    environment: env.nodeEnv,
    database: firebaseStatus,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
