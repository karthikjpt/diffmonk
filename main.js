const { app, BrowserWindow, shell, session } = require('electron');
const path = require('path');

// Hide the Electron/Automated flags from bot detection
app.commandLine.appendSwitch('disable-blink-features', 'AutomationControlled');

const FAKE_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
app.userAgentFallback = FAKE_USER_AGENT;

function isAllowedInternalUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname;
    return host.endsWith('diffmonk.com') || host.includes('razorpay.com');
  } catch {
    return false;
  }
}

function createWindow() {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = FAKE_USER_AGENT;
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  // 🚨 NEW: Ensure native OS downloads work perfectly for compressed .gz database backups
  session.defaultSession.on('will-download', (event, item, webContents) => {
    item.setSaveDialogOptions({
        title: 'Save DiffMonk Backup',
        defaultPath: item.getFilename()
    });
  });

  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "DiffMonk",
    autoHideMenuBar: true,
    fullscreenable: true,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  // Lean handler: Internal links stay inside, everything else opens in the external browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedInternalUrl(url)) {
      return { action: 'allow' };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (!isAllowedInternalUrl(url)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  win.loadURL('https://diffmonk.com/app');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
