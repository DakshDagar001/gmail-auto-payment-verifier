const { app, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios'); // Requires 'npm install axios' in your electron project

const API_BASE = 'http://localhost:3000';
const API_KEY = 'your_super_secret_api_key_here';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Listen for a trigger from the renderer process
ipcMain.handle('verify-payment', async () => {
  try {
    const response = await axios.post(`${API_BASE}/api/verify/manual-refresh`, {}, {
      headers: { 'x-api-key': API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error.message);
    return { success: false, error: error.message };
  }
});
