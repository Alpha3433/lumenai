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
    },
    {
      businessName: "QuantumVerse Solutions",
      description: "A platform that uses quantum computing algorithms to solve complex optimization problems for businesses. Offers cloud-based quantum computing resources that can tackle problems traditional computers find intractable.",
      targetMarket: "Research institutions, logistics companies, financial services firms",
      revenueModel: "Subscription-based access to quantum computing resources with usage-based pricing tiers",
      whyItWorks: [
        "Quantum computing is reaching commercial viability for specific use cases",
        "Growing demand for solving complex optimization problems",
        "Few accessible platforms for businesses to leverage quantum capabilities",
        "High barrier to entry creates opportunity for specialized service providers"
      ]
    },
    {
      businessName: "CyberShield Dynamics",
      description: "AI-powered cybersecurity platform that proactively hunts for vulnerabilities in company systems by simulating advanced attacks. Provides continuous security testing and real-time threat intelligence.",
      targetMarket: "Mid-sized businesses without dedicated security teams",
      revenueModel: "Monthly subscription with tiered pricing based on company size and features",
      whyItWorks: [
        "Rising cybersecurity threats against businesses of all sizes",
        "Shortage of qualified cybersecurity professionals",
        "Proactive approach addressing vulnerabilities before breaches occur",
        "Regulatory compliance requirements driving security investments"
      ]
    },
    {
      businessName: "Hologram Spaces",
      description: "A service providing holographic telepresence technology for remote meetings, events, and educational content. Uses advanced projection technology to create lifelike 3D representations of remote participants.",
      targetMarket: "Conference centers, educational institutions, and large enterprises",
      revenueModel: "Hardware sales plus subscription for software platform and maintenance",
      whyItWorks: [
        "Remote work trends creating demand for immersive collaboration technologies",
        "Fatigue with traditional video conferencing",
        "Decreasing costs of holographic display technology",
        "Premium experience commanding premium pricing"
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
    },
    {
      businessName: "BioFeedback Therapeutics",
      description: "Platform combining wearable sensors with AI analysis to provide personalized stress management interventions. Real-time biofeedback guides users through customized mindfulness exercises based on physiological stress markers.",
      targetMarket: "Working professionals with high-stress jobs and health-conscious individuals",
      revenueModel: "Hardware sales plus subscription for personalized intervention programs",
      whyItWorks: [
        "Growing awareness of stress as a health risk factor",
        "Increasing adoption of wellness wearables and health tracking",
        "Scientific validation of biofeedback for stress management",
        "Integration possibilities with corporate wellness programs"
      ]
    },
    {
      businessName: "GenomeMate",
      description: "Personalized nutrition and lifestyle platform based on genomic analysis and continuous health monitoring. Provides tailored dietary recommendations and supplement formulations based on genetic predispositions.",
      targetMarket: "Health-optimizing consumers and individuals with genetic health risks",
      revenueModel: "Initial genetic testing fee plus subscription for ongoing personalized recommendations and custom supplements",
      whyItWorks: [
        "Declining costs of genomic testing making personalization more accessible",
        "Growing consumer interest in precision health approaches",
        "Scientific advances connecting genetic factors to nutritional needs",
        "Shift from reactive to preventative healthcare models"
      ]
    },
    {
      businessName: "CareCollective",
      description: "Marketplace connecting families with vetted caregivers for elderly relatives, using matching algorithms based on personality compatibility, experience, and specific care needs.",
      targetMarket: "Families with aging parents who need assistance but want to remain in their homes",
      revenueModel: "Commission on caregiver hours plus premium features for advanced monitoring",
      whyItWorks: [
        "Aging population creating unprecedented demand for eldercare",
        "Shortage of qualified caregivers and difficulty finding trusted providers",
        "Families increasingly geographically dispersed from elderly relatives",
        "Technology enabling better remote monitoring and coordination"
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
    },
    {
      businessName: "MicroMasters",
      description: "Platform offering intensive 12-week training programs co-designed with industry leaders in emerging technical fields. Each program combines theory with practical projects mentored by industry professionals.",
      targetMarket: "Career changers and professionals seeking to adapt to changing industry demands",
      revenueModel: "Upfront tuition with employer sponsorship options and income share agreements",
      whyItWorks: [
        "Rapid technological change creating need for continuous reskilling",
        "Traditional degrees too slow for emerging technical fields",
        "Employer frustration with skill gaps in traditional graduate hiring",
        "Growing acceptance of alternative credentials for technical roles"
      ]
    },
    {
      businessName: "KnowledgeGraph",
      description: "Adaptive learning platform that uses knowledge mapping to identify and fill gaps in student understanding. Creates personalized learning pathways based on cognitive science principles.",
      targetMarket: "K-12 schools and homeschooling families seeking personalized learning solutions",
      revenueModel: "Subscription model for schools with per-student pricing and direct-to-consumer options",
      whyItWorks: [
        "Growing recognition of learning gaps caused by one-size-fits-all education",
        "Advances in mapping knowledge domains and cognitive learning science",
        "Increasing parent involvement in educational decisions",
        "Schools seeking effective tools to address post-pandemic learning recovery"
      ]
    },
    {
      businessName: "ExpertMentor",
      description: "Platform connecting students with retired professionals for project-based mentoring and career guidance. Facilitates intergenerational knowledge transfer through structured collaboration.",
      targetMarket: "College students and early-career professionals seeking practical guidance",
      revenueModel: "Membership fee for mentees with optional premium services for intensive mentoring",
      whyItWorks: [
        "Disconnect between academic training and workplace realities",
        "Untapped resource of retired professionals with valuable expertise",
        "Students seeking authentic relationships with industry insiders",
        "Corporations interested in pipeline development and diversity initiatives"
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
    },
    {
      businessName: "WealthMatrix",
      description: "Holistic financial planning platform that helps users optimize across multiple financial goals simultaneously. Uses advanced modeling to balance competing priorities like retirement, education, and home ownership.",
      targetMarket: "Middle and upper-middle income households with multiple financial goals",
      revenueModel: "Tiered subscription model with optional advisor consultations",
      whyItWorks: [
        "Traditional financial planning treats goals in isolation",
        "Increasing complexity of financial decisions and tradeoffs",
        "Growing interest in holistic approaches to financial wellbeing",
        "Advancements in computational modeling for complex optimization"
      ]
    },
    {
      businessName: "MicroVentures",
      description: "Platform enabling everyday investors to back small local businesses through revenue-based financing. Businesses repay investors with a percentage of revenue until a predetermined return is reached.",
      targetMarket: "Small investors seeking local impact and established small businesses needing growth capital",
      revenueModel: "Origination fees plus ongoing administration percentage",
      whyItWorks: [
        "Regulatory changes making local investing more accessible",
        "Small businesses underserved by traditional capital sources",
        "Investor interest in tangible, community-oriented investments",
        "Technology making micro-investment administration cost-effective"
      ]
    },
    {
      businessName: "FoundersFund",
      description: "Automated equity funding platform for early-stage startups that standardizes terms and streamlines the fundraising process. Combines elements of crowdfunding with traditional venture capital approaches.",
      targetMarket: "Pre-seed and seed-stage technology startups and accredited investors",
      revenueModel: "Percentage of funds raised plus carried interest in successful investments",
      whyItWorks: [
        "Inefficient fundraising processes consuming founder time and energy",
        "Growing interest in startup investing beyond traditional VC hubs",
        "Technology enabling standardization of early-stage investment terms",
        "Potential to unlock capital for underrepresented founder communities"
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
    },
    {
      businessName: "AuthentiCheck",
      description: "Platform using blockchain and advanced authentication technologies to verify the authenticity of luxury goods in the secondary market. Provides digital certificates of authenticity that stay with items through resale.",
      targetMarket: "Luxury resellers, online marketplaces, and high-end consumers",
      revenueModel: "Authentication fees plus recurring marketplace listing fees",
      whyItWorks: [
        "Growing luxury resale market with significant counterfeit concerns",
        "Consumer willingness to pay premium for authentication certainty",
        "Blockchain enabling transparent ownership history",
        "Brand interest in maintaining product integrity in secondary markets"
      ]
    },
    {
      businessName: "RelayCommerce",
      description: "Neighborhood-based network for package acceptance and return facilitation. Transforms local businesses into secure package handling hubs, solving the last-mile delivery problem for urban dwellers.",
      targetMarket: "Urban apartment dwellers and local retailers with storefront space",
      revenueModel: "Subscription from consumers plus fees from delivery companies",
      whyItWorks: [
        "Package theft concerns driving demand for secure delivery options",
        "Increasing e-commerce volume creating delivery complexity",
        "Local businesses seeking additional foot traffic and revenue streams",
        "Community-based approach creating network effects"
      ]
    },
    {
      businessName: "VirtualCloset",
      description: "AR/VR fashion platform allowing users to virtually try on clothing from multiple retailers and receive style advice. Creates personalized digital avatars based on actual body measurements.",
      targetMarket: "Fashion-conscious consumers who shop primarily online",
      revenueModel: "Affiliate commissions from retailers plus premium styling services",
      whyItWorks: [
        "High return rates for online clothing purchases due to fit issues",
        "Advancements in 3D modeling and AR technology",
        "Retailer interest in reducing returns and increasing conversion",
        "Consumer desire for personalized shopping experiences"
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
    },
    {
      businessName: "CulinaryAI",
      description: "Smart kitchen assistant that uses computer vision and weight sensors to guide home cooks through recipes with real-time feedback. Adapts recipes based on available ingredients and cooking equipment.",
      targetMarket: "Tech-savvy home cooks seeking to improve their skills",
      revenueModel: "Smart kitchen hardware plus subscription for premium recipe content",
      whyItWorks: [
        "Increased interest in home cooking post-pandemic",
        "Advances in computer vision and AI making real-time guidance possible",
        "Consumer struggles with recipe adaptation and cooking techniques",
        "Integration potential with smart kitchen appliances and grocery delivery"
      ]
    },
    {
      businessName: "HeritagePantry",
      description: "Subscription service delivering authentic, small-batch ethnic ingredients and recipes from diaspora communities. Each box includes video stories from producers and cultural context for dishes.",
      targetMarket: "Adventurous home cooks and cultural food enthusiasts",
      revenueModel: "Monthly subscription boxes with tiered pricing options",
      whyItWorks: [
        "Growing consumer interest in authentic global cuisines",
        "Difficulty sourcing specialty ingredients outside ethnic enclaves",
        "Storytelling aspect creating emotional connection to products",
        "Supporting immigrant producers creates compelling social impact narrative"
      ]
    },
    {
      businessName: "FermentCollective",
      description: "Urban fermentation facility offering equipment, expertise and space for creating fermented foods and beverages. Combines production services with education and community building.",
      targetMarket: "Urban food enthusiasts interested in fermentation and preservation techniques",
      revenueModel: "Membership fees, class tuition, and production service charges",
      whyItWorks: [
        "Surging interest in gut health and fermented foods",
        "Space and equipment constraints limiting home fermentation",
        "Knowledge gaps around traditional preservation techniques",
        "Community aspect creating engagement and retention"
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
