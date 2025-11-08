# Manarion Item Notifications Server

A simple server for coordinating item drop notifications between users of the Manarion Alerter userscript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or set a custom port:
```bash
PORT=3001 npm start
```

## API Endpoints

### POST /api/drop
Report an item drop.

**Request Body:**
```json
{
  "userId": "user_123",
  "userName": "PlayerName",
  "itemName": "Bound Codex",
  "rarity": "epic",
  "itemId": "12345"
}
```

### GET /api/drops
Get recent drops for items you're tracking.

**Query Parameters:**
- `userId` - Your user ID (to exclude your own drops)
- `since` - Timestamp to get drops since (default: 1 hour ago)
- `trackedItems` - JSON array or comma-separated list of item names to track

**Example:**
```
GET /api/drops?userId=user_123&trackedItems=["Bound Codex","Egg"]
```

### POST /api/subscribe
Subscribe to specific items (optional, for future use).

### GET /api/stats
Get server statistics.

## Deployment

You can deploy this to any Node.js hosting service:
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- Vercel (with serverless functions)
- AWS Lambda
- etc.

For production, consider:
- Adding a database (MongoDB, PostgreSQL, etc.) instead of in-memory storage
- Adding authentication/rate limiting
- Adding persistent user subscriptions
- Adding WebSocket support for real-time updates

