# Deployment Guide

## Railway (Recommended - Easiest)

1. **Sign up**: Go to https://railway.app and sign up with GitHub
2. **Create new project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select repository**: Choose your repository (or fork this one)
4. **Configure**:
   - Root Directory: `server`
   - Build Command: `npm install` (or leave blank, Railway auto-detects)
   - Start Command: `npm start`
5. **Set environment variable** (optional):
   - `PORT` - Railway will set this automatically, but you can override if needed
6. **Deploy**: Railway will automatically deploy
7. **Get URL**: Click on your service → Settings → Copy the domain (e.g., `your-app.up.railway.app`)
8. **Update userscript**: Use `https://your-app.up.railway.app` as the server URL

Railway provides HTTPS automatically and gives you $5/month free credit (usually enough for small apps).

## Render

1. **Sign up**: Go to https://render.com and sign up
2. **New Web Service**: Click "New" → "Web Service"
3. **Connect repository**: Link your GitHub repo
4. **Configure**:
   - Name: `manarion-item-notifications`
   - Environment: `Node`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
5. **Deploy**: Click "Create Web Service"
6. **Get URL**: Your service will be at `your-app.onrender.com`
7. **Update userscript**: Use `https://your-app.onrender.com` as the server URL

**Note**: Free tier spins down after 15 minutes of inactivity, so first request after inactivity may be slow.

## Fly.io

1. **Install flyctl**: 
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   
   # Mac/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login**: `flyctl auth login`

3. **Initialize**: In the `server` directory:
   ```bash
   flyctl launch
   ```
   - App name: (choose a name)
   - Region: (choose closest)
   - PostgreSQL: No
   - Redis: No

4. **Deploy**: `flyctl deploy`

5. **Get URL**: `flyctl open` or check dashboard

6. **Update userscript**: Use your Fly.io URL

## Vercel (Serverless - Requires Code Changes)

Vercel uses serverless functions. You'd need to convert the Express app to serverless functions. This is more complex but possible.

## Environment Variables

For all platforms, you can set:
- `PORT`: Usually auto-set by platform, but you can override

## Important Notes

- **HTTPS**: All platforms provide HTTPS automatically
- **CORS**: The server already has CORS enabled, so it should work from any domain
- **Free Tier Limits**: 
  - Railway: $5/month credit (usually enough)
  - Render: Spins down after inactivity
  - Fly.io: 3 shared VMs, 3GB storage
- **Database**: Current implementation uses in-memory storage. For production, consider adding a database (MongoDB Atlas has a free tier, or Render provides free PostgreSQL)

## Testing Your Deployment

After deploying, test your server:

```bash
# Test the stats endpoint
curl https://your-app-url.com/api/stats

# Test reporting a drop
curl -X POST https://your-app-url.com/api/drop \
  -H "Content-Type: application/json" \
  -d '{"userName":"TestUser","itemName":"Bound Codex","rarity":"epic"}'

# Test getting drops
curl "https://your-app-url.com/api/drops?userId=test123"
```

## Updating the Userscript

After deploying, update the server URL in the userscript settings:
1. Click "Alerts" button in Manarion
2. Scroll to "Item Drop Notifications"
3. Update "Server URL" to your deployed URL (use `https://` not `http://`)

