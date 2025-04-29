
// Steps data defining the validation process
export const validationSteps = [{
  number: 1,
  title: "Define your idea",
  description: "Clearly articulate your startup concept, target audience, and the problem you're solving."
}, {
  number: 2,
  title: "Get a detailed validation plan",
  description: "Receive a customized roadmap for validating your specific idea with data-driven methods."
}, {
  number: 3,
  title: "Start a testing phase",
  description: "Deploy lightweight experiments to test your core assumptions with real users."
}, {
  number: 4,
  title: "Talk to Product Owners & Early Adopters",
  description: "Connect with potential customers to gather insights and validate demand."
}, {
  number: 5,
  title: "Collect real feedback from social media",
  description: "Leverage targeted platforms to gauge interest and gather unbiased opinions."
}, {
  number: 6,
  title: "Analyze detailed feedback from customers",
  description: "Identify patterns and insights from user feedback to refine your concept."
}, {
  number: 7,
  title: "Revise your idea based on feedback",
  description: "Iterate on your concept based on validation data to improve product-market fit."
}];

// Code lines for the animated code display
export const codeLines = [
  { code: "<span class='text-pink-400'>const</span> <span class='text-blue-400'>validateIdea</span> = <span class='text-pink-400'>async</span> (idea) => {", delay: 0 },
  { code: "<span class='text-blue-400'>  const</span> targetAudience = <span class='text-pink-400'>await</span> identifyAudience(idea);", delay: 0.4 },
  { code: "<span class='text-blue-400'>  const</span> marketSize = <span class='text-pink-400'>await</span> calculateTAM(idea.industry);", delay: 0.8 },
  { code: "<span class='text-blue-400'>  const</span> competitors = <span class='text-pink-400'>await</span> findCompetitors(idea.keywords);", delay: 1.2 },
  { code: "<span class='text-blue-400'>  const</span> validationScore = analyzeData(targetAudience, marketSize, competitors);", delay: 1.6 },
  { code: "  <span class='text-pink-400'>return</span> { score: validationScore, insights: [...] };", delay: 2.0 },
  { code: "}", delay: 2.4 }
];
