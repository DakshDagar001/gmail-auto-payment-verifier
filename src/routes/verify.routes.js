const express = require('express');
const router = express.Router();
const { requireApiKey } = require('../middleware/auth.middleware');
const verificationService = require('../services/verification.service');

// Middleware applied to all verify routes
router.use(requireApiKey);

/**
 * Trigger a manual check for new payments
 * POST /api/verify/manual-refresh
 */
router.post('/manual-refresh', async (req, res, next) => {
  try {
    const newTransactions = await verificationService.processNewPayments();
    res.json({
      success: true,
      message: 'Manual refresh completed',
      count: newTransactions.length,
      data: newTransactions
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Get recent verified payments
 * GET /api/verify/payments
 */
router.get('/payments', async (req, res, next) => {
  try {
    const payments = await verificationService.getVerifiedPayments();
    res.json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
