<div align="center">
  <img src="assets/icon.png" alt="DiffMonk Logo" width="120" height="120">
  <h1>DiffMonk</h1>
  <p><b>See exactly what the AI changed before it goes into your code.</b></p>

  <br>
  <i>Private, client-side code and text comparison with moved-block detection, optional ghost lines and up to 4 panes. Your text never leaves the app.</i>
  <br>
</div>

---

## ⚡ What is DiffMonk?

DiffMonk is a comparison workspace for the moments when spinning up a Git diff is more friction than the task. Paste your code on the left and an AI's version (or a config, SQL query or JSON payload) on the right. Changed, edited and moved blocks are marked in the gutter, so a reordered file doesn't turn the whole screen red.

This repository contains the open-source Electron desktop wrapper. The comparison engine runs entirely in your browser or in the desktop app: the diff, syntax highlighting and snapshot storage all happen locally, and your code is never uploaded.

> DiffMonk is **not** a Git client or an IDE replacement. If the files are already in a local repo, use Git. DiffMonk is for ad-hoc comparisons, AI output audits and quick peer reviews.

## 🚀 Key Features

* **Moved-block detection:** A Patience LIS plus fuzzy block pass flags blocks (2+ lines) that were moved rather than rewritten, so reordered functions aren't reported as deletions.
* **Two-channel gutter:** Gutter colour shows content status (green for matched, yellow for edited, red for mismatched). A separate right-hand border shows a position shift, which avoids "rainbow fatigue".
* **Optional ghost lines:** Align insertions and deletions side by side with virtual filler lines. They are UI only, so copying or exporting never includes fake blank lines. Turn them off to keep real row-for-row line numbers.
* **Block view:** Split files into functions and classes by indentation scope, and filter to unique blocks to spot what was dropped or added.
* **Up to 4 panes:** Compare an original against several AI drafts. Pane 1 is compared against whichever pane you last focused.
* **Change explainer:** Double-click any line number for a rule-based, token-level breakdown, including invisible indentation shifts. It's deterministic, so there are no AI hallucinations.
* **Push and swap:** Right-click a line or gutter to move blocks between panes and cherry-pick the parts you want.
* **Noise controls:** Ignore whitespace (on by default), match case, hide matched rows and collapse empty gaps.
* **Snapshots and backups:** Take manual or automatic snapshots before risky edits and store them in local IndexedDB. Export or import everything as a compressed `.json.gz` archive.
* **Audit notes and PDF:** Attach Low, Medium or High priority notes to a code range, pinned to a snapshot, and print a clean PDF report.
* **Live Telecast:** Share a live workspace peer to peer over WebRTC with Yjs collaborative editing. You approve every join request, and viewers need only a browser and your Session ID.
* **Works offline:** After the first load, diffing, snapshots, notes and exports work without a connection. Live Telecast needs a network, or a local intranet signaling server.

---

## 📥 Downloads

Get the latest standalone desktop apps from the [Releases page](https://github.com/karthikjpt/diffmonk/releases/latest).

### Version 1.0.1

* **Windows (64-bit):** [Download .exe](https://github.com/karthikjpt/diffmonk/releases/download/untagged-6613b096d14e2ba9ba57/DiffMonk-Setup-1.0.1.exe)
* **macOS (Universal):** [Download .zip](https://github.com/karthikjpt/diffmonk/releases/download/untagged-6613b096d14e2ba9ba57/DiffMonk-1.0.1-universal-mac.zip)
* **Linux (Debian/Ubuntu):** [Download .deb](https://github.com/karthikjpt/diffmonk/releases/download/untagged-6613b096d14e2ba9ba57/diffmonk_1.0.1_amd64.deb)
* **Linux (AppImage):** [Download .AppImage](https://github.com/karthikjpt/diffmonk/releases/download/untagged-6613b096d14e2ba9ba57/DiffMonk-1.0.1.AppImage)

Prefer not to install anything? Use the web version at [diffmonk.com](https://diffmonk.com) (a live demo is on the home page), or open the app directly at [diffmonk.com/app](https://diffmonk.com/app).

---

## 💳 Plans

| Plan | Price | Devices | Includes |
| --- | --- | --- | --- |
| **Free Basic** | ₹0 forever, no signup | n/a | 2-pane comparison (Line and Block view), ghost lines, gutter explainer, push/swap, local snapshots and `.json.gz` export/import, joining a teammate's Telecast |
| **Personal** | ₹499 / year | 1 | 3 and 4 panes, hosting Live Telecasts (custom TURN and signaling), audit notes and PDF export, themes |
| **Professional** | ₹999 / year | 2 | Everything in Personal, web app and desktop app |
| **Team** | ₹2,499 / year | 5 | Everything in Personal, single admin dashboard, instant device revocation |

A free account gets a 7-day Pro trial with no card needed. Pricing is flat annual with no auto-renewal. If a trial or licence expires, DiffMonk downloads a full `.json.gz` backup of your workspaces and drops back to Free Basic mode. See the [refund policy](https://diffmonk.com/refunds).

---

## 🔒 Security & Privacy

All diffing, syntax highlighting and snapshot storage run locally using `IndexedDB` and `localStorage`. Our servers never receive, store or log the code or notes you type. The server database holds only account, device, licence and payment records, and has no tables for snippets, workspaces or notes.

**Verify it yourself:** open DevTools, switch to the Network tab and paste code. No request carries your code. In guest mode there are no background API calls. When logged in, the app only calls `GET /api/license-heartbeat` (trial/licence check) and `POST /api/register-device-profile` (your device label, so you can manage devices from your account page).

**Live Telecast:** Session data travels directly between browsers over WebRTC data channels. By default, connection setup uses the PeerJS signaling server and public STUN servers. For corporate networks you can set your own TURN relay and signaling server, and enable Strict Firewall Mode to block fallback to the public PeerJS cloud. Anyone you admit receives the active panes and notes and can save a local copy. You can kick peers or revoke edit and scroll permissions at any time.

**About this wrapper:** The desktop app is a small Electron shell (`main.js`) that opens `https://diffmonk.com/app` in a sandboxed window (`contextIsolation` on, `nodeIntegration` off, `sandbox` on). It:

1. Keeps navigation inside DiffMonk (and its payment provider) and opens every other link in your system browser.
2. Sends a standard Chrome user agent and hides Chromium's automation flag, so sign-in and checkout pages aren't blocked by bot detection.
3. Shows a native save dialog for `.json.gz` backup downloads.

It does not read your files or add any tracking of its own.

**Your data is yours.** We do not track keystrokes, we do not upload your code to our servers, and we do not use it to train AI models.

---

## ⚠️ Know the Limits

* **Not a Git client:** No repo cloning, no `.git` folders and no 3-way merge conflict resolution.
* **Pairwise comparison:** In 3 and 4 pane mode, Pane 1 is compared against the pane you last focused. The others stay visible as plain highlighted text, so it is not a 4-way matrix.
* **Whitespace is ignored by default:** Turn this off for Python, YAML or other indentation-significant code.
* **Size caps:** Each pane warns above 10,000 lines or 500,000 characters, and ghost-line alignment caps at 4,000 combined lines. If a diff stalls for more than 10 seconds, live diffing pauses and an emergency `.json.gz` backup downloads. For huge logs, use `git diff` or Beyond Compare.
* **You own the backups:** Workspaces live in your browser's unencrypted IndexedDB. Clearing site data or using a private window erases them unless you export first. On shared machines, use **Clear Data & Log Out**.
* **Regex highlighter:** Fast, but it is not a full language-server parser.

---

## 🛠️ Build from Source

```bash
npm install
npm start          # run the desktop wrapper
npm run build      # package with electron-builder (output in dist/)
```

Release builds for Windows, macOS (universal) and Linux run through GitHub Actions when you push a `v*` tag.

App icons live in `assets/`. `icon.png` must be square and at least 512×512, and `icon.ico` must include a 256×256 image.

## 💬 Support & Legal

* [Documentation](https://diffmonk.com/docs)
* [Terms of Service](https://diffmonk.com/terms)
* [Privacy Policy](https://diffmonk.com/privacy)
* [Refunds](https://diffmonk.com/refunds)
* For technical issues or account deletion requests, please contact: `support@diffmonk.com`

---
<div align="center">
  <small>&copy; 2026 DiffMonk. Local-first developer tools.</small>
</div>
