
import { callOpenAI } from './openaiService';

interface GenerateContentParams {
  sectionType: string;
  businessName: string;
  businessDescription: string;
}

export async function generateDynamicContent({
  sectionType,
  businessName,
  businessDescription
}: GenerateContentParams): Promise<any> {
  try {
    const prompt = createPromptForSectionType(sectionType, businessName, businessDescription);
    
    const response = await callOpenAI({
      prompt,
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 1000
    });
    
    if (!response.success) {
      console.error(`Error generating ${sectionType} content:`, response.error);
      throw new Error(`Failed to generate ${sectionType} content`);
    }
    
    // Parse the response to transform it into structured data
    const parsedData = parseResponseData(sectionType, response.text);
    return parsedData;
  } catch (error) {
    console.error(`Error in generateDynamicContent for ${sectionType}:`, error);
    // Return fallback data
    return getFallbackData(sectionType, businessName);
  }
}

function createPromptForSectionType(sectionType: string, businessName: string, businessDescription: string): string {
  const baseContext = `
Business Name: ${businessName}
Business Description: ${businessDescription}

Based on this business information, generate JSON-formatted data for the specified section.
`;

  const prompts: Record<string, string> = {
    'customer-personas': `${baseContext}

Generate 3 detailed customer personas for this business. Format the response as a JSON array with each persona having these fields:
- name: A realistic name for the persona
- role: Their job title or role
- emoji: An emoji that represents this persona
- demographics: Age range, location, education level, etc.
- goals: An array of 3 specific goals they want to achieve
- painPoints: An array of 3 specific problems they face

Format it strictly as valid JSON like this (include the square brackets):
[
  {
    "name": "...",
    "role": "...",
    "emoji": "...",
    "demographics": "...",
    "goals": ["...", "...", "..."],
    "painPoints": ["...", "...", "..."]
  },
  {...},
  {...}
]`,

    'competitive-matrix': `${baseContext}

Create a competitive feature matrix for this business. Format as a JSON object with:
- features: Array of features this business offers (at least 5)
- competitors: Array of 3-4 competing businesses

Each feature object should have:
- name: The feature name
- competitorStatus: Array of statuses for each competitor ("yes", "no", "partial")

Each competitor object should have:
- name: The competitor business name
- marketShare: Estimated market share

Format it strictly as valid JSON like this:
{
  "features": [
    {
      "name": "...",
      "competitorStatus": ["yes", "no", "partial", "..."]
    },
    {...}
  ],
  "competitors": [
    {
      "name": "...",
      "marketShare": "..."
    },
    {...}
  ]
}`,

    'gtm-strategy': `${baseContext}

Create a Go-To-Market strategy with launch phases and scaling playbook. Format as a JSON object with:
- phases: Array of 3 phases (Pre-launch, Launch, Post-launch)
- scalingPlaybook: Array of 4 milestone steps

Each phase object should have:
- name: The phase name
- activities: Array of 4 specific activities to perform in this phase

Each playbook step should have:
- milestone: The specific milestone or goal
- description: Detailed description of what to focus on

Format it strictly as valid JSON like this:
{
  "phases": [
    {
      "name": "...",
      "activities": ["...", "...", "...", "..."]
    },
    {...},
    {...}
  ],
  "scalingPlaybook": [
    {
      "milestone": "...",
      "description": "..."
    },
    {...},
    {...},
    {...}
  ]
}`,

    'monetization-experiments': `${baseContext}

Create a set of 4 monetization experiments for this business. Format as a JSON object with:
- models: Array of 4 monetization models to test

Each model object should have:
- name: The name of the monetization model
- icon: One of "CreditCard", "BarChart4", "CircleDollarSign", or "Lightbulb"
- description: A detailed description of how this model works
- revenue: Potential monthly revenue estimate (e.g. "$5,000 - $10,000/mo")
- timeline: Implementation time estimate (e.g. "1-2 months")
- metric: The key metric to track for this model

Format it strictly as valid JSON like this:
{
  "models": [
    {
      "name": "...",
      "icon": "...",
      "description": "...",
      "revenue": "...",
      "timeline": "...",
      "metric": "..."
    },
    {...},
    {...},
    {...}
  ]
}`,

    'risk-mitigation': `${baseContext}

Create 3 comprehensive risk mitigation strategies for this business. Format as a JSON array with each risk having:
- name: The risk name
- category: One of "Technology", "Market", "User", "Financial", "Legal", "Operational"
- severity: One of "Low", "Medium", "High"
- description: Detailed description of the risk
- warningSignals: Array of 3 early warning signs to watch for
- mitigation: Detailed strategy to mitigate the risk
- contingency: Backup plan if the risk materializes

Format it strictly as valid JSON like this:
[
  {
    "name": "...",
    "category": "...",
    "severity": "...",
    "description": "...",
    "warningSignals": ["...", "...", "..."],
    "mitigation": "...",
    "contingency": "..."
  },
  {...},
  {...}
]`
  };

  return prompts[sectionType] || `${baseContext}\n\nGenerate detailed content for the ${sectionType} section of this business plan.`;
}

function parseResponseData(sectionType: string, responseText: string): any {
  try {
    // Try to extract JSON from the response
    let jsonMatch = responseText.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // If we can't find JSON, return the raw text
    console.warn(`Could not find valid JSON in the response for ${sectionType}. Using fallback data.`);
    return null;
  } catch (error) {
    console.error(`Error parsing response for ${sectionType}:`, error);
    return null;
  }
}

function getFallbackData(sectionType: string, businessName: string): any {
  // Provide fallback data based on section type
  switch (sectionType) {
    case 'customer-personas':
      return [
        {
          name: "Alex Thompson",
          role: "Marketing Director",
          emoji: "🎯",
          demographics: "35-45, urban, Master's degree",
          goals: ["Increase brand awareness", "Optimize marketing ROI", "Develop digital-first strategy"],
          painPoints: ["Limited budget", "Difficulty measuring ROI", "Keeping up with digital trends"]
        },
        {
          name: "Samantha Chen",
          role: "Small Business Owner",
          emoji: "💼",
          demographics: "28-40, suburban, Bachelor's degree",
          goals: ["Grow customer base", "Streamline operations", "Increase online presence"],
          painPoints: ["Time constraints", "Limited technical knowledge", "Competition from larger companies"]
        },
        {
          name: "Marcus Johnson",
          role: "Tech-Savvy Professional",
          emoji: "💻",
          demographics: "25-35, urban, tech-focused career",
          goals: ["Find efficient solutions", "Stay ahead of technology curve", "Optimize daily workflow"],
          painPoints: ["Information overload", "Multiple platform management", "Finding reliable tools"]
        }
      ];
    
    case 'competitive-matrix':
      return {
        features: [
          { name: "User-friendly interface", competitorStatus: ["yes", "no", "partial"] },
          { name: "Mobile application", competitorStatus: ["partial", "yes", "no"] },
          { name: "Data analytics", competitorStatus: ["yes", "partial", "partial"] },
          { name: "24/7 Customer support", competitorStatus: ["yes", "no", "no"] },
          { name: "Customization options", competitorStatus: ["yes", "partial", "yes"] }
        ],
        competitors: [
          { name: "TechSolutions Inc.", marketShare: "35%" },
          { name: "InnovateCorp", marketShare: "25%" },
          { name: "DynamicSystems", marketShare: "15%" }
        ]
      };
    
    case 'gtm-strategy':
      return {
        phases: [
          {
            name: "Pre-launch",
            activities: [
              "Beta testing with 100 users",
              "Collect testimonials and feedback",
              "Refine product based on user insights",
              "Build waiting list and anticipation"
            ]
          },
          {
            name: "Launch",
            activities: [
              "Social media blitz across platforms",
              "Press release to industry publications",
              "Influencer partnerships go live",
              "Limited-time launch promotions"
            ]
          },
          {
            name: "Post-launch",
            activities: [
              "Retention campaigns for early users",
              "Feature enhancements based on usage",
              "Begin affiliate program rollout",
              "Ramp up content marketing efforts"
            ]
          }
        ],
        scalingPlaybook: [
          {
            milestone: "First 1,000 Users",
            description: "Focus on high-touch support, collecting testimonials, and refining core features."
          },
          {
            milestone: "Strategic Partnerships",
            description: "Partner with complementary platforms to expand reach and add value through integrations."
          },
          {
            milestone: "Geographic Expansion",
            description: "Expand to international markets starting with English-speaking countries, then EU region."
          },
          {
            milestone: "Service Line Extension",
            description: "Add premium service tiers and complementary offerings based on user demand signals."
          }
        ]
      };
    
    case 'monetization-experiments':
      return {
        models: [
          {
            name: "Tiered Subscription Model",
            icon: "CreditCard",
            description: "Multiple subscription tiers with increasing features and capabilities to serve different customer segments.",
            revenue: "$10,000 - $15,000/mo",
            timeline: "1-2 months",
            metric: "Conversion Rate & Retention"
          },
          {
            name: "Freemium with Premium Features",
            icon: "BarChart4",
            description: "Free basic version with paid premium features that unlock advanced functionality.",
            revenue: "$5,000 - $8,000/mo",
            timeline: "2-3 months",
            metric: "Upgrade Rate"
          },
          {
            name: "Usage-Based Pricing",
            icon: "CircleDollarSign",
            description: "Customers pay based on their actual usage of the platform, allowing for scalable pricing.",
            revenue: "$8,000 - $12,000/mo",
            timeline: "3-4 months",
            metric: "Average Revenue Per User (ARPU)"
          },
          {
            name: "Partnership Revenue Share",
            icon: "Lightbulb",
            description: "Revenue sharing model with strategic partners who integrate or promote the product.",
            revenue: "$3,000 - $7,000/mo",
            timeline: "4-6 months",
            metric: "Partner Acquisition Cost"
          }
        ]
      };
    
    case 'risk-mitigation':
      return [
        {
          name: "Technical Failure",
          category: "Technology",
          severity: "High",
          description: `Risk of platform downtime, data loss, or security breaches impacting ${businessName}'s service reliability.`,
          warningSignals: [
            "Increasing error rates in monitoring systems",
            "User reports of performance issues",
            "Failed security audits or penetration tests"
          ],
          mitigation: "Implement redundant server architecture with automatic failover capabilities. Establish comprehensive backup systems with daily snapshots and real-time data mirroring. Maintain 24/7 technical support team with defined incident response protocols.",
          contingency: "If systems fail, trigger automatic rollback to last stable version. Communicate transparently with users about the issue and expected resolution timeline. Activate emergency support team to provide manual workarounds if necessary."
        },
        {
          name: "User Churn",
          category: "User",
          severity: "Medium",
          description: "Risk of users abandoning the platform due to declining engagement or competitor offerings.",
          warningSignals: [
            "10%+ decline in daily active users",
            "Decreasing session duration metrics",
            "Negative trend in retention cohorts"
          ],
          mitigation: "Implement robust analytics to identify at-risk users before they churn. Create automated re-engagement campaigns triggered by inactivity. Establish a continuous feedback loop with users to address pain points quickly.",
          contingency: "If retention drops below target thresholds, trigger win-back campaign offering incentives like free premium features or coaching sessions. Conduct exit surveys to identify systemic issues and address root causes. Accelerate planned feature releases that address common churn reasons."
        },
        {
          name: "Market Shifts",
          category: "Market",
          severity: "Medium",
          description: "Risk of emerging technologies or competitors disrupting the current business model.",
          warningSignals: [
            "New funding rounds for competing technologies",
            "Shifting user preferences in market research",
            "Regulatory changes favoring alternative approaches"
          ],
          mitigation: "Maintain dedicated team for competitive intelligence and emerging technology monitoring. Allocate 20% of development resources to experimental features and future-focused capabilities. Build flexibility into the platform architecture to allow rapid pivoting.",
          contingency: "If market shifts toward wearable technology dominance, pivot to API-first strategy focusing on integration capabilities. If new competitors gain traction with novel features, accelerate partnership strategy to maintain market position. Create acquisition strategy for complementary technologies that could fill emerging gaps."
        }
      ];
      
    default:
      return null;
  }
}
