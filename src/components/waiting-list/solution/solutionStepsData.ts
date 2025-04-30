
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
  description: "Use your validated plan and expert feedback to move forward — and let us do the heavy lifting. We'll build your MVP, launch targeted ad campaigns, and start driving real traction while you focus on the fun stuff."
}];

// Expanded code lines for the taller animated code display with some additional lines
export const codeLines = [
  { code: "<span class='text-pink-400'>const</span> <span class='text-blue-400'>validateIdea</span> = <span class='text-pink-400'>async</span> (idea) => {", delay: 0 },
  { code: "  <span class='text-green-400'>// Analyzing market potential...</span>", delay: 0.3, isComment: true },
  { code: "  <span class='text-blue-400'>const</span> market = <span class='text-pink-400'>await</span> getMarketData(idea.industry);", delay: 0.6 },
  { code: "  <span class='text-green-400 typing'>// $4.2B market, 14% annual growth</span>", delay: 0.8, isOutput: true },
  
  { code: "  <span class='text-green-400'>// Identifying target audience...</span>", delay: 1.0, isComment: true },
  { code: "  <span class='text-blue-400'>const</span> audience = <span class='text-pink-400'>await</span> findAudience(idea.problem);", delay: 1.2 },
  { code: "  <span class='text-green-400 typing'>// Tech professionals, 28-45, $90K+ income</span>", delay: 1.4, isOutput: true },
  
  { code: "  <span class='text-green-400'>// Evaluating competitive landscape...</span>", delay: 1.6, isComment: true },
  { code: "  <span class='text-blue-400'>const</span> competitors = analyzeCompetition(idea.solution);", delay: 1.8 },
  { code: "  <span class='text-green-400 typing'>// 5 competitors identified, 2 major players</span>", delay: 2.0, isOutput: true },
  
  { code: "  <span class='text-green-400'>// Calculating validation score...</span>", delay: 2.2, isComment: true },
  { code: "  <span class='text-blue-400'>const</span> score = calculateScore(market, audience, competitors);", delay: 2.4 },
  { code: "  <span class='text-green-400 typing'>// Processing validation metrics...</span>", delay: 2.6, isOutput: true },
  
  { code: "  <span class='text-blue-400'>if</span> (score > 70) {", delay: 2.8 },
  { code: "    <span class='text-green-400 typing'>// Score: 78/100 - Validated!</span>", delay: 3.0, isOutput: true },
  { code: "    <span class='text-pink-400'>return</span> { status: <span class='text-orange-400'>'VALIDATED'</span>, score };", delay: 3.2 },
  { code: "  } <span class='text-blue-400'>else</span> {", delay: 3.4 },
  { code: "    <span class='text-pink-400'>return</span> buildValidationPlan(idea, score);", delay: 3.6 },
  { code: "  }", delay: 3.8 },
  { code: "};", delay: 4.0 },
  
  { code: "<span class='text-green-400'>// Testing with real business idea...</span>", delay: 4.1, isComment: true },
  { code: "<span class='text-pink-400'>const</span> result = <span class='text-pink-400'>await</span> validateIdea({", delay: 4.2 },
  { code: "  industry: <span class='text-orange-400'>'Health & Wellness'</span>,", delay: 4.3 },
  { code: "  problem: <span class='text-orange-400'>'Lack of personalized nutrition'</span>,", delay: 4.4 },
  { code: "  solution: <span class='text-orange-400'>'AI-driven meal subscription'</span>", delay: 4.5 },
  { code: "});", delay: 4.6 },
  
  { code: "<span class='text-green-400'>// Creating validation assets...</span>", delay: 4.7, isComment: true },
  { code: "generateLandingPage(result.targetAudience);", delay: 4.8 },
  { code: "setupAdCampaigns(result.keywords);", delay: 4.9 },
  { code: "prepareInterviewQuestions(result.hypotheses);", delay: 5.0 },
  { code: "<span class='text-green-400 typing'>// ✅ Validation complete! Ready to launch.</span>", delay: 5.1, isOutput: true }
];
