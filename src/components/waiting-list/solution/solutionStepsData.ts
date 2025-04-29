
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

// Enhanced code lines for the animated code display with execution simulation
export const codeLines = [
  { code: "<span class='text-pink-400'>const</span> <span class='text-blue-400'>validateBusinessIdea</span> = <span class='text-pink-400'>async</span> (idea) => {", delay: 0 },
  { code: "  <span class='text-green-400'>// Starting validation process...</span>", delay: 0.3, isComment: true },
  { code: "  <span class='text-blue-400'>const</span> marketData = <span class='text-pink-400'>await</span> fetchMarketAnalysis(idea.industry);", delay: 0.6 },
  { code: "  <span class='text-green-400 typing'>// Market size: $4.2B with 14% YoY growth</span>", delay: 1.0, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> targetAudience = <span class='text-pink-400'>await</span> identifyAudience(idea.problem);", delay: 1.6 },
  { code: "  <span class='text-green-400 typing'>// Primary audience: Tech-savvy professionals, 28-45</span>", delay: 1.8, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> competitors = <span class='text-pink-400'>await</span> analyzeCompetitors(idea.solution);", delay: 2.6 },
  { code: "  <span class='text-green-400 typing'>// Found 5 direct competitors, 3 indirect</span>", delay: 2.8, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> swotAnalysis = runSwotAnalysis({marketData, targetAudience, competitors});", delay: 3.6 },
  { code: "  <span class='text-green-400 typing'>// Strengths: Innovative approach, Lower cost structure</span>", delay: 3.8, isOutput: true },
  
  { code: "  <span class='text-blue-400'>const</span> validationScore = computeValidationScore({", delay: 6.4 },
  { code: "    marketData, targetAudience, competitors, swotAnalysis,", delay: 6.5 },
  { code: "    financialProjection: calculateFinancials(idea, marketData),", delay: 6.6 },
  { code: "    marketingChannels: analyzeMarketingEffectiveness(targetAudience)", delay: 6.7 },
  { code: "  });", delay: 7.1 },
  
  { code: "  <span class='text-blue-400'>if</span> (validationScore > 70) {", delay: 7.2 },
  { code: "    <span class='text-green-400 typing'>// Validation successful! Score: 78/100</span>", delay: 7.3, isOutput: true },
  { code: "    <span class='text-pink-400'>return</span> { status: <span class='text-orange-400'>'VALIDATED'</span>, score: validationScore };", delay: 7.9 },
  { code: "  } <span class='text-blue-400'>else</span> {", delay: 8.8 },
  { code: "    <span class='text-green-400 typing'>// Further validation required</span>", delay: 8.9, isOutput: true },
  { code: "    <span class='text-pink-400'>return</span> generateValidationPlan(idea, validationScore);", delay: 9.1 },
  { code: "  }", delay: 9.2 },
  { code: "};", delay: 9.3 },
  { code: "", delay: 9.4 },
  { code: "<span class='text-pink-400'>const</span> <span class='text-blue-400'>result</span> = <span class='text-pink-400'>await</span> validateBusinessIdea({", delay: 9.5 },
  { code: "  industry: <span class='text-orange-400'>'Health & Wellness'</span>,", delay: 9.6 },
  { code: "  problem: <span class='text-orange-400'>'Lack of personalized nutrition'</span>,", delay: 9.7 },
  { code: "  solution: <span class='text-orange-400'>'AI-driven meal subscription'</span>", delay: 9.8 },
  { code: "});", delay: 9.9 },
  { code: "", delay: 10.0 },
  { code: "<span class='text-green-400 typing'>// ✅ Validation complete! Plan generated.</span>", delay: 10.2, isOutput: true }
];
