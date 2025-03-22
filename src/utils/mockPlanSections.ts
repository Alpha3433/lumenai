import { BusinessFormData } from "./planGenerator";

// Extract details from business description
function extractDetails(formData: BusinessFormData) {
  const { businessDescription } = formData;
  
  // Mock extraction of industry (would be done by AI in reality)
  let industry = "technology";
  if (businessDescription.toLowerCase().includes("restaurant") || businessDescription.toLowerCase().includes("food")) {
    industry = "food service";
  } else if (businessDescription.toLowerCase().includes("retail") || businessDescription.toLowerCase().includes("shop")) {
    industry = "retail";
  } else if (businessDescription.toLowerCase().includes("consult")) {
    industry = "consulting";
  }
  
  // Mock extraction of target market
  let targetMarket = "general consumers";
  if (businessDescription.toLowerCase().includes("business") || businessDescription.toLowerCase().includes("b2b")) {
    targetMarket = "businesses";
  } else if (businessDescription.toLowerCase().includes("luxury") || businessDescription.toLowerCase().includes("premium")) {
    targetMarket = "luxury consumers";
  }
  
  return { industry, targetMarket };
}

// Executive Summary mock generator
export function generateExecutiveSummary(formData: BusinessFormData): string {
  const { industry, targetMarket } = extractDetails(formData);
  
  return `${formData.businessName} is an innovative ${industry} company that ${formData.businessDescription}. Our mission is to provide exceptional solutions for ${targetMarket}. 

With a clear focus on quality and customer satisfaction, we aim to establish ourselves as a leading provider in the ${industry} sector. 

Our key objectives include scaling operations efficiently, developing a strong customer base, and achieving sustainable growth while maintaining high standards of service delivery.`;
}

// Market Analysis mock generator
export function generateMarketAnalysis(formData: BusinessFormData): string {
  const { industry, targetMarket } = extractDetails(formData);
  
  return `The ${industry} industry is currently experiencing significant growth, with a projected annual expansion rate of 7.5% over the next five years. Key trends include technological innovation, increased consumer demand for personalized solutions, and a shift towards digital-first approaches.

Our target market of ${targetMarket} represents a $4.2 billion opportunity, with an expected growth of 12% annually. This demographic shows strong engagement with products similar to ours, with a high willingness to pay for quality and convenience.

Major competitors in this space include Industry Leader A (35% market share), Rising Competitor B (15% market share), and Traditional Provider C (20% market share).

Our competitive advantage lies in our innovative approach, superior customer experience, and ability to rapidly adapt to changing market conditions.`;
}

// Business Model mock generator
export function generateBusinessModel(formData: BusinessFormData): string {
  const { targetMarket } = extractDetails(formData);
  
  return `${formData.businessName} will operate on a value-driven model, offering premium solutions to ${targetMarket}.

Key revenue streams include:
1. Direct sales of core products/services
2. Subscription packages for ongoing customer relationships
3. Value-added services and premium features
4. Strategic partnerships and licensing opportunities

Our cost structure is designed for efficiency and scalability, with key investments in technology infrastructure, talent acquisition, and customer experience enhancement. We anticipate achieving operational breakeven within the first 18 months, with steady profit margin improvements thereafter.

Key partners will include technology providers, distribution channels, and industry associations that can help extend our reach and enhance our service offerings.`;
}

// Marketing Plan mock generator
export function generateMarketingPlan(formData: BusinessFormData): string {
  const { targetMarket } = extractDetails(formData);
  
  return `Our marketing strategy for ${formData.businessName} is focused on creating a strong brand presence and directly engaging with our target market of ${targetMarket}.

Core marketing initiatives include:

1. Digital Presence: A comprehensive SEO-optimized website, social media presence across key platforms, and content marketing to establish thought leadership.

2. Targeted Advertising: Precision-targeted digital advertising campaigns focused on high-value customer segments, with clear conversion pathways.

3. Industry Partnerships: Strategic alliances with complementary businesses and industry influencers to extend reach.

4. Customer Relationship Management: Proactive engagement, loyalty programs, and referral incentives to maximize customer lifetime value.

5. Analytics-Driven Optimization: Continuous refinement of marketing approaches based on performance data and customer feedback.

Our customer acquisition cost target is $X, with a projected customer lifetime value of $Y, creating a healthy 3:1 LTV:CAC ratio.`;
}

// Financial Projections mock generator
export function generateFinancialProjections(formData: BusinessFormData): string {
  return `Based on our market analysis and business model, we project the following financial outcomes for ${formData.businessName}:

Year 1:
- Revenue: $500,000
- Expenses: $350,000
- Net Profit: $150,000
- Profit Margin: 30%

Year 2:
- Revenue: $1,000,000
- Expenses: $600,000
- Net Profit: $400,000
- Profit Margin: 40%

Year 3:
- Revenue: $1,750,000
- Expenses: $875,000
- Net Profit: $875,000
- Profit Margin: 50%

These projections are based on a conservative growth model that accounts for market expansion, increased customer acquisition efficiency, and economies of scale. Key financial metrics include a projected break-even point at month 18, ROI of 125% by end of year 3, and sustainable cash flow positive operations from month 15.`;
}

// Risk Assessment mock generator
export function generateRiskAssessment(formData: BusinessFormData): string {
  const { industry, targetMarket } = extractDetails(formData);
  
  return `Every business venture faces potential risks and challenges. For ${formData.businessName}, we've identified the following key risk factors and mitigation strategies:

1. Market Risks:
   - Changing consumer preferences in the ${industry} industry
   - New competitive entrants
   - Economic downturns affecting ${targetMarket}
   Mitigation: Continuous market research, agile product development, diversified customer base

2. Operational Risks:
   - Supply chain disruptions
   - Technology failures or cybersecurity threats
   - Talent acquisition and retention challenges
   Mitigation: Redundant suppliers, robust IT security protocols, competitive compensation and culture

3. Financial Risks:
   - Cash flow management during growth phases
   - Access to capital for expansion
   - Currency or pricing fluctuations
   Mitigation: Conservative cash reserves, diversified funding sources, flexible pricing models

4. Regulatory Risks:
   - Changes in industry regulations
   - Data privacy and protection requirements
   - Intellectual property challenges
   Mitigation: Regulatory monitoring system, compliance-first approach, strong IP protection

We will implement a quarterly risk assessment review process to ensure all potential threats are identified early and addressed proactively.`;
}

// SWOT Analysis mock generator
export function generateSwotAnalysis(formData: BusinessFormData): string {
  const { industry, targetMarket } = extractDetails(formData);
  
  return `SWOT Analysis for ${formData.businessName}:

STRENGTHS:
- Innovative approach to solving problems in the ${industry} industry
- Strong understanding of ${targetMarket} needs and preferences
- Focused business vision and mission
- Efficient operational model with scalability
- Talented and experienced founding team

WEAKNESSES:
- Limited initial brand recognition in competitive market
- Resource constraints typical of early-stage ventures
- Potential gaps in specialized expertise
- Dependency on key personnel
- Limited historical data for decision-making

OPPORTUNITIES:
- Growing market demand in the ${industry} sector
- Technological advancements enabling new solutions
- Underserved segments within ${targetMarket}
- Potential for strategic partnerships and integrations
- International expansion possibilities

THREATS:
- Established competitors with greater resources
- Rapidly evolving industry standards and technologies
- Economic uncertainties affecting consumer spending
- Potential regulatory changes impacting operations
- Emerging disruptive business models

This SWOT analysis will be reviewed quarterly and updated as the business evolves and new information becomes available.`;
}
