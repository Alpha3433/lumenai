
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, AlertCircle } from 'lucide-react';

interface CustomerPersonasSectionProps {
  businessName: string;
  businessDescription: string;
}

const CustomerPersonasSection: React.FC<CustomerPersonasSectionProps> = ({ 
  businessName,
  businessDescription
}) => {
  // Generate personas based on business description
  const personas = generatePersonas(businessName, businessDescription);

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Customer Persona Deep-Dive
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Understanding your target audience
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((persona, index) => (
          <Card key={index} className="overflow-hidden border border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {persona.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{persona.name}, {persona.age}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{persona.occupation}</p>
                  
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Calendar className="h-4 w-4 text-amber-500" />
                      <span>Day-in-the-Life</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{persona.dayInLife}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <AlertCircle className="h-4 w-4 text-rose-500" />
                      <span>Pain Point Mapping</span>
                    </div>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300">
                      {persona.painPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

// Helper function to generate personas based on business info
function generatePersonas(businessName: string, businessDescription: string) {
  // Extract industry/domain from business description
  const description = businessDescription.toLowerCase();
  let industry = "general";
  
  if (description.includes('health') || description.includes('fitness') || description.includes('wellness')) {
    industry = "health";
  } else if (description.includes('finance') || description.includes('banking') || description.includes('invest')) {
    industry = "finance";
  } else if (description.includes('education') || description.includes('learning') || description.includes('teach')) {
    industry = "education";
  } else if (description.includes('ecommerce') || description.includes('shop') || description.includes('retail')) {
    industry = "ecommerce";
  } else if (description.includes('food') || description.includes('restaurant') || description.includes('delivery')) {
    industry = "food";
  } else if (description.includes('tech') || description.includes('software') || description.includes('app')) {
    industry = "tech";
  }
  
  // Generate personas based on identified industry
  const industryPersonas = {
    "health": [
      {
        emoji: "👩‍💼",
        name: "Sarah",
        age: "35",
        occupation: "Marketing Director",
        dayInLife: `Sarah checks ${businessName} between meetings to track her health goals. She values efficiency and how the app helps her maintain work-life balance.`,
        painPoints: [
          "Struggling to find time for health between work commitments",
          `${businessName}'s quick check-ins fit her busy executive schedule`,
          "Needs data-driven insights without information overload"
        ]
      },
      {
        emoji: "👨‍💻",
        name: "Michael",
        age: "28",
        occupation: "Software Developer",
        dayInLife: `Michael uses ${businessName} during his morning routine. He appreciates the technical features and analytics that help him optimize his health.`,
        painPoints: [
          "Concerned about accuracy of health tracking data",
          `${businessName}'s evidence-based approach appeals to his analytical mindset`,
          "Values privacy and security of health information"
        ]
      },
      {
        emoji: "👵",
        name: "Barbara",
        age: "64",
        occupation: "Retired Teacher",
        dayInLife: `Barbara uses ${businessName} after breakfast to manage her health conditions. The clear interface helps her stay consistent with her medications and activities.`,
        painPoints: [
          "Needs health technology that doesn't have a steep learning curve",
          `${businessName}'s accessibility features accommodate her vision limitations`,
          "Seeks health management tools that connect her with support communities"
        ]
      },
      {
        emoji: "👨‍⚕️",
        name: "Dr. James",
        age: "45",
        occupation: "Healthcare Provider",
        dayInLife: `Dr. James recommends ${businessName} to patients and reviews their data during consultations. He values the professional reporting features.`,
        painPoints: [
          "Needs tools that provide clinical-grade health insights",
          `${businessName}'s integration capabilities save time on patient data entry`,
          "Requires secure data sharing between patients and healthcare teams"
        ]
      }
    ],
    "finance": [
      {
        emoji: "👩‍💼",
        name: "Jennifer",
        age: "42",
        occupation: "Business Owner",
        dayInLife: `Jennifer reviews ${businessName} each morning to check her business finances. She appreciates the comprehensive overview and planning tools.`,
        painPoints: [
          "Struggles to manage business and personal finances efficiently",
          `${businessName}'s dashboard gives her clarity on cash flow at a glance`,
          "Needs reliable forecasting tools for business planning"
        ]
      },
      {
        emoji: "👨‍🎓",
        name: "Alex",
        age: "26",
        occupation: "Recent Graduate",
        dayInLife: `Alex checks ${businessName} weekly to track his student loan payments and budget. He values the debt reduction strategies and savings tips.`,
        painPoints: [
          "Managing student debt while building savings feels overwhelming",
          `${businessName}'s milestone tracking keeps him motivated`,
          "Needs clear explanations of complex financial concepts"
        ]
      },
      {
        emoji: "👫",
        name: "Mark & Lisa",
        age: "34",
        occupation: "Married Professionals",
        dayInLife: `They use ${businessName} for joint financial planning and to coordinate their investment strategies. The shared dashboard helps them make decisions together.`,
        painPoints: [
          "Coordinating financial decisions between two busy schedules",
          `${businessName}'s shared access features help them stay aligned`,
          "Need tools to plan for major life events like home buying"
        ]
      },
      {
        emoji: "🧓",
        name: "Robert",
        age: "58",
        occupation: "Pre-Retiree",
        dayInLife: `Robert uses ${businessName} to track his retirement portfolio and adjust his investment strategy. He values the retirement readiness tools.`,
        painPoints: [
          "Anxiety about having enough saved for retirement",
          `${businessName}'s projection tools help visualize retirement scenarios`,
          "Needs to understand tax implications of withdrawal strategies"
        ]
      }
    ],
    "education": [
      {
        emoji: "👩‍🏫",
        name: "Maria",
        age: "38",
        occupation: "High School Teacher",
        dayInLife: `Maria uses ${businessName} to prepare lesson materials and track student progress. She appreciates the organization tools and assessment features.`,
        painPoints: [
          "Limited time to create engaging, personalized lessons",
          `${businessName}'s template library saves her hours of preparation`,
          "Needs data insights to identify struggling students early"
        ]
      },
      {
        emoji: "👨‍🎓",
        name: "Jason",
        age: "19",
        occupation: "College Student",
        dayInLife: `Jason accesses ${businessName} between classes to review materials and complete assignments. The mobile optimization helps him learn on the go.`,
        painPoints: [
          "Balancing work, social life, and academic requirements",
          `${businessName}'s scheduling features help manage competing priorities`,
          "Needs study tools that adapt to his learning style"
        ]
      },
      {
        emoji: "👩‍💼",
        name: "Sophia",
        age: "31",
        occupation: "Professional Development",
        dayInLife: `Sophia uses ${businessName} in the evenings to upskill for career advancement. She values the certificate programs and skill assessments.`,
        painPoints: [
          "Finding time for learning while working full-time",
          `${businessName}'s bite-sized content fits into her schedule`,
          "Needs credentials that employers will recognize"
        ]
      },
      {
        emoji: "👨‍👩‍👧",
        name: "David",
        age: "44",
        occupation: "Parent",
        dayInLife: `David monitors his daughter's learning journey on ${businessName} and helps with challenging concepts. He appreciates the parental oversight features.`,
        painPoints: [
          "Staying involved in his child's education despite limited knowledge of current curriculum",
          `${businessName}'s parent resources help him provide meaningful support`,
          "Needs visibility into progress without micromanaging"
        ]
      }
    ],
    "ecommerce": [
      {
        emoji: "👩‍💼",
        name: "Rebecca",
        age: "32",
        occupation: "Corporate Professional",
        dayInLife: `Rebecca browses ${businessName} during her commute and lunch breaks. She values the personalized recommendations and efficient checkout process.`,
        painPoints: [
          "Limited time for shopping in physical stores",
          `${businessName}'s saved preferences make reordering simple`,
          "Needs reliable delivery windows that accommodate her schedule"
        ]
      },
      {
        emoji: "👨‍👩‍👧",
        name: "Thomas",
        age: "38",
        occupation: "Parent Shopper",
        dayInLife: `Thomas uses ${businessName} to handle household shopping and compare prices. He appreciates the budget tracking and family-friendly filters.`,
        painPoints: [
          "Managing household budget across multiple categories",
          `${businessName}'s price comparison tools help maximize savings`,
          "Needs to ensure products are safe and appropriate for children"
        ]
      },
      {
        emoji: "👵",
        name: "Margaret",
        age: "67",
        occupation: "Retiree",
        dayInLife: `Margaret uses ${businessName} to order essentials and gifts for grandchildren. The simplified interface helps her shop with confidence.`,
        painPoints: [
          "Concerns about online payment security",
          `${businessName}'s straightforward design reduces confusion`,
          "Needs clear product information and easy returns process"
        ]
      },
      {
        emoji: "👨‍💻",
        name: "Kevin",
        age: "25",
        occupation: "Tech Enthusiast",
        dayInLife: `Kevin regularly checks ${businessName} for new products and deals. He values detailed specifications and authentic user reviews.`,
        painPoints: [
          "Wants to research thoroughly before purchasing",
          `${businessName}'s comparison features help make informed decisions`,
          "Needs to verify product authenticity and performance claims"
        ]
      }
    ],
    "food": [
      {
        emoji: "👩‍💻",
        name: "Emma",
        age: "29",
        occupation: "Remote Worker",
        dayInLife: `Emma orders lunch through ${businessName} while working from home. She values the variety of options and reliable delivery estimates.`,
        painPoints: [
          "Limited time for meal preparation during workday",
          `${businessName}'s saved favorites make ordering quick and simple`,
          "Needs accurate delivery tracking to plan work breaks"
        ]
      },
      {
        emoji: "👨‍👩‍👦",
        name: "Daniel",
        age: "37",
        occupation: "Busy Parent",
        dayInLife: `Daniel uses ${businessName} to order family meals on busy weeknights. He appreciates the family bundle options and dietary preference settings.`,
        painPoints: [
          "Coordinating meals that satisfy different family preferences",
          `${businessName}'s customization options accommodate everyone's needs`,
          "Needs portion sizes appropriate for adults and children"
        ]
      },
      {
        emoji: "👨‍🍳",
        name: "Chef Andre",
        age: "41",
        occupation: "Restaurant Owner",
        dayInLife: `Andre manages his restaurant's presence on ${businessName}, adjusting menus and monitoring orders. He values the business analytics tools.`,
        painPoints: [
          "Balancing in-house dining with delivery service quality",
          `${businessName}'s kitchen optimization helps manage multiple order streams`,
          "Needs fair commission structure to maintain profitability"
        ]
      },
      {
        emoji: "👱‍♀️",
        name: "Olivia",
        age: "24",
        occupation: "Fitness Enthusiast",
        dayInLife: `Olivia uses ${businessName} to find meals that align with her nutrition goals. She appreciates the detailed nutritional information and health-focused filters.`,
        painPoints: [
          "Finding convenient food options that support fitness goals",
          `${businessName}'s nutrition tracking integrates with her fitness apps`,
          "Needs transparency about ingredients and preparation methods"
        ]
      }
    ],
    "tech": [
      {
        emoji: "👨‍💼",
        name: "Ethan",
        age: "41",
        occupation: "IT Director",
        dayInLife: `Ethan evaluates ${businessName} for enterprise deployment. He focuses on security features, scalability, and integration capabilities.`,
        painPoints: [
          "Needs solutions that meet strict corporate security requirements",
          `${businessName}'s compliance documentation streamlines approval process`,
          "Requires robust admin controls and user management"
        ]
      },
      {
        emoji: "👩‍💻",
        name: "Priya",
        age: "27",
        occupation: "Developer",
        dayInLife: `Priya uses ${businessName} APIs in her projects. She values the comprehensive documentation and developer support resources.`,
        painPoints: [
          "Finding well-documented APIs that are reliable and performant",
          `${businessName}'s developer portal provides clear implementation examples`,
          "Needs responsive technical support for integration challenges"
        ]
      },
      {
        emoji: "👨‍🏫",
        name: "Marcus",
        age: "34",
        occupation: "Digital Entrepreneur",
        dayInLife: `Marcus leverages ${businessName} to streamline his online business operations. He appreciates the automation features and analytics dashboards.`,
        painPoints: [
          "Managing multiple digital products and services efficiently",
          `${businessName}'s unified platform reduces tool switching`,
          "Needs scalable infrastructure that grows with his business"
        ]
      },
      {
        emoji: "👵",
        name: "Eleanor",
        age: "59",
        occupation: "Small Business Owner",
        dayInLife: `Eleanor recently adopted ${businessName} to modernize her traditional business. She values the intuitive interface and accessible support options.`,
        painPoints: [
          "Transitioning from legacy systems without disrupting operations",
          `${businessName}'s guided setup process provides step-by-step assistance`,
          "Needs solutions that don't require extensive technical knowledge"
        ]
      }
    ],
    "general": [
      {
        emoji: "👩‍💼",
        name: "Sarah",
        age: "35",
        occupation: "Marketing Manager",
        dayInLife: `Sarah checks ${businessName} during her lunch break to track her progress. She values the convenience and how it fits into her busy schedule between meetings.`,
        painPoints: [
          `Decision fatigue solved by ${businessName}'s personalized recommendations`,
          "Needs flexibility with her unpredictable work schedule",
          "Wants data-driven insights without feeling overwhelmed"
        ]
      },
      {
        emoji: "👨‍💻",
        name: "Michael",
        age: "28",
        occupation: "Software Developer",
        dayInLife: `Michael uses ${businessName} first thing in the morning to plan his day. He appreciates the technical aspects and enjoys analyzing the metrics.`,
        painPoints: [
          "Struggles with maintaining consistency in routines",
          `${businessName}'s reminder system helps him stay accountable`,
          "Values privacy and data security with health information"
        ]
      },
      {
        emoji: "👵",
        name: "Barbara",
        age: "62",
        occupation: "Retired Teacher",
        dayInLife: `Barbara uses ${businessName} in the evenings to track her daily activities and plan for tomorrow. She appreciates the easy-to-use interface.`,
        painPoints: [
          "Needs simple, accessible technology without a steep learning curve",
          `${businessName}'s clear visuals help with her declining vision`,
          "Looks for supportive community features to stay motivated"
        ]
      },
      {
        emoji: "👨‍⚕️",
        name: "Dr. James",
        age: "45",
        occupation: "Healthcare Provider",
        dayInLife: `Dr. James recommends ${businessName} to patients and checks in on their progress during appointments. He values the professional reporting features.`,
        painPoints: [
          "Needs scientific, evidence-based solutions for patients",
          `${businessName}'s integration capabilities save time on data entry`,
          "Values secure data sharing between patients and providers"
        ]
      }
    ]
  };
  
  return industryPersonas[industry];
}

export default CustomerPersonasSection;
