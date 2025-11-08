# Render Deployment - Step by Step

## Step 1: Create GitHub Repository (if needed)

If you don't have the code on GitHub yet:

1. Go to https://github.com/new
2. Create a new repository (name it something like `manarion-item-notifications`)
3. Upload your files:
   - Upload the `server` folder contents
   - Upload `Alerter.user.js`
   - Upload `README.md` and other docs

**OR** if you already have the files locally, use Git:

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 2: Deploy on Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click**: "New +" button (top right)
3. **Select**: "Web Service"
4. **Connect Repository**:
   - If first time: Click "Connect account" → Authorize GitHub
   - Select your repository from the list
   - Click "Connect"

## Step 3: Configure the Service

Fill in these settings:

- **Name**: `manarion-item-notifications` (or any name you want)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main` (or `master` if that's your branch)
- **Root Directory**: `server` ⚠️ **IMPORTANT: Set this to `server`**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Select **"Free"** (the free tier)

## Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying
3. Wait 2-3 minutes for deployment to complete
4. You'll see logs showing the build process

## Step 5: Get Your URL

1. Once deployed, you'll see a green "Live" status
2. Your URL will be shown at the top: `https://your-app-name.onrender.com`
3. **Copy this URL** - you'll need it for the userscript

## Step 6: Test Your Server

Open your browser and visit:
```
https://your-app-name.onrender.com/api/stats
```

You should see JSON like:
```json
{
  "totalDrops": 0,
  "activeUsers": 0,
  "recentDrops": 0
}
```

If you see this, your server is working! ✅

## Step 7: Update Your Userscript

1. Open Manarion in your browser
2. Click the **"Alerts"** button in the navigation
3. Scroll down to **"Item Drop Notifications"**
4. Paste your Render URL in **"Server URL"**: `https://your-app-name.onrender.com`
5. (Optional) Set your display name
6. Enable **"Share my drops"** checkbox
7. Enable **"See other users' drops"** checkbox
8. Add tracked items (one per line), for example:
   ```
   Bound Codex
   Egg
   Orb of Power
   Orb of Chaos
   ```
9. Click outside the modal to save

## Step 8: Test It!

1. Get an item in-game (check your Loot Tracker)
2. The script should automatically detect it and send it to the server
3. Check browser console (F12) - you should see: `[Manarion Alerter] Reported drop: ItemName`
4. If someone else has that item tracked, they'll see a chat message!

## Troubleshooting

### Server not responding?
- Check Render dashboard → Your service → Logs
- Look for any error messages
- Make sure Root Directory is set to `server`

### Can't connect from userscript?
- Make sure you're using `https://` not `http://`
- Check browser console (F12) for CORS errors
- Verify the URL is correct (no trailing slash)

### First request is slow?
- Render free tier spins down after 15 min of inactivity
- First request after spin-down takes ~30 seconds to wake up
- This is normal for free tier

### Want to keep it awake?
- You can use a service like https://uptimerobot.com (free) to ping your server every 5 minutes
- Or upgrade to Render's paid plan ($7/month) for always-on

## Next Steps

- Share your server URL with other users so they can use it too!
- Monitor your server logs in Render dashboard
- Consider adding a database later if you want persistent storage

