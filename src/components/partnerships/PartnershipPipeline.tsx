
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Users, Building, LineChart, Award } from 'lucide-react';

interface PartnershipPipelineProps {
  businessName: string;
  businessDescription: string;
}

const PartnershipPipeline: React.FC<PartnershipPipelineProps> = ({
  businessName,
  businessDescription
}) => {
  const { influencers, healthcareProviders, insuranceCompanies, affiliateProgram } = generatePartnershipData(businessName, businessDescription);

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Handshake className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Partnership Pipeline
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Strategic relationship development
        </div>
      </div>

      <div className="space-y-6">
        {/* Influencers */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-semibold">Influencer Partnerships</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{influencers.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {influencers.targets.map((influencer, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{influencer.name}</h4>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{influencer.platform}</div>
                    <div className="text-xs font-medium mt-1">{influencer.audience}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Healthcare Providers */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-semibold">Healthcare Providers</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{healthcareProviders.description}</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <th className="py-2 px-4 text-left">Target</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Timeline</th>
                    <th className="py-2 px-4 text-left">Potential Value</th>
                  </tr>
                </thead>
                <tbody>
                  {healthcareProviders.targets.map((target, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-800">
                      <td className="py-3 px-4 font-medium">{target.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          target.status === 'Contacted' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' :
                          target.status === 'Negotiating' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' :
                          target.status === 'Scheduled' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300' :
                          'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                        }`}>
                          {target.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{target.timeline}</td>
                      <td className="py-3 px-4">
                        <span className={`${
                          target.value === 'High' ? 'text-green-600 dark:text-green-400' :
                          target.value === 'Very High' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' :
                          'text-blue-600 dark:text-blue-400'
                        }`}>
                          {target.value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insurance Companies */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold">Insurance Companies</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{insuranceCompanies.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insuranceCompanies.programs.map((program, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{program.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{program.description}</p>
                  
                  <div className="flex items-center gap-3 mb-2 text-sm">
                    <div className="text-gray-500 dark:text-gray-400">Timeline:</div>
                    <div className="font-medium">{program.timeline}</div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="text-gray-500 dark:text-gray-400">Potential Impact:</div>
                    <div className="font-medium">{program.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Affiliate & Partnership Program */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-semibold">Affiliate & Partnership Program</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{affiliateProgram.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              {/* Commission Structure */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <h4 className="font-semibold mb-2 text-indigo-800 dark:text-indigo-300">Commission Structure</h4>
                <div className="flex flex-col items-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-800/50 flex items-center justify-center mb-2">
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{affiliateProgram.commissionRate}</span>
                  </div>
                  <p className="text-sm text-center">{affiliateProgram.commissionDetails}</p>
                </div>
              </div>
              
              {/* Partner Tiers */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <h4 className="font-semibold mb-3 text-indigo-800 dark:text-indigo-300">Partner Tiers</h4>
                <div className="space-y-2">
                  {affiliateProgram.partnerTiers.map((tier, index) => (
                    <div key={index} className="flex items-start gap-2 p-1">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        tier.name === "Bronze" ? "bg-amber-600" :
                        tier.name === "Silver" ? "bg-gray-400" :
                        "bg-yellow-500"
                      }`}></div>
                      <div>
                        <span className="text-sm font-medium">{tier.name}</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{tier.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Co-Branding */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <h4 className="font-semibold mb-3 text-indigo-800 dark:text-indigo-300">Co-Branding</h4>
                <div className="space-y-2">
                  {affiliateProgram.coBranding.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-1 bg-white dark:bg-gray-800 rounded border border-indigo-50 dark:border-indigo-900/30">
                      <Handshake className="h-4 w-4 text-indigo-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-sm text-center">
              <p className="text-gray-600 dark:text-gray-400">Interested in our partnership program? Contact us at partnerships@{businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

function generatePartnershipData(businessName: string, businessDescription: string) {
  const isHealthBusiness = businessDescription.toLowerCase().includes('health') || 
                         businessDescription.toLowerCase().includes('fitness') || 
                         businessDescription.toLowerCase().includes('wellness');
  
  const isTechBusiness = businessDescription.toLowerCase().includes('tech') || 
                       businessDescription.toLowerCase().includes('software') || 
                       businessDescription.toLowerCase().includes('app');
  
  const isEducationBusiness = businessDescription.toLowerCase().includes('education') || 
                            businessDescription.toLowerCase().includes('learning') || 
                            businessDescription.toLowerCase().includes('teaching');
                            
  const isFinanceBusiness = businessDescription.toLowerCase().includes('finance') || 
                          businessDescription.toLowerCase().includes('payment') || 
                          businessDescription.toLowerCase().includes('banking');

  // Influencer partnerships
  const influencers = {
    description: `Collaborate with relevant influencers who can authentically promote ${businessName} to their engaged audiences.`,
    targets: [
      {
        name: isHealthBusiness ? "Health & Wellness" : 
              isTechBusiness ? "Tech Reviewers" :
              isEducationBusiness ? "EdTech Influencers" :
              isFinanceBusiness ? "Finance Experts" : "Industry Leaders",
        platform: isHealthBusiness ? "Instagram/YouTube" :
                  isTechBusiness ? "YouTube/Twitter" :
                  isEducationBusiness ? "YouTube/LinkedIn" :
                  isFinanceBusiness ? "LinkedIn/Twitter" : "Multiple Platforms",
        audience: "1M+ followers"
      },
      {
        name: isHealthBusiness ? "Medical Professionals" :
              isTechBusiness ? "Developer Advocates" :
              isEducationBusiness ? "Education Thought Leaders" :
              isFinanceBusiness ? "Financial Advisors" : "Professional Network",
        platform: "LinkedIn/Twitter",
        audience: "Industry respect"
      },
      {
        name: isHealthBusiness ? "Transformation Stories" :
              isTechBusiness ? "Tech Early Adopters" :
              isEducationBusiness ? "Student Creators" :
              isFinanceBusiness ? "Personal Finance" : "Success Stories",
        platform: "TikTok/Instagram",
        audience: "Authentic journeys"
      },
      {
        name: isHealthBusiness ? "Corporate Wellness" :
              isTechBusiness ? "Tech Entrepreneurs" :
              isEducationBusiness ? "School Administrators" :
              isFinanceBusiness ? "Corporate Finance" : "B2B Decision Makers",
        platform: "LinkedIn/Podcasts",
        audience: "B2B decision makers"
      },
      {
        name: isHealthBusiness ? "Fitness Experts" :
              isTechBusiness ? "Product Reviewers" :
              isEducationBusiness ? "Educational Content Creators" :
              isFinanceBusiness ? "Investment Specialists" : "Industry Specialists",
        platform: "YouTube/Instagram",
        audience: "Dedicated followers"
      },
      {
        name: isHealthBusiness ? "Lifestyle Bloggers" :
              isTechBusiness ? "Tech Bloggers" :
              isEducationBusiness ? "Parent Bloggers" :
              isFinanceBusiness ? "Financial Bloggers" : "Lifestyle Content",
        platform: "Blogs/Instagram",
        audience: "High engagement"
      }
    ]
  };

  // Healthcare providers partnership data
  const healthcareProviders = {
    description: isHealthBusiness ? 
      `Partner with healthcare providers to integrate ${businessName} into patient care protocols and expand reach through medical professional networks.` :
      `Identify key institutional partners that can help ${businessName} reach target audiences and provide credibility in the marketplace.`,
    targets: [
      {
        name: isHealthBusiness ? "Regional Medical Centers" :
              isTechBusiness ? "Tech Incubators" :
              isEducationBusiness ? "School Districts" :
              isFinanceBusiness ? "Financial Institutions" : "Industry Associations",
        status: "Contacted",
        timeline: "Q2 2024",
        value: "High"
      },
      {
        name: isHealthBusiness ? "Private Clinics Network" :
              isTechBusiness ? "Startup Accelerators" :
              isEducationBusiness ? "Universities" :
              isFinanceBusiness ? "Investment Firms" : "Trade Organizations",
        status: "Negotiating",
        timeline: "Q1 2024",
        value: "Medium"
      },
      {
        name: isHealthBusiness ? "University Health Systems" :
              isTechBusiness ? "Tech Conferences" :
              isEducationBusiness ? "Education Departments" :
              isFinanceBusiness ? "Banking Partners" : "Research Institutions",
        status: "Scheduled",
        timeline: "Q3 2024",
        value: "Very High"
      },
      {
        name: isHealthBusiness ? "Specialist Practitioner Groups" :
              isTechBusiness ? "Developer Communities" :
              isEducationBusiness ? "Education Technology Vendors" :
              isFinanceBusiness ? "Financial Advisors Network" : "Industry Leaders",
        status: "Pending",
        timeline: "Q4 2024",
        value: "Medium"
      }
    ]
  };

  // Insurance companies partnership data
  const insuranceCompanies = {
    description: isHealthBusiness ? 
      `Partner with insurance providers to offer subsidized plans or premium discounts for active ${businessName} users.` :
      `Develop strategic relationships with key industry players to create mutual value and expand market reach.`,
    programs: [
      {
        name: isHealthBusiness ? "Wellness Program Integration" :
              isTechBusiness ? "Technology Partnership Program" :
              isEducationBusiness ? "Education Initiative Sponsorship" :
              isFinanceBusiness ? "Financial Solutions Integration" : "Strategic Alliance",
        description: isHealthBusiness ? 
          `Integrate with existing wellness rewards programs to offer premium discounts for regular ${businessName} users.` :
          `Develop mutually beneficial relationships with key industry partners to expand market reach.`,
        timeline: "6-9 months",
        impact: "Potentially 10,000+ new users"
      },
      {
        name: isHealthBusiness ? "Employer Health Plans" :
              isTechBusiness ? "Enterprise Solution Integration" :
              isEducationBusiness ? "Institution-Wide Licensing" :
              isFinanceBusiness ? "Corporate Financial Services" : "B2B Partnership",
        description: isHealthBusiness ?
          `Partner with corporate health insurance plans to offer ${businessName} as a value-added benefit to employees.` :
          `Create B2B relationships that position ${businessName} as an essential service for partner organizations.`,
        timeline: "3-6 months",
        impact: "Corporate partnerships"
      },
      {
        name: isHealthBusiness ? "Outcome-Based Coverage" :
              isTechBusiness ? "Tech Integration Partners" :
              isEducationBusiness ? "Education Content Partnerships" :
              isFinanceBusiness ? "Financial Product Integration" : "Product Integration",
        description: isHealthBusiness ?
          `Develop metrics-based coverage where user achievements on ${businessName} contribute to reduced premiums.` :
          `Create seamless integrations with complementary products and services to enhance user experience.`,
        timeline: "12+ months",
        impact: isHealthBusiness ? "Healthcare cost reduction data" : "Expanded user base"
      },
      {
        name: isHealthBusiness ? "Prevention Programs" :
              isTechBusiness ? "Technology Research Initiatives" :
              isEducationBusiness ? "Educational Research Programs" :
              isFinanceBusiness ? "Financial Research Partnerships" : "Industry Research",
        description: isHealthBusiness ?
          `Position ${businessName} as a preventive healthcare tool for managing chronic conditions and reducing costs.` :
          `Collaborate with research institutions to validate and improve ${businessName}'s effectiveness.`,
        timeline: "9-12 months",
        impact: isHealthBusiness ? "Medical research opportunities" : "Industry credibility"
      }
    ]
  };

  // Affiliate program data
  const affiliateProgram = {
    description: `Create a robust network of partners who can promote ${businessName} to their audiences while earning commissions and benefits.`,
    commissionRate: "20%",
    commissionDetails: `Partners earn 20% of referred user revenue for the first year of subscription.`,
    partnerTiers: [
      {
        name: "Bronze",
        description: isHealthBusiness ? "Fitness Bloggers & Content Creators" : 
                     isTechBusiness ? "Tech Reviewers & Bloggers" :
                     isEducationBusiness ? "Education Content Creators" :
                     isFinanceBusiness ? "Financial Content Creators" : "Content Creators"
      },
      {
        name: "Silver",
        description: isHealthBusiness ? "Trainers & Fitness Professionals" :
                     isTechBusiness ? "Software Developers & Agencies" :
                     isEducationBusiness ? "Teachers & Educational Organizations" :
                     isFinanceBusiness ? "Financial Advisors & Planners" : "Industry Professionals"
      },
      {
        name: "Gold",
        description: isHealthBusiness ? "Clinics & Health Organizations" :
                     isTechBusiness ? "Enterprise Partners & Platforms" :
                     isEducationBusiness ? "Universities & Educational Institutions" :
                     isFinanceBusiness ? "Financial Institutions" : "Enterprise Partners"
      }
    ],
    coBranding: [
      isHealthBusiness ? `${businessName} x Peloton challenges` :
      isTechBusiness ? `${businessName} x Microsoft integration` :
      isEducationBusiness ? `${businessName} x Khan Academy program` :
      isFinanceBusiness ? `${businessName} x Quickbooks integration` : `${businessName} partner program`,
      
      isHealthBusiness ? `${businessName} branded fitness equipment` :
      isTechBusiness ? `Co-hosted tech webinars` :
      isEducationBusiness ? `Co-branded educational materials` :
      isFinanceBusiness ? `Financial wellness workshops` : `Co-branded promotional campaigns`,
      
      isHealthBusiness ? `Wellness retreat sponsorships` :
      isTechBusiness ? `Technology conference partnerships` :
      isEducationBusiness ? `Educational conference sponsorships` :
      isFinanceBusiness ? `Financial summit sponsorships` : `Industry event collaborations`
    ]
  };

  return { influencers, healthcareProviders, insuranceCompanies, affiliateProgram };
}

export default PartnershipPipeline;
