export function getPitchPrompt(startupIdea: string): string {
  return `You are FounderOS AI Pitch Deck Engine.
Generate an 8-slide investor pitch deck for the startup idea: "${startupIdea}".
Respond ONLY with a valid JSON array of 8 slide objects.

JSON Format:
[
  {
    "slideNumber": 1,
    "title": "Problem",
    "subtitle": "Clear core pain point description",
    "content": ["Key detail point 1", "Key detail point 2", "Key detail point 3"],
    "highlight": "Impact stat or key takeaway sentence"
  },
  {
    "slideNumber": 2,
    "title": "Solution",
    "subtitle": "Product description & core innovation",
    "content": ["Feature 1", "Feature 2", "Feature 3"],
    "highlight": "Value proposition statement"
  },
  {
    "slideNumber": 3,
    "title": "Market Opportunity",
    "subtitle": "TAM / SAM / SOM analysis",
    "content": ["Total Addressable Market size", "Target demographic segment", "Market growth rate CAGR"],
    "highlight": "Target market size metric"
  },
  {
    "slideNumber": 4,
    "title": "Competition & Moat",
    "subtitle": "Positioning vs existing solutions",
    "content": ["Competitor landscape", "Our key unfair advantage", "Defensibility barrier"],
    "highlight": "Key competitive advantage"
  },
  {
    "slideNumber": 5,
    "title": "Revenue Model",
    "subtitle": "Monetization strategy & pricing tiers",
    "content": ["Tier 1 pricing", "Tier 2 enterprise pricing", "Expected unit economics & margin"],
    "highlight": "Gross margin target metric"
  },
  {
    "slideNumber": 6,
    "title": "Go-To-Market Strategy",
    "subtitle": "Customer acquisition plan",
    "content": ["Channel 1 growth loop", "Partnership leverage", "Viral/Referral mechanics"],
    "highlight": "Target customer acquisition metric"
  },
  {
    "slideNumber": 7,
    "title": "Financial Projections",
    "subtitle": "3-Year Revenue & Growth roadmap",
    "content": ["Year 1 ARR target", "Year 2 scaling target", "Year 3 valuation target"],
    "highlight": "Break-even timeline"
  },
  {
    "slideNumber": 8,
    "title": "Investment Ask",
    "subtitle": "Capital requirements & fund allocation",
    "content": ["Target raise amount", "Product & Engineering %", "Marketing & Expansion %"],
    "highlight": "Target runway length achieved"
  }
]`;
}
