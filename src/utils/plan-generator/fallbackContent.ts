import { BusinessFormData } from "./types";

// Function to generate fallback content based on section and business info
export function getFallbackContent(sectionName: string, formData: BusinessFormData): string {
  const { businessName, businessDescription } = formData;
  
  if (sectionName.includes('executive summary')) {
    return `${businessName} is an innovative business that ${businessDescription.substring(0, 100)}... 

Our target market includes tech-savvy consumers and businesses looking for efficiency improvements. We expect to generate revenue through a subscription-based model with premium features and add-ons.

With a strong focus on customer experience and innovative solutions, ${businessName} is positioned to capture a significant market share in a growing industry. Our competitive advantages include scalability, low startup costs, and a clear path to profitability.`;
  } else if (sectionName.includes('market analysis')) {
    return `# Market Analysis for ${businessName}

## Market Size and Growth
The global market for this type of business is estimated at $50 billion annually with a projected growth rate of 15% over the next five years.

## Target Market Segments
1. **Primary Segment: Tech-savvy consumers**
   - Estimated 150 million potential customers globally
   - Growing at 12% annually
   - High willingness to try new solutions

2. **Secondary Segment: Small to medium businesses**
   - Approximately 35 million businesses in target regions
   - Seeking efficiency improvements and cost reduction
   - Average annual spending on similar solutions: $2,500-$5,000

## Competitive Landscape
Several established players exist in the market, but there remains opportunity for differentiation through superior user experience and targeted features.

## Market Trends
1. Increasing demand for digital solutions
2. Growing preference for subscription-based services
3. Rising importance of mobile accessibility
4. Heightened focus on data privacy and security

Based on this analysis, ${businessName} has a significant opportunity to establish itself in this growing market by addressing specific needs that current solutions fail to meet adequately.`;
  } else if (sectionName.includes('swot')) {
    return `# SWOT Analysis for ${businessName}

## Strengths

- Innovative business model that differentiates from current market offerings
- Scalable platform with low operational overhead
- Strong technical expertise in core business areas
- First-mover advantage in specific target segments

## Weaknesses

- Limited initial brand recognition compared to established competitors
- Untested pricing model may require adjustment
- Dependence on third-party integrations for full functionality
- Initial resource constraints during growth phase

## Opportunities

- Rapidly expanding market with double-digit growth projections
- Increasing customer familiarity with subscription services
- Potential for international expansion after establishing domestic presence
- Strategic partnership possibilities with complementary service providers

## Threats

- Potential entry of well-funded competitors
- Changing regulatory landscape affecting operations
- Technology evolution requiring continuous adaptation
- Economic uncertainties impacting customer spending

This SWOT analysis highlights ${businessName}'s competitive positioning, with significant strengths and opportunities that outweigh identified weaknesses and threats.`;
  }
  
  // Generic fallback for other sections
  return `This section provides comprehensive analysis and strategic recommendations for ${businessName} based on the business description: "${businessDescription.substring(0, 100)}..."

The content addresses key considerations relevant to this type of business, including industry standards, best practices, and future growth opportunities. While this is example content, it represents the general structure and approach that would be included in a fully personalized analysis.`;
}
