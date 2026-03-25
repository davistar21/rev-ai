# RevAI Standalone APIs

The RevAI platform exposes identical backend intelligence processing natively via B2B headless REST APIs for downstream enterprise integration into partner architectures.

## Authentication
Every request into `/api/revai/*` must provide the `X-API-Key` header.
> Development Key: **`revai-demo-key`**

---

### 1. `POST /api/revai/analyze`
Generates a comprehensive executive summary bridging revenue data against recent statistical anomalies, yielding a formatted natural language intelligence JSON output.

**Request Payload**:
```json
{
  "period": "last-30-days"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/revai/analyze \
  -H "Content-Type: application/json" \
  -H "X-API-Key: revai-demo-key" \
  -d '{"period": "last-30-days"}'
```

**Response Format**:
```json
{
  "success": true,
  "aggregation": {
     "totalRevenue": 40560000,
     "successRate": 92.5,
     "successCount": 240,
     "failCount": 15,
     "dailyTotals": [...]
  },
  "insights": "Executive summary string in formatted Markdown",
  "forecast": "Expected predictive variance summary string in formatted Markdown"
}
```

---

### 2. `POST /api/revai/forecast`
Focuses purely on LLM predictive modeling based strictly on previous chronological timelines without full textual executive generation constraints.

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/revai/forecast \
  -H "X-API-Key: revai-demo-key" 
```

**Response Format**:
```json
{
  "success": true,
  "data": {
    "forecast_summary": "Markdown text explaining the logical forecast based on recent velocity",
    "projected_revenue_30d": 56000000
  }
}
```

---

### 3. `POST /api/revai/anomalies`
Triggers the hybrid engine utilizing mathematical absolute Standard Deviation derivations, passing Z-Score flags into Llama 3 for severity contextualization automatically mapping flags to real-world network outage possibilities.

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/revai/anomalies \
  -H "X-API-Key: revai-demo-key" 
```

**Response Format**:
```json
{
  "success": true,
  "statistical_triggers": [
    "Sudden drop on Mar 15 by 85% compared to yesterday."
  ],
  "analysis": {
    "has_anomalies": true,
    "explanation": "Markdown text explaining the severity of the anomalies, potential causes (like downtime or fraud), and recommendations."
  }
}
```
