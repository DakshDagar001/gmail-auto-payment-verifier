# Gmail Auto Payment Verifier 💸

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-orange.svg)

A FREE, fully automated backend that reads incoming payment notification emails via the Gmail API, parses the transaction details (Amount, Sender, Reference ID), and stores them securely. This acts as an automated, webhook-less payment verification system for your apps and games.

*Say goodbye to expensive payment gateway fees for small transactions!*

---

## 🎯 Features

- **Automated Polling:** Uses `node-cron` to continuously check for new emails.
- **Provider Support:** Pre-built parsers for FamPay, Paytm, PhonePe, and Google Pay.
- **Customizable Parsers:** Easy regex-based custom provider support.
- **Duplicate Prevention:** In-memory caching and Firebase Firestore integration to ensure payments are only processed once.
- **Secure APIs:** API Key protected endpoints.
- **Cross-Platform Examples:** Integration examples for Android, Web, React, Python, and Electron.
- **Easy Deployment:** Ready for Railway, Render, or VPS deployment.

---

## 🏗 Architecture

1. **User pays you** using any UPI/Wallet app.
2. **You receive an email** notification on your Gmail account from the provider.
3. **This Node.js Server** polls your Gmail via OAuth2 API every X minutes.
4. **The Parser** extracts the amount, sender, and reference ID.
5. **Database (or Cache)** saves the transaction, preventing duplicates.
6. **Your App (Game/Web/Mobile)** calls this backend API to check if the payment arrived.

---

## 🚀 Setup Guide

### 1. Prerequisites
- Node.js v16+
- A Google Cloud Console project (for Gmail API)
- (Optional) Firebase project

### 2. Installation
```bash
git clone https://github.com/DakshDagar001/gmail-auto-payment-verifier.git
cd gmail-auto-payment-verifier
npm install
```

### 3. Environment Configuration
Copy the sample env file:
```bash
cp .env.example .env
```
Edit `.env` and fill in your details (API Keys, Client ID, etc.).

### 4. Gmail API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Gmail API**.
3. Create Credentials -> **OAuth client ID** (Application type: Web application or Desktop).
4. Add `http://localhost:3000/api/auth/callback` to Authorized redirect URIs.
5. Put the Client ID and Secret in your `.env`.
6. *To get a Refresh Token:* You will need to implement a quick OAuth flow script or use Google OAuth Playground to authorize your own email and retrieve a `refresh_token`.

### 5. Running the Server
```bash
npm run dev
```
Check the health status: `http://localhost:3000/api/health`

---

## 📖 API Documentation

### 1. Health Check
```http
GET /api/health
```
Returns system status.

### 2. Manual Refresh
```http
POST /api/verify/manual-refresh
X-API-KEY: your_api_key
```
Force the server to check Gmail immediately.

### 3. Get Verified Payments
```http
GET /api/verify/payments
X-API-KEY: your_api_key
```
Returns the list of recently verified payments.

---

## 📁 Detailed Documentation
Check the `docs/` folder for specific guides:
- [Android Setup](docs/ANDROID_SETUP.md)
- [Web Setup](docs/WEB_SETUP.md)
- [Custom Email Providers](docs/CUSTOM_EMAIL_SETUP.md)
- [Firebase Setup](docs/FIREBASE_SETUP.md)
- [Railway Deployment](docs/RAILWAY_DEPLOY.md)

---

## 🤝 Contribution
Pull requests are welcome! Feel free to add more parsers for different global payment providers.

---

## 👨‍💻 Credits & Support

**Developed by Fynixx Tech**

If you encounter any bugs or errors, feel free to reach out:
- **Email:** dxdeveloperrr@gmail.com
- **Telegram:** [https://t.me/only_fynixx](https://t.me/only_fynixx)

**⚠️ Do Not Steal Credit!**
