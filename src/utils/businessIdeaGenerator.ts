
import { callOpenAI } from './openaiService';

export interface BusinessIdeaPreferences {
  industry?: string;
  interests?: string;
}

export interface BusinessIdeaSuggestion {
  businessName: string;
  description: string;
  targetMarket: string;
  revenueModel: string;
  whyItWorks: string[];
}

// Function to generate a business idea using OpenAI
export async function generateBusinessIdea(preferences: BusinessIdeaPreferences): Promise<BusinessIdeaSuggestion> {
  try {
    // Create prompt based on user preferences
    const prompt = createBusinessIdeaPrompt(preferences);
    
    console.log('Generating business idea with prompt:', prompt);
    
    // Call OpenAI API
    const response = await callOpenAI({
      prompt,
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 800
    });
    
    if (!response.success) {
      console.error('Error generating business idea:', response.error);
      throw new Error('Failed to generate business idea');
    }
    
    // Parse the response
    return parseBusinessIdeaResponse(response.text);
  } catch (error) {
    console.error('Error in generateBusinessIdea:', error);
    
    // Return mock data if in development or if there's an error
    if (import.meta.env.DEV) {
      console.log('Using mock business idea in development mode');
      return generateMockBusinessIdea(preferences);
    }
    
    throw error;
  }
}

// Create a prompt for the OpenAI API based on user preferences
function createBusinessIdeaPrompt(preferences: BusinessIdeaPreferences): string {
  const { industry, interests } = preferences;
  
  if (interests === 'surprise me' || (!industry && !interests)) {
    return `
      Generate an innovative business idea based on current market trends and opportunities.
      The business idea should be specific, practical, and have clear potential for profitability.
      Make it unique, creative, and different from common business ideas.
      
      Format your response as follows:
      Business Name: [catchy and relevant name]
      Description: [2-3 sentence description of the business concept]
      Target Market: [who this business would serve]
      Revenue Model: [how this business would make money]
      Why It Works: [4 bullet points highlighting market needs, timing, competitive advantages, or trends that make this idea viable]
      
      Make sure the business idea is modern, specific (not generic), and addresses a real market need.
    `;
  }
  
  return `
    Generate an innovative business idea in the ${industry || 'any'} industry.
    ${interests ? `The founder has interests/expertise in: ${interests}` : ''}
    Make it unique, creative, and different from common business ideas.
    
    Format your response as follows:
    Business Name: [catchy and relevant name]
    Description: [2-3 sentence description of the business concept]
    Target Market: [who this business would serve]
    Revenue Model: [how this business would make money]
    Why It Works: [4 bullet points highlighting market needs, timing, competitive advantages, or trends that make this idea viable]
    
    Make sure the business idea is modern, specific (not generic), and addresses a real market need.
    The idea should be practical for a startup or small business to implement.
  `;
}

// Parse the OpenAI response into a structured business idea
function parseBusinessIdeaResponse(text: string): BusinessIdeaSuggestion {
  try {
    // Extract business name
    const businessNameMatch = text.match(/Business Name:?\s*(.+?)(?:\n|$)/);
    const businessName = businessNameMatch ? businessNameMatch[1].trim() : "Innovative Startup";
    
    // Extract description
    const descriptionMatch = text.match(/Description:?\s*(.+?)(?:\n\n|\n[A-Za-z]+:)/s);
    const description = descriptionMatch ? descriptionMatch[1].trim() : "A modern business addressing market needs.";
    
    // Extract target market
    const targetMarketMatch = text.match(/Target Market:?\s*(.+?)(?:\n\n|\n[A-Za-z]+:)/s);
    const targetMarket = targetMarketMatch ? targetMarketMatch[1].trim() : "Consumers and businesses seeking innovative solutions.";
    
    // Extract revenue model
    const revenueModelMatch = text.match(/Revenue Model:?\s*(.+?)(?:\n\n|\n[A-Za-z]+:)/s);
    const revenueModel = revenueModelMatch ? revenueModelMatch[1].trim() : "Subscription-based service with premium features.";
    
    // Extract why it works
    const whyItWorksMatch = text.match(/Why It Works:?\s*(.+?)(?:\n\n|$)/s);
    let whyItWorks: string[] = [];
    
    if (whyItWorksMatch) {
      // Extract bullet points
      const bulletPoints = whyItWorksMatch[1].split(/\n\s*[-•*]\s*/).filter(Boolean);
      whyItWorks = bulletPoints.map(point => point.trim());
    }
    
    // Ensure we have at least one reason if parsing failed
    if (whyItWorks.length === 0) {
      whyItWorks = [
        "Addresses a growing market need",
        "Leverages current technology trends",
        "Has multiple revenue streams",
        "Low startup costs relative to potential returns"
      ];
    }
    
    return {
      businessName,
      description,
      targetMarket,
      revenueModel,
      whyItWorks
    };
  } catch (error) {
    console.error('Error parsing business idea response:', error);
    // Return a fallback structure
    return generateMockBusinessIdea({ industry: "technology" });
  }
}

// Generate mock business idea for development/testing
function generateMockBusinessIdea(preferences: BusinessIdeaPreferences): BusinessIdeaSuggestion {
  const { industry } = preferences;
  
  // Get a random idea based on industry or general ideas if no industry specified
  if (industry) {
    const industryIdeas = mockBusinessIdeasByIndustry[industry] || [];
    if (industryIdeas.length > 0) {
      // Get a random idea from the industry-specific list
      return industryIdeas[Math.floor(Math.random() * industryIdeas.length)];
    }
  }
  
  // Fall back to general ideas if no industry-specific idea is available
  return generalMockBusinessIdeas[Math.floor(Math.random() * generalMockBusinessIdeas.length)];
}

// Collection of mock business ideas by industry
const mockBusinessIdeasByIndustry: Record<string, BusinessIdeaSuggestion[]> = {
  'technology': [
    {
      businessName: "EcoTech Solutions",
      description: "A SaaS platform that helps small businesses track and reduce their carbon footprint. The solution provides analytics, recommendations, and certification options that companies can use for marketing.",
      targetMarket: "Small to medium-sized businesses concerned about environmental impact",
      revenueModel: "Freemium subscription model with tiered pricing based on business size and features",
      whyItWorks: [
        "Growing consumer demand for environmentally responsible businesses",
        "Regulatory trends moving toward mandatory environmental reporting",
        "Low competition in the SMB space for accessible carbon tracking",
        "Multiple revenue streams through partnerships with certification bodies"
      ]
    },
    {
      businessName: "NeuroCognitive Edge",
      description: "AI-powered cognitive training platform for professionals in high-stress, high-performance industries. Customized exercises and monitoring help maintain peak mental performance and prevent burnout.",
      targetMarket: "Financial traders, surgeons, air traffic controllers, and executives",
      revenueModel: "Enterprise licensing with per-user pricing and optional premium services",
      whyItWorks: [
        "Growing recognition of cognitive health as a competitive advantage",
        "Increasing workplace stress and performance demands",
        "Scientific advances in neuroplasticity and cognitive training",
        "High willingness to pay among target professionals and their employers"
      ]
    },
    {
      businessName: "Smart Shelf",
      description: "IoT-enabled inventory management system for small retailers. Uses weight sensors and computer vision to automatically track inventory levels and trigger reordering, reducing stockouts and manual counting.",
      targetMarket: "Independent retailers, boutiques, and specialty shops",
      revenueModel: "Hardware sales plus monthly subscription for the software platform",
      whyItWorks: [
        "Labor shortages making manual inventory processes unsustainable",
        "Shrinking margins requiring efficient inventory management",
        "Declining costs of IoT sensors and edge computing",
        "Growing familiarity with smart home technology among business owners"
      ]
    },
    {
      businessName: "DataPrivacyGuard",
      description: "A compliance-as-a-service platform that helps businesses meet data privacy regulations like GDPR and CCPA. Offers automated data mapping, policy generation, and user consent management.",
      targetMarket: "Mid-sized businesses with digital presence but limited legal resources",
      revenueModel: "Subscription service with tiers based on data volume and complexity",
      whyItWorks: [
        "Increasing complexity of global privacy regulations",
        "High costs of non-compliance and data breaches",
        "Limited availability of privacy expertise outside large enterprises",
        "Growing consumer awareness around data privacy issues"
      ]
    }
  ],
  'healthcare': [
    {
      businessName: "MindfulHealth",
      description: "A mental wellness platform combining AI-driven therapy tools with on-demand professional coaching. Users receive personalized mental health exercises and can schedule video sessions with certified counselors.",
      targetMarket: "Working professionals aged 25-45 experiencing stress and mild anxiety",
      revenueModel: "Monthly subscription plus pay-per-session coaching fees",
      whyItWorks: [
        "Increasing awareness and destigmatization of mental health issues",
        "High cost and limited availability of traditional therapy",
        "Growing preference for digital health solutions post-pandemic",
        "Scalable AI component with human touch for quality assurance"
      ]
    },
    {
      businessName: "ChronicCare Companion",
      description: "A multi-device platform that streamlines care management for people with chronic conditions. Integrates with medical devices, medication dispensers, and care providers for seamless monitoring and intervention.",
      targetMarket: "Seniors with chronic conditions and their caregivers",
      revenueModel: "Insurance reimbursement plus direct consumer hardware and subscription sales",
      whyItWorks: [
        "Aging population with increasing chronic disease prevalence",
        "Push for reducing hospital readmissions through better home care",
        "Growing acceptance of telehealth and remote monitoring",
        "Caregiver burden creating demand for supportive technology"
      ]
    },
    {
      businessName: "MediSupply Express",
      description: "A digital marketplace connecting healthcare facilities with local medical supply distributors. Offers real-time inventory visibility, competitive pricing, and emergency same-day delivery options.",
      targetMarket: "Small to mid-sized clinics, surgery centers, and nursing homes",
      revenueModel: "Commission on transactions plus premium features for distributors",
      whyItWorks: [
        "Supply chain vulnerabilities exposed by recent healthcare crises",
        "Fragmentation in the medical supply distribution market",
        "Need for cost control in independent healthcare facilities",
        "Growing demand for supply chain resilience and local sourcing"
      ]
    },
    {
      businessName: "PrecisionRehab",
      description: "An augmented reality platform for physical rehabilitation that gamifies exercises and provides real-time feedback. Connected sensors track movements to ensure proper form and progress tracking.",
      targetMarket: "Outpatient rehabilitation clinics and patients recovering from surgery or injury",
      revenueModel: "Clinical software subscriptions plus direct-to-consumer premium app",
      whyItWorks: [
        "Increasing physical therapy costs driving demand for home-based solutions",
        "Poor adherence to traditional rehabilitation exercises",
        "Advances in motion tracking and AR technology",
        "Shift toward value-based care rewarding better outcomes"
      ]
    }
  ],
  'education': [
    {
      businessName: "SkillSprint",
      description: "Micro-certification platform offering 2-week intensive courses taught by industry professionals. Each sprint combines online learning with live project work and ends with a verified skill credential.",
      targetMarket: "Young professionals seeking fast career advancement and industry-specific skills",
      revenueModel: "Course fees plus employer recruitment access",
      whyItWorks: [
        "Skills gap creating demand for practical, job-focused training",
        "Dissatisfaction with traditional degree ROI and timeframes",
        "Employer difficulty assessing candidate skills in hiring",
        "Growing acceptance of alternative credentials in hiring"
      ]
    },
    {
      businessName: "ClassroomConnect",
      description: "A platform connecting K-12 classrooms with virtual field trips and expert guest speakers. Provides curriculum integration, pre/post activities, and live interactive sessions with professionals and locations worldwide.",
      targetMarket: "Public and private schools seeking to enrich curriculum with real-world connections",
      revenueModel: "School subscription packages with tiered access levels",
      whyItWorks: [
        "Reduced school budgets for physical field trips",
        "Increased emphasis on career exposure and real-world learning",
        "Improvements in video streaming technology and classroom connectivity",
        "Growing pool of professionals willing to volunteer virtual time"
      ]
    },
    {
      businessName: "LinguaMatch",
      description: "AI-powered language exchange platform matching learners based on complementary proficiency levels, schedules, and conversation interests. Features structured activities and progress tracking.",
      targetMarket: "Language learners seeking conversation practice with native speakers",
      revenueModel: "Freemium model with subscription for advanced features and professional tutoring",
      whyItWorks: [
        "Globalization creating demand for practical language skills",
        "Limitations of classroom learning for conversation fluency",
        "Advancements in AI for language proficiency assessment",
        "Growing interest in cultural exchange and global connections"
      ]
    },
    {
      businessName: "ParentEd",
      description: "Evidence-based platform offering bite-sized courses on child development and parenting strategies. Personalized recommendations based on child's age and developmental needs.",
      targetMarket: "First-time parents and parents of children with specific developmental challenges",
      revenueModel: "Subscription service with optional coaching add-ons",
      whyItWorks: [
        "Declining access to extended family parenting knowledge",
        "Growing awareness of early childhood development importance",
        "Parental anxiety about making 'right' choices",
        "Time constraints making traditional parenting classes impractical"
      ]
    }
  ],
  'finance': [
    {
      businessName: "MicroInvest",
      description: "Platform enabling everyday consumers to invest in local businesses through revenue-sharing agreements. Businesses get capital without giving up equity, while investors earn returns from businesses they know and support.",
      targetMarket: "Community-minded investors and established local businesses needing growth capital",
      revenueModel: "Transaction fees on investments plus success fees",
      whyItWorks: [
        "Growing interest in local and impact investing",
        "Limited capital access for Main Street businesses",
        "Regulatory changes expanding investment crowdfunding",
        "Technology enabling efficient fractional investment tracking"
      ]
    },
    {
      businessName: "InsurTech Navigator",
      description: "AI-driven platform that analyzes customer data across providers to identify coverage gaps and optimization opportunities. Provides clear recommendations and facilitates easy switching or supplementing policies.",
      targetMarket: "Middle-income households with multiple insurance needs",
      revenueModel: "Referral fees from insurance providers plus premium subscription",
      whyItWorks: [
        "Complex insurance landscape with difficult-to-compare offerings",
        "Significant coverage gaps in typical household policies",
        "Consumer confusion about appropriate coverage levels",
        "Open banking and data regulations enabling cross-provider analysis"
      ]
    },
    {
      businessName: "Freelancer Finance",
      description: "All-in-one financial platform for self-employed professionals that combines invoicing, expense tracking, tax estimation, and retirement planning. Integrates with marketplace platforms where freelancers find work.",
      targetMarket: "Freelancers, gig workers, and independent contractors",
      revenueModel: "Monthly subscription with premium services for high-earners",
      whyItWorks: [
        "Rapid growth in the freelance and gig economy workforce",
        "Complexity of self-employment finances and taxes",
        "Limited financial products designed for inconsistent incomes",
        "High financial stress among freelancers creating willingness to pay"
      ]
    },
    {
      businessName: "Debt Freedom Path",
      description: "App that gamifies debt reduction using behavioral psychology principles. Creates personalized debt elimination strategies, celebrates milestones, and provides community support and accountability.",
      targetMarket: "Millennials and Gen Z with student loans and credit card debt",
      revenueModel: "Freemium model with paid coaching and financial product referrals",
      whyItWorks: [
        "Record levels of consumer debt, especially among younger generations",
        "Emotional barriers to addressing debt problems",
        "Success of gamification in other challenging behavior change areas",
        "Growing financial literacy movement creating awareness"
      ]
    }
  ],
  'ecommerce': [
    {
      businessName: "SecondChance Marketplace",
      description: "Platform for retailers to sell returned items and excess inventory directly to consumers. Includes detailed condition reports, warranty options, and logistics handling for frictionless transactions.",
      targetMarket: "Value-conscious consumers and retailers with excess inventory",
      revenueModel: "Commission on sales plus premium services for retailers",
      whyItWorks: [
        "Rising return rates in e-commerce creating massive reverse logistics challenges",
        "Growing consumer comfort with refurbished and open-box items",
        "Sustainability concerns driving interest in reducing waste",
        "Margin pressure on retailers making returns recovery crucial"
      ]
    },
    {
      businessName: "LocalLuxe",
      description: "Curated marketplace connecting travelers with independent luxury boutiques for pre-trip shopping. Purchases are delivered to the hotel upon arrival, offering convenience and discovery of local fashion and design.",
      targetMarket: "Affluent travelers seeking unique products and experiences",
      revenueModel: "Commission from participating boutiques plus concierge service fees",
      whyItWorks: [
        "Experiential luxury trend valuing curation and storytelling",
        "Challenges faced by independent luxury retailers in digital discovery",
        "Travel's strong connection to shopping behavior",
        "High willingness to pay for convenience and uniqueness"
      ]
    },
    {
      businessName: "SubscriptionSavvy",
      description: "Platform helping consumers manage all their subscriptions in one place. Identifies unused services, negotiates better rates, handles cancellations, and suggests alternatives based on usage patterns.",
      targetMarket: "Digital consumers with multiple subscription services",
      revenueModel: "Percentage of savings plus referral fees for new subscriptions",
      whyItWorks: [
        "Explosion in subscription offerings creating 'subscription fatigue'",
        "Significant wasted spending on unused or forgotten subscriptions",
        "Difficult cancellation processes creating consumer frustration",
        "Growing expense management awareness among digital natives"
      ]
    },
    {
      businessName: "EcoPackPro",
      description: "Sustainable packaging-as-a-service for e-commerce brands. Provides customizable, compostable packaging solutions with closed-loop recovery system and consumer engagement tools highlighting environmental impact.",
      targetMarket: "Environmentally conscious D2C brands and their customers",
      revenueModel: "Packaging materials sales plus subscription for recovery system",
      whyItWorks: [
        "Consumer pressure on brands to reduce packaging waste",
        "Regulatory trends toward extended producer responsibility",
        "Brand differentiation potential through sustainable packaging",
        "Advancements in compostable materials reducing cost premium"
      ]
    }
  ],
  'food': [
    {
      businessName: "LocalFlavor",
      description: "A marketplace connecting home chefs with local customers looking for authentic, homemade meals. The platform handles ordering, delivery logistics, and payments while ensuring food safety compliance.",
      targetMarket: "Urban professionals and families seeking convenient, authentic home-cooked meals",
      revenueModel: "Commission on each transaction plus optional premium listing fees for chefs",
      whyItWorks: [
        "Growing interest in authentic, diverse cuisine and supporting local entrepreneurs",
        "Work-from-home trends creating demand for convenient meal options",
        "Untapped talent pool of skilled home cooks seeking flexible income",
        "Technology enablement of logistics makes this model newly viable"
      ]
    },
    {
      businessName: "AgriConnect",
      description: "Platform connecting small-scale farmers directly with restaurants and food service providers. Offers inventory management, logistics coordination, and quality assurance to make farm-to-table sourcing accessible.",
      targetMarket: "Independent restaurants and specialty food producers seeking local ingredients",
      revenueModel: "Subscription for restaurants plus transaction fees on orders",
      whyItWorks: [
        "Growing consumer demand for locally sourced ingredients",
        "Supply chain disruptions highlighting need for shorter food chains",
        "Small farmers seeking better margins than wholesale distribution offers",
        "Restaurant differentiation through unique local sourcing stories"
      ]
    },
    {
      businessName: "NutriKit",
      description: "Personalized meal kit service based on individual nutritional needs and health goals. Uses biomarker testing, AI meal planning, and precise portioning to deliver optimized ingredients and recipes.",
      targetMarket: "Health-conscious consumers with specific dietary requirements or goals",
      revenueModel: "Weekly subscription with tiered pricing based on personalization level",
      whyItWorks: [
        "Growing interest in personalized nutrition and functional foods",
        "Challenges of dietary adherence and meal planning",
        "Advancements in nutritional science and testing accessibility",
        "Willingness to pay premium for health optimization"
      ]
    },
    {
      businessName: "FoodWaste Alchemist",
      description: "Service transforming restaurant food waste into high-value byproducts like specialty vinegars, animal feed, and compost. Provides collection logistics, processing, and marketing of resulting products.",
      targetMarket: "Restaurants and food manufacturers concerned about sustainability",
      revenueModel: "Service fees for waste collection plus revenue sharing from byproducts",
      whyItWorks: [
        "Increasing disposal costs and regulations around food waste",
        "Consumer demand for sustainable business practices",
        "Innovative processing techniques enabling new value creation",
        "Multiple revenue streams from diverse byproducts"
      ]
    }
  ],
  'sustainability': [
    {
      businessName: "CircularCloset",
      description: "Rental subscription service for premium children's clothing that grows with the child. When items no longer fit, they're returned, professionally reconditioned, and circulated to the next size group.",
      targetMarket: "Environmentally conscious parents of rapidly growing children",
      revenueModel: "Monthly subscription plus optional purchase options for favorite items",
      whyItWorks: [
        "Fast growth of children making traditional ownership inefficient",
        "Increasing consumer awareness of fashion's environmental impact",
        "Premium children's clothing often lightly worn before outgrown",
        "Growing comfort with the sharing economy and subscription models"
      ]
    },
    {
      businessName: "RenovateRight",
      description: "Platform connecting homeowners with energy-efficient renovation experts and financing options. Provides energy audits, contractor vetting, and access to rebates and special green financing.",
      targetMarket: "Homeowners interested in reducing energy costs and environmental impact",
      revenueModel: "Contractor referral fees and financing origination fees",
      whyItWorks: [
        "Rising energy costs creating financial incentives for efficiency",
        "Growing climate awareness driving interest in home improvements",
        "Complex landscape of incentives and options creating consumer confusion",
        "Aging housing stock requiring significant energy retrofits"
      ]
    },
    {
      businessName: "OffsetPartners",
      description: "Platform connecting small businesses with high-quality local carbon offset and environmental restoration projects. Offers marketing tools to showcase environmental commitments to customers.",
      targetMarket: "Small to medium businesses wanting to demonstrate environmental responsibility",
      revenueModel: "Subscription fees based on business size plus percentage of offset purchases",
      whyItWorks: [
        "Growing consumer preference for environmentally responsible businesses",
        "Carbon markets typically inaccessible to smaller businesses",
        "Local offset projects creating compelling storytelling opportunities",
        "Businesses seeking competitive differentiation through sustainability"
      ]
    },
    {
      businessName: "WaterWise",
      description: "Smart water management system for homes combining leak detection, usage monitoring, and automated conservation. Integrates with existing plumbing and provides actionable insights through a mobile app.",
      targetMarket: "Environmentally conscious homeowners in water-stressed regions",
      revenueModel: "Hardware sales plus subscription for premium features",
      whyItWorks: [
        "Increasing water costs and restrictions in many regions",
        "Hidden household leaks wasting up to 10% of home water use",
        "Advancements in affordable IoT sensors and data analytics",
        "Growing awareness of water scarcity and conservation needs"
      ]
    }
  ],
  'entertainment': [
    {
      businessName: "HyperLocal",
      description: "Platform for discovering and booking ultra-local entertainment experiences led by neighborhood talent. Features everything from backyard concerts to garage art galleries and home-based cooking classes.",
      targetMarket: "Experience-seeking consumers and local creators with underutilized talents",
      revenueModel: "Booking commissions plus optional promotion packages for hosts",
      whyItWorks: [
        "Growing preference for authentic, unique experiences over material consumption",
        "Untapped creator talent outside traditional venues",
        "Desire for community connection in increasingly anonymous urban areas",
        "Technology enabling trust mechanisms for in-home experiences"
      ]
    },
    {
      businessName: "NostalgiaStream",
      description: "Content platform specializing in restored and remastered vintage media from the 1950s-1990s. Offers films, TV shows, commercials, and educational content that has fallen into public domain or through special licensing.",
      targetMarket: "Generation X and Baby Boomers seeking nostalgic entertainment",
      revenueModel: "Monthly subscription with tiered access to different eras and content types",
      whyItWorks: [
        "Aging demographics with disposable income and digital adoption",
        "Strong emotional connection to media from formative years",
        "Vast archives of under-monetized vintage content",
        "Technical advances in restoration and digital conversion"
      ]
    },
    {
      businessName: "PopUpPlay",
      description: "Service creating temporary entertainment spaces in vacant retail locations. Transforms empty storefronts into escape rooms, immersive art experiences, and themed pop-up attractions using modular design systems.",
      targetMarket: "Mall operators, property owners with vacant space, and entertainment seekers",
      revenueModel: "Revenue sharing with property owners plus ticket sales",
      whyItWorks: [
        "High retail vacancy rates creating available space",
        "Property owners seeking temporary activation solutions",
        "Consumer desire for novel, shareable entertainment experiences",
        "Flexible design technology enabling rapid deployment and customization"
      ]
    },
    {
      businessName: "CreatorCraft",
      description: "Specialized platform connecting brands with niche content creators in underserved categories like crafting, gardening, and DIY home improvement. Provides collaboration tools, licensing management, and audience analytics.",
      targetMarket: "Hobby-focused brands and specialized content creators",
      revenueModel: "Percentage of brand-creator deals plus subscription fees for creators",
      whyItWorks: [
        "Brand shift toward authentic micro-influencers over celebrities",
        "Underserved vertical niches with passionate communities",
        "Complex logistics of managing multiple creator relationships",
        "Growing creator economy seeking diversified income streams"
      ]
    }
  ]
};

// General business ideas to use as fallbacks
const generalMockBusinessIdeas: BusinessIdeaSuggestion[] = [
  {
    businessName: "Urban Micro-Farming Network",
    description: "Platform connecting urban buildings (offices, apartments) with local micro-farmers to install and maintain edible gardens in unused spaces. Produce is shared between building owners, residents, and subscription customers.",
    targetMarket: "Urban property owners and local food enthusiasts in cities",
    revenueModel: "Setup fees, maintenance subscriptions, and marketplace commissions on excess produce sales",
    whyItWorks: [
      "Growing interest in ultra-local food production and food security",
      "Unutilized urban spaces like rooftops and setbacks offering growing potential",
      "Increasing property values associated with green amenities",
      "Consumer willingness to pay premium for hyper-local, fresh produce"
    ]
  },
  {
    businessName: "Heritage DNA Experience",
    description: "Service combining DNA ancestry testing with personalized heritage experiences. Offers virtual and in-person cultural immersion, customized recipe boxes, language classes, and storytelling focused on customer's genetic background.",
    targetMarket: "Identity-seeking consumers interested in cultural connection and personal heritage",
    revenueModel: "Premium testing package plus subscription for ongoing cultural experiences",
    whyItWorks: [
      "Growing interest in personal heritage and identity exploration",
      "Advancement in DNA testing creating baseline consumer interest",
      "Desire for meaningful experiences over material possessions",
      "Strong gift potential for family members seeking connection"
    ]
  },
  {
    businessName: "Solo Dining Social",
    description: "App-based service connecting solo diners who want company while eating out. Matches diners based on cuisine preferences, conversation interests, and dining schedules with participating restaurant partners.",
    targetMarket: "Urban professionals, travelers, and anyone who enjoys dining out but lacks company",
    revenueModel: "Freemium subscription model plus partnership fees from restaurants",
    whyItWorks: [
      "Growing single-person households in urban areas",
      "Social stigma around dining alone limiting restaurant visits",
      "Restaurant interest in attracting additional weeknight business",
      "Technology enabling trust-based connections among strangers"
    ]
  },
  {
    businessName: "Sensory Wellness Pods",
    description: "Network of private micro-spaces in high-stress environments (airports, shopping centers, hospitals) offering short-term sensory relaxation experiences. Customizable lighting, sound, aromatherapy and haptic elements relieve stress and restore focus.",
    targetMarket: "Travelers, caregivers, and professionals experiencing sensory overload or stress",
    revenueModel: "Pay-per-use with membership options for frequent users",
    whyItWorks: [
      "Increasing awareness of sensory issues and overstimulation",
      "Highly stimulating public spaces causing stress and anxiety",
      "Research supporting multi-sensory approaches to relaxation",
      "Space-efficient design allowing placement in high-value locations"
    ]
  },
  {
    businessName: "CommunityPlot",
    description: "Platform reimagining community gardens with smart technology, reservation systems, and education. Members receive a personal garden plot with soil sensors, automated watering, and mobile monitoring alongside in-person and virtual gardening guidance.",
    targetMarket: "Urban dwellers interested in gardening without yards of their own",
    revenueModel: "Monthly membership fees plus optional equipment and supplies",
    whyItWorks: [
      "Desire for connection with nature and food sources in urban areas",
      "Apartment living limiting traditional gardening opportunities",
      "Technology making gardening more accessible to beginners",
      "Community aspect addressing social isolation trends"
    ]
  },
  {
    businessName: "SkilledSeniors",
    description: "Platform connecting retired professionals with businesses for project-based consulting work. Focuses on specialized industries where expertise accumulates with age and facilitates knowledge transfer between generations.",
    targetMarket: "Companies needing specialized expertise and semi-retired professionals seeking meaningful work",
    revenueModel: "Commission on project fees plus optional knowledge capture services",
    whyItWorks: [
      "Aging workforce with valuable expertise leaving traditional employment",
      "Businesses losing institutional knowledge through retirements",
      "Many seniors desiring partial work engagement without full-time commitments",
      "Critical skill shortages in specialized technical and industrial niches"
    ]
  },
  {
    businessName: "HeirloomRestore",
    description: "Service combining professional restoration of family heirlooms with digital storytelling. Experts repair and preserve physical items while capturing family stories and provenance in engaging multimedia formats for future generations.",
    targetMarket: "Families with sentimental items in need of restoration and context preservation",
    revenueModel: "Restoration services plus digital archiving and storytelling packages",
    whyItWorks: [
      "Aging population concerned about legacy and story preservation",
      "Declining repair skills making restoration services valuable",
      "Technology enabling compelling multimedia storytelling",
      "Strong emotional connection to family heirlooms and histories"
    ]
  }
];

