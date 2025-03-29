
export const companyData = [
  {
    id: 1,
    name: "Apple Inc.",
    shortDescription: "Global technology company that designs, manufactures, and sells consumer electronics, software, and online services.",
    industry: "Technology",
    founded: "1976",
    headquarters: "Cupertino, CA",
    revenue: "$365.8 Billion",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    keyProducts: ["iPhone", "Mac", "iPad", "Wearables", "Services"],
    targetMarkets: ["Consumer Electronics", "Digital Services", "Enterprise Solutions"],
    businessOverview: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, and sells a variety of related services. The company's products include iPhone, Mac, iPad, and Wearables, Home and Accessories. It also provides AppleCare, iCloud, digital content stores, streaming, and licensing services.",
    swot: {
      strengths: [
        "Strong brand recognition and customer loyalty",
        "Robust ecosystem of integrated products and services",
        "High-quality, innovative product design",
        "Strong financial position with significant cash reserves",
        "Vertical integration of hardware, software, and services"
      ],
      weaknesses: [
        "Premium pricing limiting market share in developing markets",
        "Dependence on iPhone sales for revenue",
        "Closed ecosystem limiting compatibility with other platforms",
        "Limited presence in enterprise solutions",
        "Regulatory scrutiny over App Store policies"
      ],
      opportunities: [
        "Expansion into healthcare technology",
        "Growth in wearable technology market",
        "Services revenue expansion (Apple TV+, Arcade, News+)",
        "Augmented reality and autonomous vehicle development",
        "Expansion in emerging markets with lower-cost devices"
      ],
      threats: [
        "Intense competition from tech giants",
        "Supply chain disruptions and component shortages",
        "Changing consumer preferences",
        "Regulatory challenges in multiple markets",
        "Economic downturns affecting premium product sales"
      ]
    },
    financials: {
      revenueGrowth: [
        { year: '2019', revenue: 260 },
        { year: '2020', revenue: 274 },
        { year: '2021', revenue: 365 },
        { year: '2022', revenue: 394 },
        { year: '2023', revenue: 383 },
      ],
      profitMargins: [
        { year: '2019', margin: 21.2 },
        { year: '2020', margin: 20.9 },
        { year: '2021', margin: 26.1 },
        { year: '2022', margin: 25.3 },
        { year: '2023', margin: 24.8 },
      ],
      keyMetrics: {
        revenuePerEmployee: "$2,424,000",
        operatingMargin: "30.3%",
        returnOnAssets: "20.9%",
        debtToEquity: "1.52",
      },
      financialBreakdown: [
        { category: 'iPhone', percentage: 54 },
        { category: 'Services', percentage: 21 },
        { category: 'Mac', percentage: 11 },
        { category: 'Wearables & Home', percentage: 9 },
        { category: 'iPad', percentage: 5 },
      ]
    }
  },
  {
    id: 2,
    name: "Tesla, Inc.",
    shortDescription: "Automotive and clean energy company focused on electric vehicles, battery energy storage, and solar products.",
    industry: "Automotive & Energy",
    founded: "2003",
    headquarters: "Austin, TX",
    revenue: "$96.8 Billion",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    keyProducts: ["Model 3", "Model Y", "Model S", "Model X", "Energy Storage Systems"],
    targetMarkets: ["Electric Vehicles", "Energy Storage", "Solar Energy"],
    businessOverview: "Tesla designs, develops, manufactures, sells and leases high-performance fully electric vehicles and energy generation and storage systems. The company's automotive products include Model 3, Model Y, Model S, and Model X. It also offers Powerwall and Powerpack battery storage products, and solar energy systems.",
    swot: {
      strengths: [
        "Strong brand identity and loyal customer base",
        "Leading position in the electric vehicle market",
        "Vertical integration of manufacturing and operations",
        "Advanced battery technology and autonomous driving features",
        "Integrated renewable energy ecosystem"
      ],
      weaknesses: [
        "Production capacity constraints and delivery challenges",
        "Quality control and service issues",
        "High capital expenditure requirements",
        "Over-reliance on Elon Musk as brand ambassador",
        "Limited vehicle model range compared to traditional manufacturers"
      ],
      opportunities: [
        "Growing global demand for electric vehicles",
        "Expansion into commercial vehicles and new markets",
        "Energy storage business growth potential",
        "Autonomous driving technology commercialization",
        "Government incentives for electric vehicle adoption"
      ],
      threats: [
        "Increasing competition from established automakers",
        "Supply chain disruptions and raw material shortages",
        "Potential changes in government incentives and regulations",
        "Economic factors affecting luxury vehicle sales",
        "Technological challenges in achieving full autonomy"
      ]
    },
    marketAnalysis: {
      industrySize: "$1.2 Trillion",
      growthRate: "23.1%",
      marketShare: "18.5",
      competitorAnalysis: [
        { name: "Tesla", marketShare: "18.5" },
        { name: "BYD", marketShare: "16.2" },
        { name: "Volkswagen Group", marketShare: "8.3" },
        { name: "Others", marketShare: "57.0" }
      ],
      trends: [
        "Rapid growth in EV adoption worldwide",
        "Integration of renewable energy with transportation",
        "Autonomous driving technology advancement",
        "Battery technology improvements",
        "Shift from ownership to mobility services"
      ],
      challenges: [
        "Charging infrastructure limitations",
        "Battery supply chain constraints",
        "Consumer range anxiety and charging times",
        "Regulatory differences across markets",
        "Traditional automaker competition"
      ]
    }
  },
  {
    id: 3,
    name: "Amazon",
    shortDescription: "Global technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    industry: "E-Commerce & Technology",
    founded: "1994",
    headquarters: "Seattle, WA",
    revenue: "$574.8 Billion",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    keyProducts: ["Amazon Marketplace", "Amazon Web Services", "Prime Subscription", "Echo Devices", "Kindle"],
    targetMarkets: ["E-commerce Consumers", "Enterprise Cloud Services", "Digital Content Consumers"],
    businessModel: {
      revenueStreams: [
        { name: "Product Sales", description: "Direct revenue from first-party product sales" },
        { name: "Subscription Services", description: "Revenue from Prime and other subscription offerings" },
        { name: "Third-party Seller Services", description: "Commissions and fees from marketplace sellers" },
        { name: "AWS Cloud Computing", description: "Enterprise cloud infrastructure and services" }
      ],
      customerSegments: [
        { name: "Online Shoppers", description: "Consumer customers buying products online" },
        { name: "Enterprise Businesses", description: "Companies using AWS for cloud services" },
        { name: "Content Consumers", description: "Users of streaming services and digital content" },
        { name: "Third-party Sellers", description: "Businesses selling products through Amazon" }
      ],
      valueProposition: [
        "Vast product selection with competitive pricing",
        "Fast and reliable delivery with Prime membership benefits",
        "Comprehensive cloud services and solutions",
        "Integrated ecosystem of devices and services",
        "Customer-centric approach with emphasis on convenience"
      ],
      keySuccessFactors: [
        "Massive scale and operational efficiency",
        "Technology-driven innovation and continuous improvement",
        "Customer obsession and service quality",
        "Strategic acquisitions and business diversification",
        "Data-driven decision making and optimization"
      ]
    }
  },
  {
    id: 4,
    name: "Nike",
    shortDescription: "Global athletic footwear, apparel, equipment, and accessories manufacturer and retailer.",
    industry: "Apparel & Footwear",
    founded: "1964",
    headquarters: "Beaverton, OR",
    revenue: "$51.2 Billion",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    businessOverview: "Nike is one of the world's largest suppliers of athletic shoes and apparel and a major manufacturer of sports equipment. The company markets its products under its own brand, as well as Nike Golf, Nike Pro, Nike+, Air Jordan, and subsidiaries including Converse and Hurley International."
  },
  {
    id: 5,
    name: "Airbnb",
    shortDescription: "Online marketplace for lodging, primarily homestays for vacation rentals, and tourism activities.",
    industry: "Travel & Hospitality",
    founded: "2008",
    headquarters: "San Francisco, CA",
    revenue: "$8.4 Billion",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
  },
  {
    id: 6,
    name: "Starbucks",
    shortDescription: "American multinational chain of coffeehouses and roastery reserves.",
    industry: "Food & Beverage",
    founded: "1971",
    headquarters: "Seattle, WA",
    revenue: "$32.2 Billion",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
  }
];
