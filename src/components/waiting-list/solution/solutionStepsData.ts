
// Steps data defining the validation process - condensed to 4 key steps
export const validationSteps = [{
  number: 1,
  title: "Define Your Idea",
  description: "Clearly describe your business concept, the audience you're targeting, and the problem you're solving. Instantly get a Viability Score and see how your idea stacks up."
}, {
  number: 2,
  title: "Get a Custom Validation Plan",
  description: "Receive a tailored roadmap that includes landing pages, ad templates, and interview questions to test your idea in the real world."
}, {
  number: 3,
  title: "Book a Strategy Session",
  description: "Schedule a free 30-minute call with an expert business consultant to pressure-test your concept, uncover blind spots, and get niche-specific recommendations."
}, {
  number: 4,
  title: "Launch with Confidence",
  description: "Use your validated plan and expert feedback to move forward—build your MVP, launch targeted ads, Let us do the heavy lifting — we'll build your MVP, launch targeted ad campaigns, and start driving real traction while you focus on the fun stuff."
}];

// Enhanced code lines for the animated code display with execution simulation
export const codeLines = [
  { code: "<span class='text-pink-400'>const</span> <span class='text-blue-400'>validateBusinessIdea</span> = <span class='text-pink-400'>async</span> (idea) => {", delay: 0 },
  { code: "  <span class='text-green-400'>// Starting validation process...</span>", delay: 0.3, isComment: true },
  { code: "  <span class='text-blue-400'>const</span> marketData = <span class='text-pink-400'>await</span> fetchMarketAnalysis(idea.industry);", delay: 0.6 },
  { code: "  <span class='text-green-400 typing'>// Market size: $4.2B with 14% YoY growth</span>", delay: 1.0, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Trend analysis: Positive market sentiment</span>", delay: 1.2, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Industry maturity: Growth phase</span>", delay: 1.4, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> targetAudience = <span class='text-pink-400'>await</span> identifyAudience(idea.problem);", delay: 1.6 },
  { code: "  <span class='text-green-400 typing'>// Primary audience: Tech-savvy professionals, 28-45</span>", delay: 1.8, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Willingness to pay: Medium-high</span>", delay: 2.0, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Pain point intensity: 8/10</span>", delay: 2.2, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Customer acquisition channels: Social media, Content marketing</span>", delay: 2.4, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> competitors = <span class='text-pink-400'>await</span> analyzeCompetitors(idea.solution);", delay: 2.6 },
  { code: "  <span class='text-green-400 typing'>// Found 5 direct competitors, 3 indirect</span>", delay: 2.8, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Competitive advantage opportunity: 68%</span>", delay: 3.0, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Market saturation level: Moderate</span>", delay: 3.2, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Competitor pricing analysis: $15-$45/mo</span>", delay: 3.4, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> swotAnalysis = runSwotAnalysis({marketData, targetAudience, competitors});", delay: 3.6 },
  { code: "  <span class='text-green-400 typing'>// Strengths: Innovative approach, Lower cost structure</span>", delay: 3.8, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Weaknesses: Market awareness, Scaling challenges</span>", delay: 4.0, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Opportunities: Growing demand, Partnership potential</span>", delay: 4.2, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Threats: Regulatory changes, New entrants</span>", delay: 4.4, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> financialProjection = calculateFinancials(idea, marketData);", delay: 4.6 },
  { code: "  <span class='text-green-400 typing'>// Estimated break-even: 14 months</span>", delay: 4.8, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Projected 3-year ROI: 285%</span>", delay: 5.0, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Initial investment required: $75,000 - $120,000</span>", delay: 5.2, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Monthly burn rate: $8,500 (early stage)</span>", delay: 5.4, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> marketingChannels = analyzeMarketingEffectiveness(targetAudience);", delay: 5.6 },
  { code: "  <span class='text-green-400 typing'>// Most effective channels: Instagram (32%), Google Ads (28%)</span>", delay: 5.8, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Average CAC: $42.15, LTV: $850+</span>", delay: 6.0, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Content strategy: Educational blog posts + video tutorials</span>", delay: 6.2, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> validationScore = computeValidationScore({", delay: 6.4 },
  { code: "    marketData,", delay: 6.5 },
  { code: "    targetAudience,", delay: 6.6 },
  { code: "    competitors,", delay: 6.7 },
  { code: "    swotAnalysis,", delay: 6.8 },
  { code: "    financialProjection,", delay: 6.9 },
  { code: "    marketingChannels", delay: 7.0 },
  { code: "  });", delay: 7.1 },
  
  { code: "  <span class='text-blue-400'>if</span> (validationScore > 70) {", delay: 7.2 },
  { code: "    <span class='text-green-400 typing'>// Validation successful! Score: 78/100</span>", delay: 7.3, isOutput: true },
  { code: "    <span class='text-green-400 typing'>// Recommendation: Proceed with development</span>", delay: 7.5, isOutput: true },
  { code: "    <span class='text-green-400 typing'>// High likelihood of market success with proper execution</span>", delay: 7.7, isOutput: true },
  { code: "    <span class='text-pink-400'>return</span> {", delay: 7.9 },
  { code: "      status: <span class='text-orange-400'>'VALIDATED'</span>,", delay: 8.0 },
  { code: "      score: validationScore,", delay: 8.1 },
  { code: "      insights: { ", delay: 8.2 },
  { code: "        swotAnalysis, ", delay: 8.3 },
  { code: "        financialProjection,", delay: 8.4 },
  { code: "        marketingStrategy: generateMarketingPlan(marketingChannels)", delay: 8.5 },
  { code: "      }", delay: 8.6 },
  { code: "    };", delay: 8.7 },
  { code: "  } <span class='text-blue-400'>else</span> {", delay: 8.8 },
  { code: "    <span class='text-green-400 typing'>// Further validation required</span>", delay: 8.9, isOutput: true },
  { code: "    <span class='text-green-400 typing'>// Areas needing improvement: [Market fit, Pricing strategy]</span>", delay: 9.0, isOutput: true },
  { code: "    <span class='text-pink-400'>return</span> generateValidationPlan(idea, validationScore);", delay: 9.1 },
  { code: "  }", delay: 9.2 },
  { code: "};", delay: 9.3 },
  { code: "", delay: 9.4 },
  { code: "<span class='text-pink-400'>const</span> <span class='text-blue-400'>result</span> = <span class='text-pink-400'>await</span> validateBusinessIdea({", delay: 9.5 },
  { code: "  industry: <span class='text-orange-400'>'Health & Wellness'</span>,", delay: 9.6 },
  { code: "  problem: <span class='text-orange-400'>'Lack of personalized nutrition for busy professionals'</span>,", delay: 9.7 },
  { code: "  solution: <span class='text-orange-400'>'AI-driven meal subscription service'</span>,", delay: 9.8 },
  { code: "  targetMarket: <span class='text-orange-400'>'Urban professionals, 25-45, health-conscious'</span>", delay: 9.9 },
  { code: "});", delay: 10.0 },
  { code: "", delay: 10.1 },
  { code: "<span class='text-green-400 typing'>// ✅ Validation complete! Implementation plan generated.</span>", delay: 10.2, isOutput: true }
];
