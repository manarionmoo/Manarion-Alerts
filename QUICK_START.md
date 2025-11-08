# Quick Start Guide

## Fastest Deployment: Railway (5 minutes)

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **Click**: "New Project" → "Deploy from GitHub repo"
4. **Select** your repo (or create a new repo with the `server` folder)
5. **Set Root Directory**: `server` (in project settings)
6. **Deploy**: Railway auto-detects Node.js and deploys
7. **Copy URL**: Click your service → Settings → Copy the domain
8. **Update userscript**: Use `https://your-app.up.railway.app` in settings

That's it! Railway gives you $5/month free credit which is plenty for this app.

## Alternative: Render (Also Free)

1. **Go to**: https://render.com
2. **Sign up** with GitHub
3. **Click**: "New" → "Web Service"
4. **Connect** your GitHub repo
5. **Configure**:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: **Free**
6. **Deploy** and copy your URL

**Note**: Render's free tier spins down after 15 min of inactivity (first request may be slow).

## Update Your Userscript

After deploying, update the server URL:

1. Open Manarion
2. Click the **"Alerts"** button in navigation
3. Scroll to **"Item Drop Notifications"**
4. Paste your server URL (e.g., `https://your-app.up.railway.app`)
5. Configure tracked items (e.g., "Bound Codex", "Egg", "Orb of Power")
6. Enable "Share my drops" and "See other users' drops"

## Test It

1. Get an item in-game (check your Loot Tracker)
2. The script should automatically report it to the server
3. If someone else has that item tracked, they'll see a chat message!

## Troubleshooting

- **Can't connect**: Make sure you're using `https://` not `http://`
- **No drops showing**: Check browser console (F12) for errors
- **Server not responding**: Check server logs in Railway/Render dashboard

