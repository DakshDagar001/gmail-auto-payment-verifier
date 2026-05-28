# Railway Deployment Guide

This project includes a `railway.json` making it 1-click deployable to Railway.app.

## Steps

1. **Push to GitHub**
   Commit all your code and push it to a private or public GitHub repository.

2. **Connect to Railway**
   - Go to [Railway.app](https://railway.app/).
   - Click "New Project" -> "Deploy from GitHub repo".
   - Select your repository.

3. **Add Environment Variables**
   Before the deployment finishes, go to the **Variables** tab in Railway.
   Add all the variables from your `.env.example` file.
   *Crucial: Ensure `GMAIL_REFRESH_TOKEN` is valid.*

4. **Deploy**
   Railway will automatically detect `npm start` from the `package.json` and deploy your app using Nixpacks.

5. **Get your Public URL**
   Go to the **Settings** tab in Railway and click "Generate Domain".
   Use this domain in your frontend/mobile apps!
