# Custom Email Provider Setup

If your payment provider is not FamPay, Paytm, PhonePe, or GPay, you can easily add your own.

## 1. Update the Gmail Query Filter
Open your `.env` file and change `GMAIL_QUERY_FILTER`.

For example, if you receive emails from `payments@mybank.com` with subject "Receipt":
```env
GMAIL_QUERY_FILTER="from:payments@mybank.com subject:Receipt"
```

## 2. Update Regex Patterns
Open `src/utils/regex.js` and add your pattern:

```javascript
MYBANK: {
    amount: /Total:\s*\$([0-9.]+)/i,
    senderName: /Sent by:\s*([A-Za-z\s]+)/i,
    referenceId: /Ref:\s*([A-Z0-9]+)/i
}
```

## 3. Create a Parser
Create a new file `src/parsers/mybank.parser.js` following the structure of `custom.parser.js`.

## 4. Link the Parser
Open `src/services/parser.service.js` and add your condition:

```javascript
const parseMyBank = require('../parsers/mybank.parser');

// Inside parseEmail():
if (from.includes('mybank.com')) {
    parsedData = parseMyBank(body);
}
```

Restart the server!
