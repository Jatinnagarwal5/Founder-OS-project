export interface StartupMetrics {
  name: string;
  tagline: string;
  industry: string;
  stage: string;
  healthScore: number;
  healthStatus: "Healthy" | "Warning" | "Critical";
  scores: {
    market: number;
    technology: number;
    product: number;
    finance: number;
    execution: number;
  };
  kpis: {
    revenue: number;
    mrr: number;
    expenses: number;
    burnRate: number;
    runwayMonths: number;
    activeCustomers: number;
    newCustomers: number;
    churnRate: number;
  };
  charts: {
    monthlyFinancials: { month: string; revenue: number; expenses: number; profit: number }[];
    customerGrowth: { month: string; active: number; newUsers: number; churned: number }[];
  };
  teamSummary: {
    completedTasks: number;
    pendingTasks: number;
    blockedTasks: number;
    productivityPercentage: number;
  };
  risks: {
    id: string;
    severity: "high" | "medium" | "low";
    title: string;
    description: string;
    actionNeeded: string;
  }[];
  aiInsights: {
    id: string;
    category: "Financial" | "Growth" | "Product" | "Risk";
    title: string;
    observation: string;
    recommendation: string;
  }[];
  recentActivities: {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    category: string;
  }[];
  upcomingMeetings: {
    id: string;
    time: string;
    title: string;
    attendees: string;
    type: "investor" | "team" | "customer";
  }[];
}

export const defaultStartupData: StartupMetrics = {
  name: "NexusAI Router",
  tagline: "Autonomous AI Customer Operations & Smart Router",
  industry: "Enterprise AI & SaaS",
  stage: "Seed Stage",
  healthScore: 84,
  healthStatus: "Healthy",
  scores: {
    market: 90,
    technology: 82,
    product: 85,
    finance: 70,
    execution: 88,
  },
  kpis: {
    revenue: 128400,
    mrr: 42500,
    expenses: 28900,
    burnRate: 14200,
    runwayMonths: 14,
    activeCustomers: 1420,
    newCustomers: 184,
    churnRate: 1.8,
  },
  charts: {
    monthlyFinancials: [
      { month: "Jan", revenue: 18000, expenses: 22000, profit: -4000 },
      { month: "Feb", revenue: 22500, expenses: 23000, profit: -500 },
      { month: "Mar", revenue: 27000, expenses: 24000, profit: 3000 },
      { month: "Apr", revenue: 31000, expenses: 25500, profit: 5500 },
      { month: "May", revenue: 36000, expenses: 26000, profit: 10000 },
      { month: "Jun", revenue: 42500, expenses: 28900, profit: 13600 },
    ],
    customerGrowth: [
      { month: "Jan", active: 520, newUsers: 65, churned: 12 },
      { month: "Feb", active: 680, newUsers: 180, churned: 20 },
      { month: "Mar", active: 890, newUsers: 230, churned: 20 },
      { month: "Apr", active: 1080, newUsers: 210, churned: 20 },
      { month: "May", active: 1250, newUsers: 195, churned: 25 },
      { month: "Jun", active: 1420, newUsers: 184, churned: 14 },
    ],
  },
  teamSummary: {
    completedTasks: 42,
    pendingTasks: 8,
    blockedTasks: 2,
    productivityPercentage: 91,
  },
  risks: [
    {
      id: "r1",
      severity: "medium",
      title: "Finance score at 70%",
      description: "Cash runway is 14 months, but upcoming hiring plans will accelerate burn rate by 22%.",
      actionNeeded: "Review Q3 hiring budget or initiate Series A conversations early.",
    },
    {
      id: "r2",
      severity: "low",
      title: "2 Blocked Tasks in Product Backlog",
      description: "WhatsApp API enterprise throughput limit blocking enterprise SLA onboarding.",
      actionNeeded: "Apply for Meta Direct Enterprise Business Account credentials.",
    },
  ],
  aiInsights: [
    {
      id: "i1",
      category: "Financial",
      title: "Strong Profit Margin Acceleration",
      observation: "MRR grew 18% month-over-month while operating expenses increased by only 11%.",
      recommendation: "Reinvest 15% of net profit into targeted LinkedIn outbound campaigns.",
    },
    {
      id: "i2",
      category: "Growth",
      title: "Low Customer Churn Rate (1.8%)",
      observation: "User retention is in the top 10th percentile for B2B SaaS benchmarks.",
      recommendation: "Introduce an annual subscription plan with a 15% discount to lock in ARR.",
    },
  ],
  recentActivities: [
    { id: "a1", timestamp: "10 mins ago", user: "Sarah Chen (CEO)", action: "Closed $12k ARR annual contract with TechCorp", category: "Sales" },
    { id: "a2", timestamp: "1 hour ago", user: "Alex Rivera (CTO)", action: "Deployed Gemini 2.5 latency optimization to prod", category: "Tech" },
    { id: "a3", timestamp: "3 hours ago", user: "Priya Sharma (Growth)", action: "Launched ProductHunt teaser page", category: "Marketing" },
    { id: "a4", timestamp: "Yesterday", user: "System AI", action: "Generated 90-Day Investor Readiness Report", category: "AI" },
  ],
  upcomingMeetings: [
    { id: "m1", time: "02:30 PM", title: "Series A Pitch Prep w/ Sequoia Scout", attendees: "Founder, Sarah", type: "investor" },
    { id: "m2", time: "04:00 PM", title: "Weekly Engineering Sprint Review", attendees: "Tech Team (5)", type: "team" },
    { id: "m3", time: "Tomorrow, 10 AM", title: "Enterprise Onboarding demo w/ Acme Inc", attendees: "Sales & Product", type: "customer" },
  ],
};

export const defaultCompetitors = [
  {
    name: "Intercom Fin AI",
    marketShare: "34%",
    pricing: "$99/mo + $0.99 per resolution",
    pros: ["Established brand", "Broad CRM integrations", "Deep analytics"],
    cons: ["High usage pricing", "Complex setup", "Slower custom routing"],
    keyGap: "No direct autonomous WhatsApp / multi-channel smart routing logic.",
    ourAdvantage: "Sub-second WhatsApp AI routing with zero per-resolution markup.",
  },
  {
    name: "Zendesk AI",
    marketShare: "28%",
    pricing: "$115/agent/mo",
    pros: ["Enterprise compliance", "Huge marketplace", "Omnichannel support"],
    cons: ["Legacy UI", "Expensive seat model", "Requires specialized admin"],
    keyGap: "Lacks LLM proactive workflow triggers for founders.",
    ourAdvantage: "Built specifically for modern fast-growing startups with zero bloat.",
  },
  {
    name: "Tidio Lyro",
    marketShare: "12%",
    pricing: "$39/mo",
    pros: ["Affordable", "Easy live chat embed", "Good for small Shopify stores"],
    cons: ["Limited API capabilities", "Basic NLP capabilities", "No workflow engine"],
    keyGap: "Cannot handle complex multi-tier decision matrices.",
    ourAdvantage: "Deep reasoning agent capabilities powered by Gemini 2.5 Flash.",
  },
];

export const defaultPitchDeck = [
  {
    slideNumber: 1,
    title: "Problem",
    subtitle: "Startup Founders Suffer From Fragmented Tools & Slow Execution",
    content: [
      "Founders waste 35+ hours/week juggling Notion, Stripe, spreadsheets, and basic chatbots.",
      "Generic AI chatbots give fluff responses rather than structured operational decisions.",
      "Lack of real-time financial risk visibility leads to unexpected burn rate spikes.",
    ],
    highlight: "Fragmented tools cause 40% of early-stage startup execution failures.",
  },
  {
    slideNumber: 2,
    title: "Solution",
    subtitle: "FounderOS – The Unified AI Co-Founder & Operating System",
    content: [
      "Real-time financial telemetry & Founder Health Score meter (0-100).",
      "Specialized AI Agents (CEO, Marketing, Investor VC, Product Manager).",
      "One-click decision simulator, automated pitch deck, and strategic roadmap engine.",
    ],
    highlight: "Automates startup operations and strategic decision-making in a single dashboard.",
  },
  {
    slideNumber: 3,
    title: "Market Opportunity",
    subtitle: "$48B TAM for Founder & Small Business SaaS Infrastructure",
    content: [
      "Over 150 million startups and micro-businesses globally.",
      "Fast-growing demand for vertical AI assistants over generic chat tools.",
      "Serviceable Addressable Market (SAM): $6.2B in B2B Tech Startups.",
    ],
    highlight: "Targeting 50,000 active founders in Year 1.",
  },
  {
    slideNumber: 4,
    title: "Competition & Unique Advantage",
    subtitle: "Moving Beyond Passive Chatbots to Active Telemetry",
    content: [
      "Legacy dashboards (Stripe/Linear) lack proactive AI strategic advice.",
      "ChatGPT lacks live business data context & financial telemetry integration.",
      "FounderOS bridges live metrics with active Gemini 2.5 AI decision support.",
    ],
    highlight: "Proprietary Decision Simulation Engine gives 10x faster strategic clarity.",
  },
  {
    slideNumber: 5,
    title: "Revenue Model",
    subtitle: "High-Margin SaaS Tiered Pricing",
    content: [
      "Starter Tier: $49/mo (Basic metrics + AI Advisor)",
      "Pro Growth Tier: $149/mo (Full AI Agents + Decision Simulator + Pitch Generator)",
      "Enterprise/Scale: $499/mo (Custom telemetry API & dedicated advisor model)",
    ],
    highlight: "82% Gross Margins with sub-$120 Customer Acquisition Cost.",
  },
  {
    slideNumber: 6,
    title: "Go-To-Market Strategy",
    subtitle: "Product-Led Growth & Creator Partnerships",
    content: [
      "Viral pitch deck & decision simulator exports with 'Powered by FounderOS' branding.",
      "Partnerships with YC/Techstars accelerators, incubators, and founder communities.",
      "SEO & Founder build-in-public content engine.",
    ],
    highlight: "Targeting 25% MoM organic user acquisition growth.",
  },
  {
    slideNumber: 7,
    title: "Financial Projections",
    subtitle: "Path to $5M ARR in 24 Months",
    content: [
      "Year 1: 1,500 Paying Founders -> $1.8M ARR",
      "Year 2: 4,800 Paying Founders -> $5.4M ARR",
      "Year 3: 12,000 Paying Founders -> $14.2M ARR",
    ],
    highlight: "Cash flow positive projected by Month 14.",
  },
  {
    slideNumber: 8,
    title: "Investment Ask",
    subtitle: "Raising $1.5M Seed Round",
    content: [
      "50% Product Development & Engineering (Expanding AI Agent Models)",
      "35% Growth Marketing & Strategic Accelerator Partnerships",
      "15% Operations & Legal Security",
    ],
    highlight: "Targeting 18-month runway to achieve $5M ARR.",
  },
];

export const defaultDecisionSimulation = {
  optionA: "Expand to US Market First",
  optionB: "Dominate India & SEA Market First",
  comparison: {
    prosA: ["Higher Average Revenue Per User ($149 vs $29)", "Larger Enterprise SaaS buyer budget", "Greater VC valuation multiples"],
    consA: ["Higher Customer Acquisition Cost ($450+)", "Fierce market competition", "Requires US entity & tax compliance"],
    prosB: ["Faster sales cycles (14 days vs 45 days)", "Lower operational cost structure", "Massive market volume growth"],
    consB: ["Lower ARPU and price sensitivity", "Higher churn risk without local onboarding", "Longer payment collection cycles"],
    riskScoreA: 68,
    riskScoreB: 42,
    revenuePotentialA: "High ($2M+ ARR potential in 12m)",
    revenuePotentialB: "Medium ($800k ARR potential in 12m)",
    difficultyA: "Hard (Requires local US sales hire)",
    difficultyB: "Moderate (Leverage existing regional team)",
    recommendation: "Adopt a Hybrid Expansion: Establish US digital self-serve sales first while maintaining core engineering & APAC sales operations locally to minimize burn rate.",
    confidenceScore: 89,
  },
};

export const defaultRoadmap = [
  {
    phase: "Week 1",
    title: "Foundation & MVP Validation",
    tasks: ["Complete landing page & core telemetry dashboard", "Integrate Gemini 2.5 Flash API endpoints", "Conduct 10 founder customer interviews"],
    status: "Completed",
  },
  {
    phase: "Week 2",
    title: "AI Agent & Decision Engines",
    tasks: ["Launch CEO, Marketing, Investor & Product AI Agents", "Integrate Decision Simulator engine", "Deploy pitch deck card renderer"],
    status: "In Progress",
  },
  {
    phase: "Month 1",
    title: "Private Beta & Telemetry",
    tasks: ["Onboard first 100 beta startup founders", "Connect Stripe & Quickbooks API sync placeholders", "Optimize AI advisor response latency"],
    status: "Upcoming",
  },
  {
    phase: "Month 2",
    title: "Public Launch & ProductHunt",
    tasks: ["Launch ProductHunt campaign", "Roll out paid Pro plan ($149/mo)", "Partner with 3 startup accelerators"],
    status: "Upcoming",
  },
  {
    phase: "Month 3",
    title: "Scale & Enterprise Integrations",
    tasks: ["Add team collaboration & permission management", "Deploy custom agent fine-tuning", "Cross $50k MRR milestone"],
    status: "Upcoming",
  },
];

export interface ActionItem {
  id: string;
  title: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

export const defaultActionPlan: ActionItem[] = [
  { id: "t1", title: "Talk to 10 prospective customers & record feedback", category: "Customer Discovery", priority: "High", completed: true },
  { id: "t2", title: "Review Q3 burn rate & cash runway with financial advisor", category: "Finance", priority: "High", completed: true },
  { id: "t3", title: "Test Gemini 2.5 Flash prompt responses for CEO Agent", category: "Product", priority: "Medium", completed: true },
  { id: "t4", title: "Launch interactive Landing Page MVP & gather signups", category: "Marketing", priority: "High", completed: false },
  { id: "t5", title: "Draft Series A pitch deck using FounderOS generator", category: "Fundraising", priority: "High", completed: false },
  { id: "t6", title: "Set up automated weekly investor update email report", category: "Operations", priority: "Medium", completed: false },
];

export const defaultTeamMembers = [
  { id: "e1", name: "Sarah Chen", role: "CEO & Co-Founder", status: "Active", tasksAssigned: 12, completed: 11, blocked: 0, avatar: "SC" },
  { id: "e2", name: "Alex Rivera", role: "CTO & Co-Founder", status: "Active", tasksAssigned: 15, completed: 14, blocked: 1, avatar: "AR" },
  { id: "e3", name: "Priya Sharma", role: "Head of Growth", status: "Active", tasksAssigned: 10, completed: 8, blocked: 0, avatar: "PS" },
  { id: "e4", name: "Marcus Vance", role: "Senior AI Engineer", status: "Active", tasksAssigned: 9, completed: 7, blocked: 1, avatar: "MV" },
  { id: "e5", name: "Elena Rostova", role: "Lead Product Designer", status: "Active", tasksAssigned: 6, completed: 5, blocked: 0, avatar: "ER" },
];

export const defaultNotifications = [
  { id: "n1", type: "milestone", title: "Revenue Milestone Achieved!", message: "MRR surpassed $40,000 for the first time.", time: "2 hours ago", unread: true },
  { id: "n2", type: "warning", title: "Burn Rate Alert", message: "Engineering expense increased 12% following cloud instance scaling.", time: "5 hours ago", unread: true },
  { id: "n3", type: "reminder", title: "Investor Meeting Reminder", message: "Series A Pitch Prep w/ Sequoia Scout today at 2:30 PM.", time: "1 day ago", unread: false },
  { id: "n4", type: "task", title: "Task Blocked in Backlog", message: "WhatsApp API throughput limit requires Meta Business approval.", time: "2 days ago", unread: false },
];
