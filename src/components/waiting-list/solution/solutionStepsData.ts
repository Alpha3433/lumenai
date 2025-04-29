
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
  { code: "  <span class='text-green-400'>// Running market analysis...</span>", delay: 0.3, isComment: true },
  { code: "<span class='text-blue-400'>  const</span> targetAudience = <span class='text-pink-400'>await</span> identifyAudience(idea);", delay: 0.5 },
  { code: "  <span class='text-green-400 typing'>// Audience identified: Early tech adopters, 25-40 age range</span>", delay: 0.8, isOutput: true },
  { code: "<span class='text-blue-400'>  const</span> marketSize = <span class='text-pink-400'>await</span> calculateTAM(idea.industry);", delay: 1.2 },
  { code: "  <span class='text-green-400 typing'>// Market size calculated: $3.4B with 18% annual growth</span>", delay: 1.5, isOutput: true },
  { code: "<span class='text-blue-400'>  const</span> competitors = <span class='text-pink-400'>await</span> findCompetitors(idea.keywords);", delay: 2.0 },
  { code: "  <span class='text-green-400 typing'>// Found 7 competitors with average rating of 3.2/5</span>", delay: 2.3, isOutput: true },
  { code: "<span class='text-blue-400'>  const</span> validationScore = analyzeData(targetAudience, marketSize, competitors);", delay: 2.8 },
  { code: "  <span class='text-blue-400'>if</span> (validationScore > 75) {", delay: 3.2 },
  { code: "    <span class='text-green-400 typing'>// Idea passes validation threshold! Score: 82/100</span>", delay: 3.4, isOutput: true },
  { code: "    <span class='text-pink-400'>return</span> { success: <span class='text-orange-400'>true</span>, score: validationScore, insights: [...] };", delay: 3.8 },
  { code: "  }", delay: 4.0 },
  { code: "}", delay: 4.2 }
];
