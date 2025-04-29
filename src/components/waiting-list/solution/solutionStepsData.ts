
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
  
  { code: "  <span class='text-blue-400'>const</span> targetAudience = <span class='text-pink-400'>await</span> identifyAudience(idea.problem);", delay: 1.5 },
  { code: "  <span class='text-green-400 typing'>// Primary audience: Tech-savvy professionals, 28-45</span>", delay: 1.8, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Willingness to pay: Medium-high</span>", delay: 2.0, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> competitors = <span class='text-pink-400'>await</span> analyzeCompetitors(idea.solution);", delay: 2.3 },
  { code: "  <span class='text-green-400 typing'>// Found 5 direct competitors, 3 indirect</span>", delay: 2.6, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Competitive advantage opportunity: 68%</span>", delay: 2.9, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> swotAnalysis = runSwotAnalysis({marketData, targetAudience, competitors});", delay: 3.2 },
  { code: "  <span class='text-green-400 typing'>// Strengths: Innovative approach, Lower cost structure</span>", delay: 3.5, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Weaknesses: Market awareness, Scaling challenges</span>", delay: 3.8, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Opportunities: Growing demand, Partnership potential</span>", delay: 4.1, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Threats: Regulatory changes, New entrants</span>", delay: 4.4, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> financialProjection = calculateFinancials(idea, marketData);", delay: 4.7 },
  { code: "  <span class='text-green-400 typing'>// Estimated break-even: 14 months</span>", delay: 5.0, isOutput: true },
  { code: "  <span class='text-green-400 typing'>// Projected 3-year ROI: 285%</span>", delay: 5.3, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> validationScore = computeValidationScore({", delay: 5.6 },
  { code: "    marketData,", delay: 5.7 },
  { code: "    targetAudience,", delay: 5.8 },
  { code: "    competitors,", delay: 5.9 },
  { code: "    swotAnalysis,", delay: 6.0 },
  { code: "    financialProjection", delay: 6.1 },
  { code: "  });", delay: 6.2 },
  
  { code: "  <span class='text-blue-400'>if</span> (validationScore > 70) {", delay: 6.4 },
  { code: "    <span class='text-green-400 typing'>// Validation successful! Score: 78/100</span>", delay: 6.6, isOutput: true },
  { code: "    <span class='text-green-400 typing'>// Recommendation: Proceed with development</span>", delay: 6.9, isOutput: true },
  { code: "    <span class='text-pink-400'>return</span> {", delay: 7.2 },
  { code: "      status: <span class='text-orange-400'>'VALIDATED'</span>,", delay: 7.3 },
  { code: "      score: validationScore,", delay: 7.4 },
  { code: "      insights: { swotAnalysis, financialProjection }", delay: 7.5 },
  { code: "    };", delay: 7.6 },
  { code: "  } <span class='text-blue-400'>else</span> {", delay: 7.8 },
  { code: "    <span class='text-green-400 typing'>// Further validation required</span>", delay: 8.0, isOutput: true },
  { code: "    <span class='text-pink-400'>return</span> generateValidationPlan(idea, validationScore);", delay: 8.3 },
  { code: "  }", delay: 8.5 },
  { code: "};", delay: 8.7 }
];
