# Web Integration Guide

Integrating this into a web application (React, Next.js, Vanilla JS) is extremely simple.

## CORS Configuration
Ensure your `CORS_ORIGIN` in the `.env` file matches your frontend domain (e.g., `https://my-game.com`).

## Vanilla JS Usage
See `src/examples/web/index.html` for a complete example using standard `fetch()`.

## React Usage
See `src/examples/react/PaymentVerifier.jsx` for a React component.

### General Flow:
1. User sees QR Code.
2. User scans and pays.
3. User clicks "Verify Payment" button on your site.
4. Your site sends a `POST /api/verify/manual-refresh` request.
5. If new transactions are returned, you find the one matching the expected amount.
6. Grant access.
