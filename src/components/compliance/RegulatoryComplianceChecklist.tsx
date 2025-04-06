
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';

interface RegulatoryComplianceChecklistProps {
  businessName: string;
  businessDescription: string;
}

const RegulatoryComplianceChecklist: React.FC<RegulatoryComplianceChecklistProps> = ({
  businessName,
  businessDescription
}) => {
  const { hipaaCompliance, gdprCompliance, fdaGuidelines } = generateComplianceData(businessName, businessDescription);
  
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
        {/* HIPAA Compliance */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold">HIPAA Compliance</h3>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded">
                {hipaaCompliance.criticality}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{hipaaCompliance.description}</p>
            
            <div className="space-y-3">
              {hipaaCompliance.requirements.map((req, index) => (
                <div key={index} className="border border-indigo-100 dark:border-indigo-800/50 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg p-3">
                  <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1">{req.name}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{req.description}</p>
                </div>
              ))}
            </div>
            
            {hipaaCompliance.resources && (
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>Resources:</span>
                  <div className="flex items-center gap-2">
                    {hipaaCompliance.resources.map((resource, i) => (
                      <a key={i} href="#" className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline">
                        {resource} <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* GDPR Compliance */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold">GDPR Compliance</h3>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded">
                {gdprCompliance.criticality}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{gdprCompliance.description}</p>
            
            <div className="space-y-3">
              {gdprCompliance.requirements.map((req, index) => (
                <div key={index} className="border border-blue-100 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">{req.name}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{req.description}</p>
                </div>
              ))}
            </div>
            
            {gdprCompliance.resources && (
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>Resources:</span>
                  <div className="flex items-center gap-2">
                    {gdprCompliance.resources.map((resource, i) => (
                      <a key={i} href="#" className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline">
                        {resource} <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* FDA Guidelines */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-lg font-semibold">FDA Guidelines</h3>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-semibold px-2.5 py-0.5 rounded">
                {fdaGuidelines.criticality}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{fdaGuidelines.description}</p>
            
            <div className="space-y-3">
              {fdaGuidelines.requirements.map((req, index) => (
                <div key={index} className="border border-amber-100 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10 rounded-lg p-3">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-1">{req.name}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{req.description}</p>
                </div>
              ))}
            </div>
            
            {fdaGuidelines.resources && (
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>Resources:</span>
                  <div className="flex items-center gap-2">
                    {fdaGuidelines.resources.map((resource, i) => (
                      <a key={i} href="#" className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline">
                        {resource} <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

function generateComplianceData(businessName: string, businessDescription: string) {
  // This function would ideally use AI to generate compliance data based on the business description
  // For now, we'll use some basic logic based on the business description
  
  const isHealthBusiness = businessDescription.toLowerCase().includes('health') || 
                         businessDescription.toLowerCase().includes('fitness') || 
                         businessDescription.toLowerCase().includes('wellness');
  
  const isDataBusiness = businessDescription.toLowerCase().includes('data') || 
                       businessDescription.toLowerCase().includes('analytics') || 
                       businessDescription.toLowerCase().includes('information');
  
  const isFinanceBusiness = businessDescription.toLowerCase().includes('finance') || 
                          businessDescription.toLowerCase().includes('payment') || 
                          businessDescription.toLowerCase().includes('banking');

  // HIPAA Compliance
  const hipaaCompliance = {
    criticality: isHealthBusiness ? "CRITICAL" : "CONDITIONAL",
    description: isHealthBusiness 
      ? "Health Insurance Portability and Accountability Act regulations are essential for your health-related business. Strict compliance is required for all health data."
      : "If you collect any health-related information, even indirectly, HIPAA compliance may be required.",
    requirements: [
      {
        name: "Data Encryption",
        description: "All health data must be encrypted at rest and during transmission using industry-standard protocols."
      },
      {
        name: "Access Controls",
        description: "Role-based access controls for staff and limited data access based on necessity."
      },
      {
        name: "Security Audits",
        description: "Regular security audits and vulnerability assessments must be conducted."
      },
      {
        name: "Breach Notification Plan",
        description: "Protocol for notifying users of any data breaches within required timeframes."
      }
    ],
    resources: [
      "HHS.gov HIPAA Guidelines",
      "NIST Security Framework"
    ]
  };
  
  // GDPR Compliance
  const gdprCompliance = {
    criticality: "REQUIRED",
    description: "General Data Protection Regulation requirements for handling EU users' data and privacy. These regulations apply to any business with EU customers.",
    requirements: [
      {
        name: "Cookie Consent",
        description: "Clear consent mechanism for cookie use and data collection."
      },
      {
        name: "EU Data Storage",
        description: isDataBusiness ? "EU user data must be stored on EU-based servers or with appropriate safeguards and legal frameworks." : "EU user data requires special handling and appropriate safeguards."
      },
      {
        name: "Right to be Forgotten",
        description: "Mechanism for users to request deletion of their personal data."
      },
      {
        name: "Privacy Policy",
        description: "Comprehensive privacy policy explaining all data collection and usage."
      }
    ],
    resources: [
      "EU GDPR Portal",
      "ICO Guidelines"
    ]
  };
  
  // FDA Guidelines
  const fdaGuidelines = {
    criticality: isHealthBusiness ? "REQUIRED" : "CONDITIONAL",
    description: isHealthBusiness 
      ? "Food and Drug Administration regulations for health-related applications and services. Compliance is mandatory for your health business."
      : "These guidelines may apply if your product makes health-related claims or could be considered a digital health product.",
    requirements: [
      {
        name: "Medical Advice Disclaimers",
        description: "Clear disclaimers that the app is not providing medical advice."
      },
      {
        name: "Doctor Consultation Prompts",
        description: "Recommendations to consult healthcare providers before following advice."
      },
      {
        name: "Medical Device Classification",
        description: "Ensure app is not classified as a medical device requiring FDA approval, or obtain necessary approvals."
      },
      {
        name: isFinanceBusiness ? "Financial Disclaimers" : "Health Claims Substantiation",
        description: isFinanceBusiness 
          ? "Clear statements regarding financial information and not providing financial advice."
          : "Scientific evidence must back any health-related claims made by the product."
      }
    ],
    resources: [
      "FDA Digital Health Policies",
      "Mobile Medical Applications Guidance"
    ]
  };

  return { hipaaCompliance, gdprCompliance, fdaGuidelines };
}

export default RegulatoryComplianceChecklist;
