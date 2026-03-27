# RevAI Standalone APIs

The RevAI platform exposes identical backend intelligence processing natively via B2B headless REST APIs for downstream enterprise integration into partner architectures.

## Authentication
Every request into `/api/revai/*` must provide the `X-API-Key` header.
> Development Key: **`revai-demo-key`**

---

### 1. `POST /api/revai/analyze`
Generates a structured visual intelligence payload bridging revenue data against recent statistical anomalies.

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
     "dailyTotals": [{"date": "Mar 1", "amount": 1200000}, ...]
  },
  "insights": {
    "summary": "Revenue is stable with a slight upward trend...",
    "metrics": [
      { "label": "Success Velocity", "value": 85, "status": "increasing" }
    ],
    "recommendations": [
      { "action": "Increase terminal capacity", "impact": "High", "icon": "zap" }
    ]
  }
}
```

---

### 2. `POST /api/revai/forecast`
Focuses purely on LLM predictive modeling based on chronological revenue velocity.

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
    "forecast_summary": "Expected growth of 12% based on...",
    "projected_revenue_30d": 56000000
  }
}
```

---

### 3. `POST /api/revai/anomalies`
Triggers the hybrid engine utilizing mathematical Z-Score detection layered with Llama 3 contextual severity explanations.

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/revai/anomalies \
  -H "X-API-Key: revai-demo-key" 
```

**Response Format**:
```json
{
  "success": true,
  "statistical_triggers": ["Sudden drop on Mar 15..."],
  "analysis": {
    "explanation": "Significant volume drop detected...",
    "timeline": [
      { "date": "Mar 15", "value": 85, "type": "drop", "severity": "critical" }
    ],
    "mitigation_steps": [
      { "step": "Verify terminal status", "styled_icon": "shield-alert" }
    ]
  }
}
```

---

## 🛡️ Resilient Fallback Architecture
RevAI is designed for **High Availability** in restricted serverless environments (e.g. Vercel, AWS Lambda).

- **Local Development**: Acts as a stateful listener via local SQLite.
- **Production/Read-Only FS**: If the SQLite filesystem is blocked or read-only, all API endpoints **automatically fallback** to high-fidelity mock datasets. 
- **Benefit**: Zero-downtime intelligence for demo days and restricted infrastructure.
