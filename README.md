# Manarion Alerter - Item Drop Notifications

A userscript that adds custom item drop notifications and allows users to share drops with each other via a server.

## Features

- **Quest Completion Alerts**: Get notified when quests can be turned in (original feature)
- **Item Drop Sharing**: Automatically share your item drops with other users
- **Other Users' Drops**: See when other users get items you're tracking
- **Customizable Tracking**: Choose which items you want to be notified about
- **Fake Chat Messages**: Drops from other users appear as chat messages

## Setup

### 1. Install the Server

The server coordinates item drops between users. You can host it anywhere that supports Node.js.

```bash
cd server
npm install
npm start
```

The server will run on port 3000 by default (or the PORT environment variable).

**For production**, update the server URL in the userscript settings to point to your deployed server.

### 2. Install the Userscript

1. Install a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
2. Copy the contents of `Alerter.user.js` into a new userscript
3. Update the server URL in the settings (click the "Alerts" button in Manarion)

### 3. Configure Settings

1. Click the "Alerts" button in Manarion's navigation
2. Scroll to "Item Drop Notifications"
3. Configure:
   - **Server URL**: Your server URL (default: `http://localhost:3000`)
   - **Your Display Name**: Optional name shown to others
   - **Share my drops**: Toggle to share your drops
   - **See other users' drops**: Toggle to see others' drops
   - **Tracked Items**: List of item names (one per line) you want notifications for

## How It Works

1. **Loot Tracker Monitoring**: The script monitors the Loot Tracker panel for new items
2. **Drop Reporting**: When you get a new item, it's sent to the server
3. **Polling**: The script polls the server every 10 seconds (configurable) for new drops
4. **Chat Injection**: When someone else gets a tracked item, a fake chat message appears

## Server Deployment

You can deploy the server to:
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo
- **DigitalOcean App Platform**: Connect GitHub repo
- **Vercel**: Use serverless functions
- **Any Node.js hosting**: Upload files and run `npm start`

### Environment Variables

- `PORT`: Port to run on (default: 3000)

### Production Considerations

For production, consider:
- Adding a database (MongoDB, PostgreSQL) instead of in-memory storage
- Adding authentication/rate limiting
- Adding WebSocket support for real-time updates
- Adding persistent user subscriptions

## Troubleshooting

- **Drops not being shared**: Check that "Share my drops" is enabled and the server URL is correct
- **Not seeing others' drops**: Check that "See other users' drops" is enabled and you have items in "Tracked Items"
- **Server connection errors**: Make sure the server is running and the URL is correct (use `http://` or `https://` as appropriate)
- **Chat messages not appearing**: The script tries to find the chat container automatically; if it can't find it, check the browser console

## Privacy

- Your user ID is stored locally and never shared
- Only item names and rarities are shared (no personal information)
- Display name is optional
- All settings are stored locally in your browser

## License

MIT

