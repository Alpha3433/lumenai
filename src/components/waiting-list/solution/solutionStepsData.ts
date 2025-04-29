
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
  { code: "<span class='text-pink-400'>const</span> <span class='text-blue-400'>validateIdea</span> = <span class='text-pink-400'>async</span> (idea) => {", delay: 0 },
  { code: "  <span class='text-green-400'>// Step 1: Running initial market analysis...</span>", delay: 0.3, isComment: true },
  { code: "  <span class='text-blue-400'>const</span> marketData = <span class='text-pink-400'>await</span> fetchMarketData(idea.category);", delay: 0.6 },
  { code: "  <span class='text-green-400 typing'>// Market size data retrieved: $4.2B annual revenue, 13.7% CAGR</span>", delay: 1.0, isOutput: true },
  { code: "  <span class='text-blue-400'>const</span> targetAudience = <span class='text-pink-400'>await</span> identifyAudience(idea.description);", delay: 1.5 },
  { code: "  <span class='text-green-400 typing'>// Audience identified: Tech-savvy professionals, 28-45 age range</span>", delay: 1.8, isOutput: true },
  { code: "  <span class='text-green-400'>// Step 2: Analyzing competitor landscape...</span>", delay: 2.3, isComment: true },
  { code: "  <span class='text-blue-400'>const</span> competitors = <span class='text-pink-400'>await</span> findCompetitors(idea.keywords);", delay: 2.7 },
  { code: "  <span class='text-green-400 typing'>// Found 9 competitors with average rating of 3.6/5</span>", delay: 3.0, isOutput: true },
  { code: "  <span class='text-blue-400'>const</span> competitiveAnalysis = analyzeCompetitors(competitors, idea.uniqueSellingPoints);", delay: 3.4 },
  { code: "  <span class='text-green-400 typing'>// Unique differentiation score: 72/100</span>", delay: 3.7, isOutput: true },
  { code: "  <span class='text-green-400'>// Step 3: Calculating market-fit score...</span>", delay: 4.2, isComment: true },
  { code: "  <span class='text-blue-400'>const</span> problemSolution = analyzeProblemSolutionFit(idea.problem, idea.solution);", delay: 4.6 },
  { code: "  <span class='text-green-400 typing'>// Problem-solution fit assessment: Strong (85%)</span>", delay: 4.9, isOutput: true },
  { code: "  <span class='text-blue-400'>const</span> marketFit = calculateMarketFit(targetAudience, idea.solution);", delay: 5.4 },
  { code: "  <span class='text-green-400 typing'>// Product-market fit probability: High (78%)</span>", delay: 5.7, isOutput: true },
  { code: "  <span class='text-green-400'>// Step 4: Generating final validation report...</span>", delay: 6.2, isComment: true },
  { code: "  <span class='text-blue-400'>const</span> validationScore = calculateValidationScore({", delay: 6.6 },
  { code: "    marketData,", delay: 6.7 },
  { code: "    competitiveAnalysis,", delay: 6.8 },
  { code: "    problemSolution,", delay: 6.9 },
  { code: "    marketFit", delay: 7.0 },
  { code: "  });", delay: 7.1 },
  { code: "  <span class='text-green-400 typing'>// Final validation score calculated: 82/100</span>", delay: 7.4, isOutput: true },
  { code: "  <span class='text-blue-400'>const</span> validationReport = generateValidationReport(validationScore);", delay: 7.8 },
  { code: "  <span class='text-green-400 typing'>// Report generated with 5 key recommendations</span>", delay: 8.1, isOutput: true },
  { code: "  <span class='text-blue-400'>if</span> (validationScore.total > 75) {", delay: 8.5 },
  { code: "    <span class='text-pink-400'>return</span> {", delay: 8.7 },
  { code: "      success: <span class='text-orange-400'>true</span>,", delay: 8.8 },
  { code: "      score: validationScore,", delay: 8.9 },
  { code: "      insights: validationReport.insights,", delay: 9.0 },
  { code: "      nextSteps: validationReport.recommendations", delay: 9.1 },
  { code: "    };", delay: 9.2 },
  { code: "  } <span class='text-blue-400'>else</span> {", delay: 9.4 },
  { code: "    <span class='text-green-400 typing'>// Suggested pivots and improvements identified</span>", delay: 9.6, isOutput: true },
  { code: "    <span class='text-pink-400'>return</span> {", delay: 9.8 },
  { code: "      success: <span class='text-orange-400'>false</span>,", delay: 9.9 },
  { code: "      score: validationScore,", delay: 10.0 },
  { code: "      pivotSuggestions: validationReport.pivotOptions", delay: 10.1 },
  { code: "    };", delay: 10.2 },
  { code: "  }", delay: 10.3 },
  { code: "}", delay: 10.5 }
];
