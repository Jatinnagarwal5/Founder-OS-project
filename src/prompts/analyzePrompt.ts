export function getAnalyzePrompt(idea: string): string {
  return `You are Helm AI - an elite startup operating system analyst. 
Analyze the following startup idea in-depth and respond ONLY with a valid, structured JSON object (no markdown surrounding text, just pure JSON).

Startup Idea: "${idea}"

Return JSON matching this exact structure:
{
  "startupData": {
    "name": "Catchy Startup Name",
    "tagline": "Pithy one-line value proposition",
    "industry": "Specific tech sector",
    "stage": "Seed Stage",
    "healthScore": 86,
    "healthStatus": "Healthy",
    "scores": {
      "market": 90,
      "technology": 85,
      "product": 88,
      "finance": 72,
      "execution": 85
    },
    "kpis": {
      "revenue": 145000,
      "mrr": 48000,
      "expenses": 31000,
      "burnRate": 15000,
      "runwayMonths": 16,
      "activeCustomers": 1650,
      "newCustomers": 210,
      "churnRate": 1.5
    },
    "charts": {
      "monthlyFinancials": [
        { "month": "Jan", "revenue": 20000, "expenses": 25000, "profit": -5000 },
        { "month": "Feb", "revenue": 26000, "expenses": 26000, "profit": 0 },
        { "month": "Mar", "revenue": 32000, "expenses": 27000, "profit": 5000 },
        { "month": "Apr", "revenue": 38000, "expenses": 28000, "profit": 10000 },
        { "month": "May", "revenue": 43000, "expenses": 29000, "profit": 14000 },
        { "month": "Jun", "revenue": 48000, "expenses": 31000, "profit": 17000 }
      ],
      "customerGrowth": [
        { "month": "Jan", "active": 600, "newUsers": 90, "churned": 15 },
        { "month": "Feb", "active": 810, "newUsers": 225, "churned": 15 },
        { "month": "Mar", "active": 1050, "newUsers": 255, "churned": 15 },
        { "month": "Apr", "active": 1280, "newUsers": 245, "churned": 15 },
        { "month": "May", "active": 1480, "newUsers": 220, "churned": 20 },
        { "month": "Jun", "active": 1650, "newUsers": 210, "churned": 40 }
      ]
    },
    "teamSummary": {
      "completedTasks": 48,
      "pendingTasks": 6,
      "blockedTasks": 1,
      "productivityPercentage": 93
    },
    "risks": [
      {
        "id": "r1",
        "severity": "medium",
        "title": "Specific Risk Title",
        "description": "Short explanation of the risk.",
        "actionNeeded": "Actionable mitigation step."
      }
    ],
    "aiInsights": [
      {
        "id": "i1",
        "category": "Growth",
        "title": "Specific Opportunity Title",
        "observation": "Data observation.",
        "recommendation": "Strategic recommendation."
      }
    ],
    "recentActivities": [
      { "id": "a1", "timestamp": "10 mins ago", "user": "Founder", "action": "Initiated idea analysis for ${idea}", "category": "AI" }
    ],
    "upcomingMeetings": [
      { "id": "m1", "time": "03:00 PM", "title": "Strategic Roadmap Review", "attendees": "Core Team", "type": "team" }
    ]
  },
  "competitors": [
    {
      "name": "Competitor 1",
      "marketShare": "30%",
      "pricing": "$99/mo",
      "pros": ["Pro 1", "Pro 2"],
      "cons": ["Con 1", "Con 2"],
      "keyGap": "Critical feature or market gap they miss",
      "ourAdvantage": "Your clear unfair advantage"
    }
  ],
  "pitchDeck": [
    {
      "slideNumber": 1,
      "title": "Problem",
      "subtitle": "Core Pain Point",
      "content": ["Point 1", "Point 2"],
      "highlight": "Impact stat or key takeaway"
    }
  ],
  "roadmap": [
    {
      "phase": "Week 1",
      "title": "MVP Launch",
      "tasks": ["Task 1", "Task 2"],
      "status": "In Progress"
    }
  ],
  "actionPlan": [
    {
      "id": "t1",
      "title": "Validate core value proposition with 10 target users",
      "category": "Customer Discovery",
      "priority": "High",
      "completed": false
    }
  ]
}`;
}
