export interface ExampleCompany {
  id: string;
  name: string;
  description: string;
  industry: string;
  logoIcon: string;
  executiveSummary: string;
  marketAnalysis: string;
  businessModel: string;
  marketingPlan: string;
  financialProjections: string;
  riskAssessment: string;
  swotAnalysis: string;
}

export const exampleCompanies: ExampleCompany[] = [
  {
    id: "spotify",
    name: "Spotify",
    description: "Leading music and podcast streaming platform offering personalized content and algorithmic recommendations.",
    industry: "Digital Entertainment & Streaming",
    logoIcon: "Music",
    executiveSummary: "Spotify is a digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world. With over 456 million monthly active users, it is the world's most popular audio streaming subscription service.",
    marketAnalysis: "The global music streaming market is experiencing robust growth at a CAGR of 16.5%, driven by increasing internet penetration and smartphone adoption. Spotify maintains market leadership with approximately 31% market share, facing competition from tech giants like Apple Music (15%), Amazon Music (13%), and YouTube Music (8%). The shift towards digital consumption of audio content, including podcasts and audiobooks, presents significant growth opportunities.",
    businessModel: "Spotify operates a freemium business model with both advertising-supported free tier and premium subscription services. Revenue is generated through monthly subscription fees and advertising, with costs primarily driven by content licensing and royalty payments to rights holders. The company has expanded into podcasting to diversify content offerings and reduce dependence on music licensing.",
    marketingPlan: "Spotify's marketing strategy leverages personalization, user-generated playlists, and algorithmic recommendations to drive engagement. The company invests in exclusive content partnerships, influencer collaborations, and data-driven campaigns. Focus areas include podcast creator partnerships, emerging market expansion, and enhanced social features.",
    swotAnalysis: "Strengths: Market leader with largest user base, advanced recommendation algorithms, strong brand recognition, successful podcast expansion. Weaknesses: Challenging profitability due to high royalty costs, dependence on major labels, limited hardware integration. Opportunities: Further expansion into podcasts and audiobooks, emerging markets growth, artist tools development. Threats: Intense competition from tech giants, increasing licensing costs, regulatory challenges.",
    financialProjections: "Spotify reported €3.2 billion in revenue for Q2 2023, with premium subscribers reaching 220 million. The company maintains a gross margin of 25.2%, with ongoing investments in content and technology. Primary focus remains on expanding the user base while improving operational efficiency.",
    riskAssessment: "Key risks include increasing content costs, intense competition from well-funded tech companies, regulatory scrutiny of artist compensation, and potential disintermediation through direct-to-fan platforms. Spotify's market leadership, technological capabilities, and content diversity provide risk mitigation."
  },
  {
    id: "tesla",
    name: "Tesla, Inc.",
    description: "Electric vehicle and clean energy company focused on manufacturing electric vehicles, battery energy storage, and solar products.",
    industry: "Automotive & Energy",
    logoIcon: "Zap",
    executiveSummary: "Tesla is an American electric vehicle and clean energy company that designs and manufactures electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services. Tesla is one of the world's most valuable companies and remains the world's most valuable automaker with a market capitalization of more than US$600 billion.",
    marketAnalysis: "The electric vehicle market is projected to grow at a CAGR of 21.7% from 2022 to 2030. Tesla maintains a significant market share in the premium electric vehicle segment, with key competitors including traditional automakers like Ford, GM, and Volkswagen, as well as new entrants like Rivian and Lucid Motors. The global shift toward renewable energy and sustainable transportation is creating tailwinds for Tesla's core business segments.",
    businessModel: "Tesla operates a direct-to-consumer sales model, bypassing traditional dealerships. Revenue streams include vehicle sales, energy products, services, and regulatory credits. The company's vertical integration strategy encompasses battery production, charging infrastructure, and advanced software development.",
    marketingPlan: "Tesla's marketing approach relies heavily on word-of-mouth, product innovation, and the personal brand of CEO Elon Musk. Instead of traditional advertising, the company invests in showrooms in high-traffic retail locations, a robust digital presence, and community-building through owner events. Tesla's Referral Program incentivizes existing customers to promote the brand through personal recommendations.",
    swotAnalysis: "Strengths: Brand leadership in EVs, innovative technology, global Supercharger network, vertical integration. Weaknesses: Production challenges, quality control issues, regulatory scrutiny. Opportunities: Growing EV market, energy storage expansion, autonomous driving technology. Threats: Increasing competition, supply chain constraints, potential battery material shortages.",
    financialProjections: "Tesla reported $24.32 billion in revenue in Q2 2023, with automotive revenue accounting for $21.27 billion. The company's gross margin was 18.2%, with an operating margin of 9.6%. Tesla has $26.08 billion in cash and cash equivalents as of Q2 2023, with relatively low debt levels compared to traditional automakers.",
    riskAssessment: "Key risks include production scaling challenges, increasing competition in the EV market, regulatory changes affecting incentives, and supply chain disruptions affecting battery materials. Tesla's technology leadership position and financial strength provide significant risk mitigation factors."
  },
  {
    id: "apple",
    name: "Apple Inc.",
    description: "Technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories.",
    industry: "Technology & Consumer Electronics",
    logoIcon: "Apple",
    executiveSummary: "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software, and online services. Apple is the largest technology company by revenue and has been the world's most valuable company since 2022, with a market capitalization of over US$3 trillion.",
    marketAnalysis: "The global smartphone market is projected to reach $784 billion by 2028, with Apple maintaining premium market share and profitability. The company has strong positions in personal computing, tablets, and wearables, while expanding its services ecosystem. Key competitors include Samsung, Xiaomi, and Google in hardware, and various specialized competitors across its software and services businesses.",
    businessModel: "Apple generates revenue primarily through hardware sales, with growing contributions from services including the App Store, iCloud, Apple Music, Apple TV+, and Apple Pay. The company's ecosystem strategy creates high switching costs and customer loyalty, with seamless integration across devices and services driving recurring revenue.",
    marketingPlan: "Apple's marketing strategy emphasizes premium positioning, product design, and ecosystem benefits. The company utilizes flagship retail stores as experiential marketing centers, product launch events as major media moments, and targeted digital campaigns. Customer education through 'Today at Apple' sessions builds community and deepens product engagement.",
    swotAnalysis: "Strengths: Strong brand value, loyal customer base, vertically integrated ecosystem, financial resources. Weaknesses: Premium pricing limiting market share, dependence on iPhone sales, app store controversies. Opportunities: Services expansion, health technology, augmented reality. Threats: Regulatory scrutiny, competition in emerging markets, supply chain vulnerabilities.",
    financialProjections: "Apple reported $81.8 billion in revenue for Q3 2023, with iPhone contributing $39.67 billion. Services revenue reached $21.21 billion, showing continued growth. The company maintains exceptional gross margins of 44.5% and an operating margin of 30%, with over $162 billion in cash and marketable securities.",
    riskAssessment: "Primary risks include smartphone market saturation, regulatory challenges to App Store policies, geopolitical tensions affecting manufacturing, and technology disruption. Apple's vertical integration, customer loyalty, and financial strength provide considerable insulation against these risks."
  },
  {
    id: "amazon",
    name: "Amazon.com, Inc.",
    description: "E-commerce, cloud computing, digital streaming, and artificial intelligence company.",
    industry: "E-commerce & Technology",
    logoIcon: "ShoppingCart",
    executiveSummary: "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence. It has been referred to as one of the most influential economic and cultural forces in the world, and is one of the world's most valuable brands.",
    marketAnalysis: "The global e-commerce market is expected to reach $58.74 trillion by 2028, growing at a CAGR of 14.7%. Amazon leads in North America and has significant presence in Europe and Asia. AWS continues to dominate the cloud computing market with approximately 32% market share. Key competitors include Walmart and Alibaba in retail, and Microsoft and Google in cloud services.",
    businessModel: "Amazon operates multiple business models including direct retail, marketplace platform, subscription services (Prime), cloud computing (AWS), digital advertising, and entertainment production. The company prioritizes customer experience and long-term growth over short-term profitability, utilizing data-driven optimization and economies of scale.",
    marketingPlan: "Amazon's marketing strategy leverages its massive customer data to deliver personalized recommendations and targeted advertising. The company focuses on Prime membership growth, content marketing through original programming, and strategic sales events like Prime Day. Search engine optimization and digital advertising represent significant areas of marketing investment.",
    swotAnalysis: "Strengths: Global scale, customer-centric approach, technological infrastructure, diversified revenue streams. Weaknesses: Workplace controversies, thin margins in retail, regulatory scrutiny. Opportunities: International expansion, healthcare services, physical retail innovation. Threats: Antitrust regulation, rising logistics costs, labor organization efforts.",
    financialProjections: "Amazon reported $134.4 billion in net sales for Q2 2023, with AWS generating $22.1 billion. Operating income was $7.7 billion, with AWS contributing $5.4 billion. The company continues to invest heavily in fulfillment capacity, content creation, and new business ventures while maintaining positive free cash flow.",
    riskAssessment: "Key risks include regulatory actions related to market dominance, labor relations challenges, international trade complications, and cybersecurity threats. Amazon's diversified business model, technical capabilities, and scale provide significant risk mitigation."
  },
  {
    id: "microsoft",
    name: "Microsoft Corporation",
    description: "Technology company that develops, licenses, and supports software, services, devices, and solutions.",
    industry: "Software & Cloud Computing",
    logoIcon: "Workflow",
    executiveSummary: "Microsoft Corporation is an American multinational technology corporation that produces computer software, consumer electronics, personal computers, and related services. Microsoft is one of the Big Five American information technology companies, alongside Google, Amazon, Apple, and Meta.",
    marketAnalysis: "The global cloud computing market is expected to reach $1.6 trillion by 2030, growing at a CAGR of 17.9%. Microsoft's Azure platform holds approximately 22% market share, second only to AWS. The company's diversified product portfolio spans operating systems, productivity software, gaming, and hardware. Key competitors include AWS and Google in cloud services, and Google and Apple in various software categories.",
    businessModel: "Microsoft generates revenue through software licenses, cloud services subscriptions, gaming sales, hardware devices, and advertising. The company has successfully transitioned from a traditional software licensing model to a cloud-based subscription model, particularly with Microsoft 365 and Azure services.",
    marketingPlan: "Microsoft's marketing strategy focuses on business solutions, productivity enhancements, and digital transformation. The company positions itself as an essential partner for enterprises undergoing digital transformation, with integrated campaigns across digital channels, industry events, and partner ecosystems.",
    swotAnalysis: "Strengths: Diverse product portfolio, enterprise relationships, cloud infrastructure, strong financials. Weaknesses: Legacy systems complexity, hardware market challenges. Opportunities: AI integration, metaverse development, security solutions expansion. Threats: Cybersecurity challenges, competitive cloud market, regulatory scrutiny.",
    financialProjections: "Microsoft reported $56.2 billion in revenue for Q4 FY2023, with Intelligent Cloud (including Azure) generating $24 billion. The company continues to demonstrate strong profitability with operating margins above 40% across most business segments.",
    riskAssessment: "Key risks include cybersecurity threats, rapid technological change, regulatory compliance challenges, and intense competition in cloud services. Microsoft's diversified business model, technical expertise, and financial resources provide significant risk mitigation factors."
  },
  {
    id: "netflix",
    name: "Netflix, Inc.",
    description: "Subscription streaming service and production company.",
    industry: "Entertainment & Media",
    logoIcon: "MonitorPlay",
    executiveSummary: "Netflix, Inc. is an American subscription video on-demand streaming service and production company. The company offers a library of films, television series, and games through distribution deals and its own productions, known as Netflix Originals.",
    marketAnalysis: "The global video streaming market is projected to reach $330 billion by 2030, growing at a CAGR of 21.3%. Netflix maintains a leading position with approximately 240 million subscribers worldwide. The streaming landscape has become increasingly competitive with entries from major media companies. Key competitors include Disney+, Amazon Prime Video, HBO Max, and numerous regional streaming services.",
    businessModel: "Netflix operates on a subscription-based revenue model, offering tiered pricing plans with different features. The company invests heavily in original content production and licensing, with a strategic shift toward creating owned intellectual property. International expansion and localized content development represent key growth vectors.",
    marketingPlan: "Netflix's marketing approach combines content-centric promotion, algorithmic personalization, and limited traditional advertising. The company leverages sophisticated data analytics to target potential subscribers, recommend content to existing users, and reduce churn. Social media engagement, cultural moment creation, and exclusive previews form core elements of their marketing strategy.",
    swotAnalysis: "Strengths: Content library depth, brand recognition, recommendation algorithm, international presence. Weaknesses: High content costs, subscription-only model, regional content gaps. Opportunities: Gaming expansion, advertising tier growth, merchandise licensing. Threats: Subscription fatigue, intensifying competition, content production disruptions.",
    financialProjections: "Netflix reported $8.2 billion in revenue for Q2 2023, with paid memberships reaching 238.4 million globally. The company's operating margin was 22.3%, with a focus on balancing content investment with profitability goals.",
    riskAssessment: "Primary risks include increasing content costs, intense streaming competition, subscriber growth challenges in mature markets, and potential regulatory changes affecting digital services. Netflix's established brand, technical infrastructure, and global scale provide meaningful risk mitigation."
  },
  {
    id: "meta",
    name: "Meta Platforms, Inc.",
    description: "Technology company focusing on social media, digital advertising, and metaverse technologies.",
    industry: "Social Media & Technology",
    logoIcon: "Share2",
    executiveSummary: "Meta Platforms, Inc. (formerly Facebook, Inc.) is an American multinational technology conglomerate that owns Facebook, Instagram, WhatsApp, and Oculus, among other products and services. The company has rebranded to focus on developing the metaverse, a collective virtual shared space.",
    marketAnalysis: "The global social media market is valued at approximately $230 billion in 2023 and is expected to reach $710 billion by 2030. Meta maintains dominant positions with Facebook and Instagram, reaching billions of users worldwide. The digital advertising market, Meta's primary revenue source, continues to grow despite increased competition and privacy challenges. Key competitors include TikTok, Snapchat, Google, and emerging metaverse players.",
    businessModel: "Meta generates revenue primarily through digital advertising on its family of apps, with nascent revenue streams from virtual reality hardware, digital goods, and enterprise metaverse solutions. The company leverages its massive user data to deliver highly targeted advertising capabilities to marketers.",
    marketingPlan: "Meta's marketing strategy focuses on platform growth, developer ecosystem expansion, and metaverse adoption. The company invests in brand campaigns highlighting connectivity, creativity, and future technologies. Business marketing emphasizes advertising effectiveness, while developer outreach centers on platform tools and monetization opportunities.",
    swotAnalysis: "Strengths: Massive user base, advertising technology, engineering talent, financial resources. Weaknesses: Privacy concerns, regulatory scrutiny, metaverse investment uncertainty. Opportunities: Metaverse development, business messaging expansion, e-commerce integration. Threats: User engagement challenges, regulatory actions, competition from short-form video platforms.",
    financialProjections: "Meta reported $32 billion in revenue for Q2 2023, primarily from advertising. The company continues to invest heavily in Reality Labs (metaverse division) despite the segment operating at a loss. Overall company operating margin was approximately 29%, reflecting strong core business performance offsetting metaverse investments.",
    riskAssessment: "Key risks include regulatory actions related to privacy and competition, declining engagement among younger users, advertising measurement challenges due to privacy changes, and uncertainty around metaverse adoption timelines. Meta's established platforms, technical capabilities, and financial strength provide risk mitigation."
  }
];
