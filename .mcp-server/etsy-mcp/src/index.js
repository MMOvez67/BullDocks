#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  TextContent,
  Tool,
  Resource
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ETSY_API_BASE = 'https://openapi.etsy.com/v3/application';
const ETSY_KEY_PATH = process.env.ETSY_KEY_FILE || path.join(path.dirname(__dirname), '..', 'etsy-keys.json');

let CONFIG = {
  api_key: process.env.ETSY_API_KEY || '',
  access_token: process.env.ETSY_ACCESS_TOKEN || '',
  shop_id: process.env.ETSY_SHOP_ID || ''
};

// Load credentials from file if available
try {
  if (CONFIG.api_key === '' && ETSY_KEY_PATH) {
    const keys = JSON.parse(readFileSync(ETSY_KEY_PATH, 'utf8'));
    CONFIG = { ...CONFIG, ...keys };
  }
} catch (e) {
  console.error('Warning: Could not load Etsy credentials from file');
}

const server = new Server({
  name: 'etsy-mcp',
  version: '1.0.0'
});

// ============================================================================
// RESOURCES
// ============================================================================

const RESOURCES = [
  {
    uri: 'etsy://shop/orders',
    name: 'Shop Orders',
    description: 'All orders for the Etsy shop with pagination and filtering',
    mimeType: 'application/json'
  },
  {
    uri: 'etsy://shop/listings',
    name: 'Shop Listings',
    description: 'All active product listings with inventory and pricing',
    mimeType: 'application/json'
  },
  {
    uri: 'etsy://shop/reviews',
    name: 'Shop Reviews',
    description: 'Customer reviews and ratings',
    mimeType: 'application/json'
  },
  {
    uri: 'etsy://shop/stats',
    name: 'Shop Statistics',
    description: 'Sales metrics and trends',
    mimeType: 'application/json'
  }
];

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return { resources: RESOURCES };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  try {
    if (!CONFIG.access_token) {
      throw new Error('Etsy access token not configured');
    }

    const headers = {
      'x-api-key': CONFIG.api_key,
      'Authorization': `Bearer ${CONFIG.access_token}`
    };

    let data;

    if (uri === 'etsy://shop/orders') {
      const response = await axios.get(
        `${ETSY_API_BASE}/shops/${CONFIG.shop_id}/orders`,
        { headers, params: { limit: 100, sort_order: 'down', includes: 'User,Listings' } }
      );
      data = response.data;
    } else if (uri === 'etsy://shop/listings') {
      const response = await axios.get(
        `${ETSY_API_BASE}/shops/${CONFIG.shop_id}/listings`,
        { headers, params: { limit: 100, state: 'active', includes: 'Inventory,Images' } }
      );
      data = response.data;
    } else if (uri === 'etsy://shop/reviews') {
      const response = await axios.get(
        `${ETSY_API_BASE}/shops/${CONFIG.shop_id}/reviews`,
        { headers, params: { limit: 100 } }
      );
      data = response.data;
    } else if (uri === 'etsy://shop/stats') {
      const response = await axios.get(
        `${ETSY_API_BASE}/shops/${CONFIG.shop_id}/stats`,
        { headers }
      );
      data = response.data;
    } else {
      throw new Error(`Unknown resource: ${uri}`);
    }

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(data, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      contents: [
        {
          uri,
          mimeType: 'text/plain',
          text: `Error reading resource: ${error.message}`
        }
      ]
    };
  }
});

// ============================================================================
// TOOLS
// ============================================================================

const TOOLS = [
  {
    name: 'fetch_orders',
    description: 'Fetch orders from the Etsy shop with optional filtering',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Max orders to return (1-100)', default: 50 },
        status: { type: 'string', description: 'Filter by status (paid, shipped, cancelled, etc)' },
        days_back: { type: 'number', description: 'Get orders from last N days', default: 1 }
      }
    }
  },
  {
    name: 'create_listing',
    description: 'Create a new Etsy listing',
    inputSchema: {
      type: 'object',
      required: ['title', 'description', 'price', 'quantity'],
      properties: {
        title: { type: 'string', description: 'Listing title (max 140 chars)' },
        description: { type: 'string', description: 'Listing description' },
        price: { type: 'number', description: 'Price in shop currency' },
        quantity: { type: 'number', description: 'Initial quantity' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Up to 13 tags' },
        category_id: { type: 'number', description: 'Etsy category ID' }
      }
    }
  },
  {
    name: 'update_listing',
    description: 'Update an existing listing quantity or price',
    inputSchema: {
      type: 'object',
      required: ['listing_id'],
      properties: {
        listing_id: { type: 'number', description: 'ID of listing to update' },
        quantity: { type: 'number', description: 'New quantity' },
        price: { type: 'number', description: 'New price' }
      }
    }
  },
  {
    name: 'send_buyer_message',
    description: 'Send a message to a buyer',
    inputSchema: {
      type: 'object',
      required: ['user_id', 'message'],
      properties: {
        user_id: { type: 'number', description: 'Etsy user ID of recipient' },
        message: { type: 'string', description: 'Message text (max 1000 chars)' },
        order_id: { type: 'number', description: 'Optional order ID for context' }
      }
    }
  },
  {
    name: 'get_reviews',
    description: 'Fetch shop reviews with optional filtering',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Max reviews to return (1-100)', default: 50 },
        rating: { type: 'number', description: 'Filter by minimum rating (1-5)' }
      }
    }
  }
];

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (!CONFIG.access_token || !CONFIG.shop_id) {
      throw new Error('Etsy configuration incomplete (token or shop_id missing)');
    }

    const headers = {
      'x-api-key': CONFIG.api_key,
      'Authorization': `Bearer ${CONFIG.access_token}`,
      'Content-Type': 'application/json'
    };

    let result;

    if (name === 'fetch_orders') {
      const limit = args.limit || 50;
      const params = {
        limit,
        sort_order: 'down',
        includes: 'User,Listings'
      };
      if (args.status) params.status = args.status;
      const response = await axios.get(
        `${ETSY_API_BASE}/shops/${CONFIG.shop_id}/orders`,
        { headers, params }
      );
      result = response.data;
    } else if (name === 'create_listing') {
      const body = {
        title: args.title,
        description: args.description,
        price: args.price,
        quantity: args.quantity,
        shipping_profile_id: 1, // Default
        tags: args.tags || []
      };
      const response = await axios.post(
        `${ETSY_API_BASE}/shops/${CONFIG.shop_id}/listings`,
        body,
        { headers }
      );
      result = { listing_id: response.data.listing_id, status: 'created' };
    } else if (name === 'update_listing') {
      const body = {};
      if (args.quantity !== undefined) body.quantity = args.quantity;
      if (args.price !== undefined) body.price = args.price;
      const response = await axios.patch(
        `${ETSY_API_BASE}/shops/${CONFIG.shop_id}/listings/${args.listing_id}`,
        body,
        { headers }
      );
      result = { listing_id: args.listing_id, status: 'updated' };
    } else if (name === 'send_buyer_message') {
      const body = {
        message: args.message,
        user_id: args.user_id
      };
      if (args.order_id) body.order_id = args.order_id;
      const response = await axios.post(
        `${ETSY_API_BASE}/shops/${CONFIG.shop_id}/messages`,
        body,
        { headers }
      );
      result = { status: 'sent', convo_id: response.data.conversation_id };
    } else if (name === 'get_reviews') {
      const params = {
        limit: args.limit || 50,
        sort_order: 'down'
      };
      if (args.rating) params.min_rating = args.rating;
      const response = await axios.get(
        `${ETSY_API_BASE}/shops/${CONFIG.shop_id}/reviews`,
        { headers, params }
      );
      result = response.data;
    } else {
      throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
    };
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Error: ${error.message}` }],
      isError: true
    };
  }
});

// ============================================================================
// START SERVER
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Etsy MCP server connected');
}

main().catch(console.error);
