#!/bin/bash
set -euo pipefail

if [ -z "${N8N_API_KEY:-}" ]; then
  echo "ERROR: N8N_API_KEY nicht gesetzt."
  echo "  1. http://localhost:5678 → Settings → n8n API → Create API Key"
  echo "  2. export N8N_API_KEY=\"dein-key\""
  exit 1
fi

BASE="http://localhost:5678/api/v1/workflows"

post_workflow() {
  local name="$1"
  local payload="$2"
  local resp http_code body id
  resp=$(curl -s -w "\n%{http_code}" -X POST "$BASE" \
    -H "Content-Type: application/json" \
    -H "X-N8N-API-KEY: $N8N_API_KEY" \
    -d "$payload")
  http_code=$(echo "$resp" | tail -1)
  body=$(echo "$resp" | sed '$d')
  if [ "$http_code" != "200" ] && [ "$http_code" != "201" ]; then
    echo "FEHLER '$name' (HTTP $http_code): $body" >&2
    return 1
  fi
  id=$(echo "$body" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id','?'))")
  echo "  ✓ $name — ID: $id"
}

echo "=== Erstelle n8n Workflows ==="

# -------------------------------------------------------
# Workflow 1: Etsy Order Alert → Slack
# -------------------------------------------------------
post_workflow "Etsy Order Alert → Slack" '{
  "name": "Etsy Order Alert \u2192 Slack",
  "settings": {"executionOrder": "v1"},
  "nodes": [
    {
      "id": "a1b2c3d4-0001-0001-0001-000000000001",
      "name": "Etsy Order Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [250, 300],
      "parameters": {
        "multipleMethods": false,
        "httpMethod": "POST",
        "path": "etsy-order",
        "authentication": "none",
        "responseMode": "onReceived",
        "options": {}
      }
    },
    {
      "id": "a1b2c3d4-0001-0001-0001-000000000002",
      "name": "Slack Etsy Bestellung",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.4,
      "position": [500, 300],
      "parameters": {
        "authentication": "oAuth2",
        "resource": "message",
        "operation": "post",
        "channelId": {"__rl": true, "value": "ki-system-integration", "mode": "name"},
        "messageType": "text",
        "text": "={{ \"🛒 Neue Etsy-Bestellung!\\nKäufer: \" + $json.buyer_name + \"\\nProdukt: \" + $json.title + \"\\nBetrag: \" + $json.amount + \" €\" }}",
        "otherOptions": {}
      }
    }
  ],
  "connections": {
    "Etsy Order Webhook": {
      "main": [[{"node": "Slack Etsy Bestellung", "type": "main", "index": 0}]]
    }
  }
}'

# -------------------------------------------------------
# Workflow 2: Morning Briefing → Slack
# -------------------------------------------------------
post_workflow "Morning Briefing → Slack" '{
  "name": "Morning Briefing \u2192 Slack",
  "settings": {"executionOrder": "v1"},
  "nodes": [
    {
      "id": "b2c3d4e5-0002-0002-0002-000000000001",
      "name": "Mo-Fr 8 Uhr",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.3,
      "position": [250, 300],
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "expression": "0 8 * * 1-5"
            }
          ]
        }
      }
    },
    {
      "id": "b2c3d4e5-0002-0002-0002-000000000002",
      "name": "Slack Morning Briefing",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.4,
      "position": [500, 300],
      "parameters": {
        "authentication": "oAuth2",
        "resource": "message",
        "operation": "post",
        "channelId": {"__rl": true, "value": "ki-system-integration", "mode": "name"},
        "messageType": "text",
        "text": "🌅 Guten Morgen! Tages-Status Bulldocks:\n• Website: https://bulldocks.net\n• n8n: http://localhost:5678\n• Stack: Docker (n8n + Postgres + Redis)\n\nHeutiges Ziel: Check Etsy-Vorbereitungen, offene Tasks abarbeiten.",
        "otherOptions": {}
      }
    }
  ],
  "connections": {
    "Mo-Fr 8 Uhr": {
      "main": [[{"node": "Slack Morning Briefing", "type": "main", "index": 0}]]
    }
  }
}'

# -------------------------------------------------------
# Workflow 3: E-Mail Triage → Slack
# -------------------------------------------------------
post_workflow "E-Mail Triage → Slack" '{
  "name": "E-Mail Triage \u2192 Slack",
  "settings": {"executionOrder": "v1"},
  "nodes": [
    {
      "id": "c3d4e5f6-0003-0003-0003-000000000001",
      "name": "Gmail INBOX unread",
      "type": "n8n-nodes-base.gmailTrigger",
      "typeVersion": 1.3,
      "position": [250, 300],
      "parameters": {
        "authentication": "serviceAccount",
        "event": "messageReceived",
        "simple": true,
        "filters": {
          "readStatus": "unread",
          "labelIds": ["INBOX"]
        },
        "options": {}
      }
    },
    {
      "id": "c3d4e5f6-0003-0003-0003-000000000002",
      "name": "Slack E-Mail Triage",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.4,
      "position": [500, 300],
      "parameters": {
        "authentication": "oAuth2",
        "resource": "message",
        "operation": "post",
        "channelId": {"__rl": true, "value": "ki-system-integration", "mode": "name"},
        "messageType": "text",
        "text": "={{ \"📧 Neue E-Mail!\\nVon: \" + ($json.from && $json.from.value && $json.from.value[0] ? $json.from.value[0].address : ($json.from || \"unbekannt\")) + \"\\nBetreff: \" + ($json.subject || \"(kein Betreff)\") }}",
        "otherOptions": {}
      }
    }
  ],
  "connections": {
    "Gmail INBOX unread": {
      "main": [[{"node": "Slack E-Mail Triage", "type": "main", "index": 0}]]
    }
  }
}'

echo ""
echo "=== Verify ==="
curl -s -H "X-N8N-API-KEY: $N8N_API_KEY" http://localhost:5678/api/v1/workflows | \
  python3 -c "import json,sys; [print('  -', w['name'], '| ID:', w['id']) for w in json.load(sys.stdin).get('data',[])]"
