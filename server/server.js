const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Root route - simple health check
app.get('/', (req, res) => {
  res.json({
    service: 'Manarion Item Notifications Server',
    status: 'running',
    endpoints: {
      'POST /api/drop': 'Report an item drop',
      'GET /api/drops': 'Get recent drops for tracked items',
      'POST /api/subscribe': 'Subscribe to specific items',
      'GET /api/stats': 'Get server statistics'
    },
    version: '1.0.0'
  });
});

// In-memory storage (in production, use a database)
const drops = []; // Array of { userId, userName, itemName, rarity, timestamp, id }
const userSubscriptions = {}; // userId -> Set of item names they're tracking

// Clean up old drops (older than 1 hour)
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const initialLength = drops.length;
  for (let i = drops.length - 1; i >= 0; i--) {
    if (drops[i].timestamp < oneHourAgo) {
      drops.splice(i, 1);
    }
  }
  if (drops.length < initialLength) {
    console.log(`Cleaned up ${initialLength - drops.length} old drops`);
  }
}, 5 * 60 * 1000); // Run every 5 minutes

// Generate unique ID for a user
function generateUserId() {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// POST /api/drop - Report an item drop
app.post('/api/drop', (req, res) => {
  const { userId, userName, itemName, rarity, itemId } = req.body;
  
  if (!itemName) {
    return res.status(400).json({ error: 'itemName is required' });
  }

  const drop = {
    id: `drop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: userId || generateUserId(),
    userName: userName || 'Unknown',
    itemName: itemName.trim(),
    rarity: rarity || 'common',
    itemId: itemId || null,
    timestamp: Date.now()
  };

  drops.push(drop);
  
  // Keep only last 1000 drops
  if (drops.length > 1000) {
    drops.shift();
  }

  console.log(`Drop reported: ${drop.userName} got ${drop.itemName} (${drop.rarity})`);
  
  res.json({ success: true, drop });
});

// GET /api/drops - Get recent drops for items the user is tracking
app.get('/api/drops', (req, res) => {
  const { userId, since, trackedItems } = req.query;
  
  // Parse trackedItems from comma-separated string or JSON
  let itemsToTrack = [];
  if (trackedItems) {
    try {
      itemsToTrack = JSON.parse(trackedItems);
    } catch {
      itemsToTrack = trackedItems.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  const sinceTimestamp = since ? parseInt(since, 10) : Date.now() - 60 * 60 * 1000; // Default: last hour
  
  // Filter drops
  let filteredDrops = drops.filter(drop => {
    // Only show drops from other users
    if (userId && drop.userId === userId) {
      return false;
    }
    
    // If user has tracked items, only show matching drops
    if (itemsToTrack.length > 0) {
      return drop.timestamp >= sinceTimestamp && 
             itemsToTrack.some(tracked => 
               drop.itemName.toLowerCase().includes(tracked.toLowerCase()) ||
               tracked.toLowerCase().includes(drop.itemName.toLowerCase())
             );
    }
    
    // Otherwise show all recent drops
    return drop.timestamp >= sinceTimestamp;
  });

  // Sort by timestamp (newest first)
  filteredDrops.sort((a, b) => b.timestamp - a.timestamp);
  
  // Limit to 50 most recent
  filteredDrops = filteredDrops.slice(0, 50);

  res.json({ drops: filteredDrops });
});

// POST /api/subscribe - Subscribe to specific items
app.post('/api/subscribe', (req, res) => {
  const { userId, items } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  if (!userSubscriptions[userId]) {
    userSubscriptions[userId] = new Set();
  }

  const itemsArray = Array.isArray(items) ? items : [items];
  itemsArray.forEach(item => {
    if (item && typeof item === 'string') {
      userSubscriptions[userId].add(item.trim().toLowerCase());
    }
  });

  res.json({ 
    success: true, 
    subscribedItems: Array.from(userSubscriptions[userId]) 
  });
});

// GET /api/stats - Get server statistics
app.get('/api/stats', (req, res) => {
  res.json({
    totalDrops: drops.length,
    activeUsers: Object.keys(userSubscriptions).length,
    recentDrops: drops.filter(d => d.timestamp > Date.now() - 60 * 60 * 1000).length
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Manarion Item Notifications Server running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  POST /api/drop - Report an item drop`);
  console.log(`  GET  /api/drops - Get recent drops`);
  console.log(`  POST /api/subscribe - Subscribe to items`);
  console.log(`  GET  /api/stats - Get server stats`);
});

