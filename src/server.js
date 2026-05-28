const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const env = require('./config/env');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

// Route Imports
const healthRoutes = require('./routes/health.routes');
const verifyRoutes = require('./routes/verify.routes');
const webhookRoutes = require('./routes/webhook.routes');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));

// Logging
if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/webhooks', webhookRoutes);

// Base route for easy checking
app.get('/', (req, res) => {
  res.json({
    message: 'Gmail Auto Payment Verifier is running.',
    docs: 'Check README.md for setup and integration guide.',
    status: 'active'
  });
});

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
