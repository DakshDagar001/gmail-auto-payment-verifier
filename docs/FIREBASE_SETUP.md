# Firebase Setup

By default, the app uses an In-Memory cache to prevent duplicate payments. This is fine for testing, but if your server restarts, the memory is cleared.

For production, you should use Firebase Firestore.

## 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Go to **Firestore Database** and create a database.

## 2. Generate Service Account Key
1. Go to Project Settings (gear icon) -> Service accounts.
2. Click **Generate new private key**.
3. This downloads a JSON file.

## 3. Configure Environment
Open your `.env` file and map the fields from the JSON file:

\`\`\`env
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
\`\`\`

*Note: Ensure `\n` is explicitly written in the `.env` string for the private key to parse correctly.*

## 4. Restart Server
The server will now say `Firebase initialized successfully` on boot.
