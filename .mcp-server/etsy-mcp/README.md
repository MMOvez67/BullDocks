# Etsy MCP Server for Bulldocks

Model Context Protocol (MCP) server for autonomous Etsy shop management and order tracking.

## Setup

### 1. Install Dependencies
```bash
cd /Users/mac/projects/bulldocks/.mcp-server/etsy-mcp
npm install
```

### 2. Create Credentials File
Create `etsy-keys.json` in this directory (gitignored):
```json
{
  "api_key": "YOUR_ETSY_API_KEY",
  "access_token": "YOUR_ETSY_ACCESS_TOKEN",
  "shop_id": "YOUR_ETSY_SHOP_ID"
}
```

**Where to get these:**
- Visit https://www.etsy.com/developers/
- Create an app → get API key
- Authorize the app on your shop → get access token
- Your shop ID is visible in your Etsy dashboard URL

### 3. Configure in `.mcp.json`
Add to your `.mcp.json` (in project root):
```json
{
  "mcpServers": {
    "etsy": {
      "command": "node",
      "args": ["/Users/mac/projects/bulldocks/.mcp-server/etsy-mcp/src/index.js"],
      "env": {
        "ETSY_KEY_FILE": "/Users/mac/projects/bulldocks/.mcp-server/etsy-mcp/etsy-keys.json"
      }
    }
  }
}
```

## Resources

### `etsy://shop/orders`
Fetch all orders (pagination-ready):
```json
{
  "results": [
    {
      "order_id": 123456,
      "buyer_name": "John Doe",
      "create_timestamp": 1689123456,
      "status": "paid",
      "total_price": "29.99",
      "listings": [
        {
          "listing_id": 789,
          "title": "Bulldocks Standard"
        }
      ]
    }
  ]
}
```

### `etsy://shop/listings`
Fetch all active listings with inventory:
```json
{
  "results": [
    {
      "listing_id": 789,
      "title": "Bulldocks Standard",
      "price": "29.99",
      "quantity": 100,
      "state": "active",
      "images": [...]
    }
  ]
}
```

### `etsy://shop/reviews`
Fetch customer reviews:
```json
{
  "results": [
    {
      "review_id": 12345,
      "rating": 5,
      "review_text": "Great product!",
      "create_timestamp": 1689123456,
      "reviewer_name": "Jane Smith"
    }
  ]
}
```

### `etsy://shop/stats`
Shop statistics (sales, trends):
```json
{
  "results": [
    {
      "date": "2026-03-15",
      "orders": 5,
      "revenue": 149.95,
      "views": 250
    }
  ]
}
```

## Tools

### `fetch_orders`
Retrieve orders with optional filtering:
```json
{
  "limit": 50,
  "status": "paid",
  "days_back": 7
}
```

### `create_listing`
Create a new product listing:
```json
{
  "title": "Bulldocks Pro Angular",
  "description": "WDF-compliant dart mount...",
  "price": 39.99,
  "quantity": 50,
  "tags": ["dart", "mount", "no-drill", "wdf"],
  "category_id": 12345
}
```

### `update_listing`
Update price or quantity:
```json
{
  "listing_id": 789,
  "quantity": 50,
  "price": 29.99
}
```

### `send_buyer_message`
Send a message to a buyer:
```json
{
  "user_id": 456,
  "message": "Thanks for your order!",
  "order_id": 123456
}
```

### `get_reviews`
Fetch shop reviews:
```json
{
  "limit": 50,
  "rating": 4
}
```

## Testing

Test the MCP server:
```bash
npm start
```

Then in another terminal, test a resource fetch (requires `.mcp.json` setup):
```bash
curl -X POST http://localhost:3000/mcp/read \
  -H "Content-Type: application/json" \
  -d '{"uri": "etsy://shop/orders"}'
```

## n8n Integration

### Example: Auto-trigger on new orders
1. Create n8n workflow with MCP trigger
2. Connect to `etsy://shop/orders` resource
3. Filter for `status: "paid"`
4. Action: Send Slack notification + update inventory

### Example: Daily sales report
1. Schedule trigger: 8 AM daily
2. MCP call: `fetch_orders(limit=100, days_back=1)`
3. Action: Format + send to Slack

## Security Notes

- ✅ API keys NEVER in Git (only in `.mcp.json` + `.gitignore`)
- ✅ Access tokens auto-refresh (Etsy OAuth2)
- ✅ All API calls rate-limited (Etsy: 10req/sec)
- ✅ PII (customer names, emails) logged only when necessary
