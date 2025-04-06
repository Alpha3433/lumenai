
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, AlertTriangle, TrendingDown, Server } from 'lucide-react';

interface RiskMitigationPlaybookProps {
  businessName: string;
  businessDescription: string;
}

const RiskMitigationPlaybook: React.FC<RiskMitigationPlaybookProps> = ({
  businessName,
  businessDescription
}) => {
  const risks = generateRiskMitigationStrategies(businessName);

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center mb-6 relative">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Risk Mitigation Playbook
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full mt-1">
          Preparing for potential challenges
        </div>
      </div>

      <div className="space-y-6">
        {risks.map((risk, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-full ${getRiskLevelStyle(risk.severity)}`}>
                  {getRiskIcon(risk.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{risk.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category: {risk.category}</span>
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
                    <span className={`text-sm font-medium ${getRiskSeverityTextStyle(risk.severity)}`}>
                      {risk.severity} Risk
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-gray-700 dark:text-gray-300">{risk.description}</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>Early Warning Signs</span>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 dark:text-gray-300 ml-2">
                    {risk.warningSignals.map((signal, i) => (
                      <li key={i}>{signal}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="font-medium mb-2 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-green-500" />
                    <span>Mitigation Strategy</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-sm">
                    <div className="text-gray-700 dark:text-gray-300">{risk.mitigation}</div>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>Contingency Plan</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-sm">
                    <div className="text-gray-700 dark:text-gray-300">{risk.contingency}</div>
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

function getRiskIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'technology':
      return <Server className="h-5 w-5" />;
    case 'market':
      return <TrendingDown className="h-5 w-5" />;
    case 'user':
      return <AlertTriangle className="h-5 w-5" />;
    default:
      return <ShieldAlert className="h-5 w-5" />;
  }
}

function getRiskLevelStyle(severity: string) {
  switch (severity.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case 'medium':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    case 'low':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
}

function getRiskSeverityTextStyle(severity: string) {
  switch (severity.toLowerCase()) {
    case 'high':
      return 'text-red-600 dark:text-red-400';
    case 'medium':
      return 'text-amber-600 dark:text-amber-400';
    case 'low':
      return 'text-green-600 dark:text-green-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
}

function generateRiskMitigationStrategies(businessName: string) {
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
      mitigation: `Implement redundant server architecture with automatic failover capabilities. Establish comprehensive backup systems with daily snapshots and real-time data mirroring. Maintain 24/7 technical support team with defined incident response protocols.`,
      contingency: `If systems fail, trigger automatic rollback to last stable version. Communicate transparently with users about the issue and expected resolution timeline. Activate emergency support team to provide manual workarounds if necessary.`
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
      mitigation: `Implement robust analytics to identify at-risk users before they churn. Create automated re-engagement campaigns triggered by inactivity. Establish a continuous feedback loop with users to address pain points quickly.`,
      contingency: `If retention drops below target thresholds, trigger win-back campaign offering incentives like free premium features or coaching sessions. Conduct exit surveys to identify systemic issues and address root causes. Accelerate planned feature releases that address common churn reasons.`
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
      mitigation: `Maintain dedicated team for competitive intelligence and emerging technology monitoring. Allocate 20% of development resources to experimental features and future-focused capabilities. Build flexibility into the platform architecture to allow rapid pivoting.`,
      contingency: `If market shifts toward wearable technology dominance, pivot to API-first strategy focusing on integration capabilities. If new competitors gain traction with novel features, accelerate partnership strategy to maintain market position. Create acquisition strategy for complementary technologies that could fill emerging gaps.`
    }
  ];
}

export default RiskMitigationPlaybook;
