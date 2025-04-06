
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, CheckSquare, AlertTriangle } from 'lucide-react';

interface RegulatoryComplianceChecklistProps {
  businessName: string;
  businessDescription: string;
}

const RegulatoryComplianceChecklist: React.FC<RegulatoryComplianceChecklistProps> = ({
  businessName,
  businessDescription
}) => {
  const complianceAreas = generateComplianceAreas(businessName);

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Regulatory Compliance Checklist
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Legal and regulatory considerations
        </div>
      </div>

      <div className="space-y-6">
        {complianceAreas.map((area, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-full ${area.critical ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                  {area.critical ? <AlertTriangle className="h-5 w-5" /> : <CheckSquare className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{area.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{area.description}</p>
                </div>
                <div className="ml-auto">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    area.critical 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {area.critical ? 'CRITICAL' : 'REQUIRED'}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-2">
                {area.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-200 dark:border-gray-800">
                    <CheckSquare className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{req.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{req.details}</div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {area.resources && (
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
                  <div className="text-sm font-medium mb-2">Resources:</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    {area.resources}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

function generateComplianceAreas(businessName: string) {
  return [
    {
      name: "HIPAA Compliance",
      description: "Health Insurance Portability and Accountability Act regulations for health data security",
      critical: true,
      requirements: [
        {
          name: "Data Encryption",
          details: "All health data must be encrypted at rest and during transmission using industry-standard protocols"
        },
        {
          name: "Access Controls",
          details: "Role-based access controls for staff and limited data access based on necessity"
        },
        {
          name: "Security Audits",
          details: "Regular security audits and vulnerability assessments"
        },
        {
          name: "Breach Notification Plan",
          details: "Protocol for notifying users of any data breaches within required timeframes"
        }
      ],
      resources: "HHS.gov HIPAA Guidelines, NIST Security Framework"
    },
    {
      name: "GDPR Compliance",
      description: "General Data Protection Regulation for EU users' data privacy",
      critical: false,
      requirements: [
        {
          name: "Cookie Consent",
          details: "Clear consent mechanism for cookie use and data collection"
        },
        {
          name: "EU Data Storage",
          details: "EU user data stored on EU-based servers or with appropriate safeguards"
        },
        {
          name: "Right to be Forgotten",
          details: "Mechanism for users to request deletion of their personal data"
        },
        {
          name: "Privacy Policy",
          details: "Comprehensive privacy policy explaining all data collection and usage"
        }
      ],
      resources: "EU GDPR Portal, ICO Guidelines"
    },
    {
      name: "FDA Guidelines",
      description: "Food and Drug Administration regulations for health-related apps",
      critical: false,
      requirements: [
        {
          name: "Medical Advice Disclaimers",
          details: "Clear disclaimers that the app is not providing medical advice"
        },
        {
          name: "Doctor Consultation Prompts",
          details: "Recommendations to consult healthcare providers before following advice"
        },
        {
          name: "Medical Device Classification",
          details: "Ensure app is not classified as a medical device requiring FDA approval"
        }
      ],
      resources: "FDA Digital Health Policies, Mobile Medical Applications Guidance"
    }
  ];
}

export default RegulatoryComplianceChecklist;
