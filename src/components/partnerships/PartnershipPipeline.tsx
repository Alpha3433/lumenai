
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Building, Award, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PartnershipPipelineProps {
  businessName: string;
  businessDescription: string;
}

const PartnershipPipeline: React.FC<PartnershipPipelineProps> = ({
  businessName,
  businessDescription
}) => {
  const { healthcareProviders, insuranceCompanies, influencers } = generatePartnershipData(businessName);

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
        {/* Healthcare Providers */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold">Healthcare Providers</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{healthcareProviders.description}</p>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Potential Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {healthcareProviders.targets.map((target, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{target.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusStyle(target.status)}`}>
                          {target.status}
                        </span>
                      </TableCell>
                      <TableCell>{target.timeline}</TableCell>
                      <TableCell>{target.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Insurance Companies */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold">Insurance Companies</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{insuranceCompanies.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insuranceCompanies.opportunities.map((opportunity, index) => (
                <Card key={index} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-1">{opportunity.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{opportunity.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="border-r border-gray-200 dark:border-gray-700 pr-2">
                        <div className="text-gray-600 dark:text-gray-400">Timeline:</div>
                        <div className="font-medium">{opportunity.timeline}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 dark:text-gray-400">Potential Impact:</div>
                        <div className="font-medium">{opportunity.impact}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

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
                    <Award className="h-6 w-6 text-amber-500" />
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
      </div>
    </section>
  );
};

function getStatusStyle(status: string) {
  switch (status.toLowerCase()) {
    case 'contacted':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'negotiating':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'scheduled':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'pending':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
  }
}

function generatePartnershipData(businessName: string) {
  const healthcareProviders = {
    description: `Target healthcare clinics and medical practices that could benefit from integrating ${businessName} into their patient care protocols.`,
    targets: [
      {
        name: "Regional Medical Centers",
        status: "Contacted",
        timeline: "Q2 2024",
        value: "High"
      },
      {
        name: "Private Clinics Network",
        status: "Negotiating",
        timeline: "Q1 2024",
        value: "Medium"
      },
      {
        name: "University Health Systems",
        status: "Scheduled",
        timeline: "Q3 2024",
        value: "Very High"
      },
      {
        name: "Specialist Practitioner Groups",
        status: "Pending",
        timeline: "Q4 2024",
        value: "Medium"
      }
    ]
  };

  const insuranceCompanies = {
    description: `Partner with insurance providers to offer subsidized plans or premium discounts for active ${businessName} users.`,
    opportunities: [
      {
        name: "Wellness Program Integration",
        description: "Integrate with existing wellness rewards programs to offer premium discounts",
        timeline: "6-9 months",
        impact: "Potentially 10,000+ new users"
      },
      {
        name: "Employer Health Plans",
        description: "Partner with corporate health insurance plans as a value-added benefit",
        timeline: "3-6 months",
        impact: "Corporate partnerships"
      },
      {
        name: "Outcome-Based Coverage",
        description: "Develop metrics-based coverage where user achievements reduce premiums",
        timeline: "12+ months",
        impact: "Healthcare cost reduction data"
      },
      {
        name: "Prevention Programs",
        description: "Position as a preventive healthcare tool for chronic conditions",
        timeline: "9-12 months",
        impact: "Medical research opportunities"
      }
    ]
  };

  const influencers = {
    description: `Collaborate with relevant influencers who can authentically promote ${businessName} to their engaged audiences.`,
    targets: [
      {
        name: "Health & Wellness",
        platform: "Instagram/YouTube",
        audience: "1M+ followers"
      },
      {
        name: "Medical Professionals",
        platform: "LinkedIn/Twitter",
        audience: "Industry respect"
      },
      {
        name: "Transformation Stories",
        platform: "TikTok/Instagram",
        audience: "Authentic journeys"
      },
      {
        name: "Corporate Wellness",
        platform: "LinkedIn/Podcasts",
        audience: "B2B decision makers"
      },
      {
        name: "Fitness Experts",
        platform: "YouTube/Instagram",
        audience: "Dedicated followers"
      },
      {
        name: "Lifestyle Bloggers",
        platform: "Blogs/Instagram",
        audience: "High engagement"
      }
    ]
  };

  return { healthcareProviders, insuranceCompanies, influencers };
}

export default PartnershipPipeline;
