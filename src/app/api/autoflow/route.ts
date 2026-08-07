import { NextRequest, NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName = "Acme Corp",
      industry = "B2B Tech / SaaS",
      teamSize = 15,
      department = "Operations & Customer Support",
      currentWorkflow = "Manual customer email routing and data entry into spreadsheets",
      timeSpentHours = 25,
      hourlyCost = 45,
    } = body;

    const prompt = `You are AutoFlow AI - World-class AI Workflow Automation Advisor.
Analyze the following manual workflow for a business and provide a high-value structured JSON response.

Company: "${companyName}"
Industry: "${industry}"
Team Size: ${teamSize} employees
Department: "${department}"
Current Workflow Description: "${currentWorkflow}"
Time Spent / Week: ${timeSpentHours} hours
Hourly Cost: $${hourlyCost}/hour

Return ONLY a valid structured JSON object with this exact schema (no surrounding markdown text):
{
  "companyName": "${companyName}",
  "automationScore": 88,
  "priorityLevel": "High Priority",
  "estimatedImplementationEffort": "2 Weeks (Low Complexity)",
  "weeklyHoursSaved": ${Math.round(timeSpentHours * 0.75)},
  "monthlyFinancialSavings": ${Math.round(timeSpentHours * 0.75 * hourlyCost * 4.3)},
  "annualSavings": ${Math.round(timeSpentHours * 0.75 * hourlyCost * 52)},
  "roiPercentage": 420,
  "paybackPeriodMonths": 0.8,
  "productivityIncreasePercent": 65,
  "repetitiveTasks": [
    "Manual data extraction from incoming emails",
    "Duplicate customer entry across CRM and spreadsheets",
    "Hand-crafted follow-up status update emails"
  ],
  "bottlenecks": [
    "Average 4.2 hour delay in responding to customer inquiries",
    "High error rate (6%) during manual copy-pasting",
    "Team burnout spending 30% of work week on repetitive admin"
  ],
  "automationOpportunities": [
    "Implement Gemini AI Email Parser to auto-categorize incoming tickets",
    "Deploy Zapier / Make webhook pipeline for instant CRM sync",
    "Deploy autonomous AI Follow-up Agent for 24/7 instant responses"
  ],
  "recommendedStack": [
    { "name": "OpenAI / Gemini 2.5 Flash", "purpose": "Intelligent Email & Document Processing", "cost": "$30/mo" },
    { "name": "Make.com / n8n", "purpose": "Multi-Step Workflow Orchestration", "cost": "$29/mo" },
    { "name": "HubSpot / Stripe API Sync", "purpose": "Automated CRM & Billing Updates", "cost": "Native Free" }
  ],
  "implementationRoadmap": [
    { "week": "Week 1", "title": "API Setup & Workflow Mapping", "description": "Configure Make.com webhooks and test Gemini parsing prompt accuracy." },
    { "week": "Week 2", "title": "Integrations & Staging Test", "description": "Connect CRM endpoints and test 100 sample workflow executions." },
    { "week": "Week 3", "title": "Full Production Rollout", "description": "Deploy autonomous AI router and monitor zero-lag execution." }
  ]
}`;

    const fallbackData = {
      companyName,
      automationScore: 88,
      priorityLevel: "High Priority",
      estimatedImplementationEffort: "2 Weeks (Low Complexity)",
      weeklyHoursSaved: Math.round(timeSpentHours * 0.75),
      monthlyFinancialSavings: Math.round(timeSpentHours * 0.75 * hourlyCost * 4.3),
      annualSavings: Math.round(timeSpentHours * 0.75 * hourlyCost * 52),
      roiPercentage: 420,
      paybackPeriodMonths: 0.8,
      productivityIncreasePercent: 65,
      repetitiveTasks: [
        "Manual data extraction from incoming emails and forms",
        "Duplicate customer profile creation in CRM and spreadsheets",
        "Hand-crafted follow-up status update emails",
      ],
      bottlenecks: [
        "Average 4.2 hour response latency for customer support inquiries",
        "Error rate (6.5%) during manual invoice data entry",
        "Team spending 35% of work week on non-revenue admin tasks",
      ],
      automationOpportunities: [
        "Deploy Gemini AI Email Parser to auto-classify incoming inquiries",
        "Build Make.com / Zapier pipeline for instant 2-way CRM synchronization",
        "Deploy autonomous AI Follow-up Agent for sub-second status responses",
      ],
      recommendedStack: [
        { name: "Gemini 2.5 Flash", purpose: "Intelligent Document & Email Processing", cost: "$20/mo" },
        { name: "Make.com / n8n", fontColor: "text-purple-400", purpose: "Multi-Step Workflow Orchestration", cost: "$29/mo" },
        { name: "Stripe & CRM Webhooks", purpose: "Real-time Telemetry & Billing Sync", cost: "Included" },
      ],
      implementationRoadmap: [
        { week: "Week 1", title: "API Setup & Workflow Mapping", description: "Configure Make.com webhooks and test Gemini parsing prompt accuracy." },
        { week: "Week 2", title: "Integrations & Staging Test", description: "Connect CRM endpoints and test 100 sample workflow executions." },
        { week: "Week 3", title: "Full Production Rollout", description: "Deploy autonomous AI router and monitor zero-lag execution." },
      ],
    };

    const result = await generateJSON(prompt, fallbackData);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/autoflow error:", error);
    return NextResponse.json({ error: "Failed to analyze workflow" }, { status: 500 });
  }
}
