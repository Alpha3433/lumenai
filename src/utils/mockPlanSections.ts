
import { BusinessFormData } from "./planGenerator";

// Executive Summary mock generator
export function generateExecutiveSummary(formData: BusinessFormData): string {
  return `${formData.businessName} is an innovative ${formData.industry} company that ${formData.businessDescription}. Our mission is to provide exceptional solutions for ${formData.targetMarket}. 

With a clear focus on quality and customer satisfaction, we aim to establish ourselves as a leading provider in the ${formData.industry} sector. 

Our key objectives include scaling operations efficiently, developing a strong customer base, and achieving sustainable growth while maintaining high standards of service delivery.`;
}

// Market Analysis mock generator
export function generateMarketAnalysis(formData: BusinessFormData): string {
  return `The ${formData.industry} industry is currently experiencing significant growth, with a projected annual expansion rate of 7.5% over the next five years. Key trends include technological innovation, increased consumer demand for personalized solutions, and a shift towards digital-first approaches.

Our target market of ${formData.targetMarket} represents a $4.2 billion opportunity, with an expected growth of 12% annually. This demographic shows strong engagement with products similar to ours, with a high willingness to pay for quality and convenience.

Major competitors in this space include Industry Leader A (35% market share), Rising Competitor B (15% market share), and Traditional Provider C (20% market share). ${formData.competitorInfo ? `Specific competitors mentioned include ${formData.competitorInfo}.` : ''} 

Our competitive advantage lies in our innovative approach, superior customer experience, and ability to rapidly adapt to changing market conditions.`;
}

// Business Model mock generator
export function generateBusinessModel(formData: BusinessFormData): string {
  return `${formData.businessName} will operate on a ${formData.revenue ? formData.revenue.includes('subscription') ? 'subscription-based' : 'revenue-based' : 'value-driven'} model, offering premium solutions to ${formData.targetMarket}.

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
  return `Our marketing strategy for ${formData.businessName} is focused on creating a strong brand presence and directly engaging with our target market of ${formData.targetMarket}.

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
- Revenue: ${formData.revenue || '$500,000'}
- Expenses: $350,000
- Net Profit: ${formData.revenue ? `$${(parseInt(formData.revenue.replace(/[^0-9]/g, '')) * 0.3).toLocaleString()}` : '$150,000'}
- Profit Margin: 30%

Year 2:
- Revenue: ${formData.revenue ? `$${(parseInt(formData.revenue.replace(/[^0-9]/g, '')) * 2).toLocaleString()}` : '$1,000,000'}
- Expenses: $600,000
- Net Profit: ${formData.revenue ? `$${(parseInt(formData.revenue.replace(/[^0-9]/g, '')) * 0.4 * 2).toLocaleString()}` : '$400,000'}
- Profit Margin: 40%

Year 3:
- Revenue: ${formData.revenue ? `$${(parseInt(formData.revenue.replace(/[^0-9]/g, '')) * 3.5).toLocaleString()}` : '$1,750,000'}
- Expenses: $875,000
- Net Profit: ${formData.revenue ? `$${(parseInt(formData.revenue.replace(/[^0-9]/g, '')) * 0.5 * 3.5).toLocaleString()}` : '$875,000'}
- Profit Margin: 50%

These projections are based on a conservative growth model that accounts for market expansion, increased customer acquisition efficiency, and economies of scale. Key financial metrics include a projected break-even point at month 18, ROI of 125% by end of year 3, and sustainable cash flow positive operations from month 15.`;
}

// Risk Assessment mock generator
export function generateRiskAssessment(formData: BusinessFormData): string {
  return `Every business venture faces potential risks and challenges. For ${formData.businessName}, we've identified the following key risk factors and mitigation strategies:

1. Market Risks:
   - Changing consumer preferences in the ${formData.industry} industry
   - New competitive entrants
   - Economic downturns affecting ${formData.targetMarket}
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

// Implementation Timeline mock generator
export function generateImplementationTimeline(formData: BusinessFormData): string {
  return `Implementation Roadmap for ${formData.businessName}:

Phase 1: Foundation (Months 1-3)
- Complete business registration and legal setup
- Finalize core team hiring
- Develop minimum viable product/service
- Establish initial web presence and brand identity
- Secure seed funding or initial capital deployment

Phase 2: Market Entry (Months 4-6)
- Launch product/service to early adopters
- Implement initial marketing campaigns
- Establish key partnerships and vendor relationships
- Set up customer feedback and analytics systems
- Refine offering based on initial market response

Phase 3: Growth Acceleration (Months 7-12)
- Scale marketing and sales operations
- Expand product/service offerings
- Optimize operational efficiency
- Hire additional team members in key growth areas
- Implement customer retention and loyalty programs

Phase 4: Expansion (Months 13-24)
- Consider geographic or market segment expansion
- Introduce additional revenue streams
- Evaluate strategic partnerships or acquisition opportunities
- Implement advanced data analytics for decision-making
- Review and revise long-term strategic goals

Each phase includes specific milestones, KPIs, and responsible team members to ensure accountability and measurable progress.`;
}

// SWOT Analysis mock generator
export function generateSwotAnalysis(formData: BusinessFormData): string {
  return `SWOT Analysis for ${formData.businessName}:

STRENGTHS:
- Innovative approach to solving problems in the ${formData.industry} industry
- Strong understanding of ${formData.targetMarket} needs and preferences
- ${formData.businessGoals ? `Clear business goals: ${formData.businessGoals}` : 'Focused business vision and mission'}
- Efficient operational model with scalability
- Talented and experienced founding team

WEAKNESSES:
- Limited initial brand recognition in competitive market
- Resource constraints typical of early-stage ventures
- Potential gaps in specialized expertise
- Dependency on key personnel
- Limited historical data for decision-making

OPPORTUNITIES:
- Growing market demand in the ${formData.industry} sector
- Technological advancements enabling new solutions
- Underserved segments within ${formData.targetMarket}
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
