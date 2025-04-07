
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowRight, CheckCircle, HelpCircle, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface PartnerApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PartnerApplicationModal: React.FC<PartnerApplicationModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleSubmit = () => {
    toast.success("Application submitted successfully! Our team will review your application within 2 business days.");
    onOpenChange(false);
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white dark:bg-gray-900">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold">Partner Program Application</DialogTitle>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                  <div className={`flex items-center gap-1 ${step >= 1 ? "text-blue-600 dark:text-blue-400" : ""}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}>1</div>
                    <span className="hidden sm:inline">Eligibility</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300 dark:bg-gray-700"></div>
                  <div className={`flex items-center gap-1 ${step >= 2 ? "text-blue-600 dark:text-blue-400" : ""}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}>2</div>
                    <span className="hidden sm:inline">Business Details</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300 dark:bg-gray-700"></div>
                  <div className={`flex items-center gap-1 ${step >= 3 ? "text-blue-600 dark:text-blue-400" : ""}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}>3</div>
                    <span className="hidden sm:inline">Confirmation</span>
                  </div>
                </div>
              </div>
              <DialogDescription className="pt-2 text-gray-600 dark:text-gray-400">
                {step === 1 && "Please review our eligibility requirements before proceeding."}
                {step === 2 && "Tell us more about your business to determine your revenue share rate."}
                {step === 3 && "Review your application details before submitting."}
              </DialogDescription>
            </DialogHeader>

            {step === 1 && (
              <div className="mt-6 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    Eligibility Requirements
                    <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                      Required to qualify
                    </span>
                  </h3>
                  
                  <div className="space-y-6 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                    <div className="relative">
                      <h4 className="text-md font-medium flex items-center">
                        Minimum Revenue Threshold 
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" className="h-auto p-0 ml-1">
                              <HelpCircle className="h-4 w-4 text-gray-500" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <p className="text-sm">
                              We require proof of revenue to ensure we're partnering with businesses that have market validation and can realistically scale.
                            </p>
                          </PopoverContent>
                        </Popover>
                      </h4>
                      <div className="mt-2 ml-6 text-sm text-gray-600 dark:text-gray-400">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Minimum $500/month in recurring revenue</li>
                          <li>Must provide verification (Stripe/PayPal screenshots or bank statements)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-medium">Business Age</h4>
                      <div className="mt-2 ml-6 text-sm text-gray-600 dark:text-gray-400">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Must be operational for 6+ months</li>
                          <li>Verifiable online presence or business registration</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-medium">Industry Focus</h4>
                      <div className="mt-2 ml-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="mb-2">We prioritize businesses in these high-margin categories:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Digital Products</span>
                          </div>
                          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>SaaS</span>
                          </div>
                          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Coaching & Services</span>
                          </div>
                          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>E-Commerce (10+ SKUs)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Tiered Revenue Sharing</h3>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                          <th className="py-3 px-4 text-left">Monthly Revenue</th>
                          <th className="py-3 px-4 text-left">Revenue Share %</th>
                          <th className="py-3 px-4 text-left">Monthly Cap</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="py-3 px-4">$500–$2,000/month</td>
                          <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">15%</td>
                          <td className="py-3 px-4">$300/month</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">$2,001–$5,000/month</td>
                          <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">12%</td>
                          <td className="py-3 px-4">$499/month</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">$5,000+/month</td>
                          <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">8%</td>
                          <td className="py-3 px-4">$799/month</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Program Requirements</h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg space-y-4">
                    <div>
                      <h4 className="text-md font-medium">Performance Tracking</h4>
                      <div className="mt-2 ml-6 text-sm text-gray-600 dark:text-gray-400">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Must connect Stripe/PayPal/Shopify accounts for automated revenue tracking</li>
                          <li>Submit monthly 5-minute revenue update videos</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-medium">Probationary Period</h4>
                      <div className="mt-2 ml-6 text-sm text-gray-600 dark:text-gray-400">
                        <ul className="list-disc pl-4 space-y-1">
                          <li>First 3 months: If revenue falls below $300/month, automatic conversion to Pathfinder tier ($19.99/month)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">Performance-Based Upsells (Optional)</p>
                        <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                          "Profit Accelerator" Package: 5% additional revenue share for done-for-you ad optimization, high-converting landing page setup, and email funnel automation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-6 space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    This form collects information to verify your eligibility. All documents will be reviewed by our team.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      placeholder="Your Business Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Website</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      placeholder="https://yourbusiness.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Industry</label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                      <option value="">Select your industry</option>
                      <option value="digital-products">Digital Products</option>
                      <option value="saas">SaaS</option>
                      <option value="coaching">Coaching & Services</option>
                      <option value="ecommerce">E-Commerce</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Monthly Revenue</label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                      <option value="">Select monthly revenue range</option>
                      <option value="500-2000">$500 - $2,000</option>
                      <option value="2001-5000">$2,001 - $5,000</option>
                      <option value="5001+">$5,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Revenue Proof (Screenshots or Statements)
                    </label>
                    <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Drag and drop files here or click to upload
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm rounded-md transition-colors"
                      >
                        Upload Files
                      </button>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Accepts PNG, JPG, or PDF up to 10MB
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Age</label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                      <option value="">How long has your business been operating?</option>
                      <option value="0-6">Less than 6 months</option>
                      <option value="6-12">6-12 months</option>
                      <option value="1-2">1-2 years</option>
                      <option value="2+">2+ years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-6 space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-green-800 dark:text-green-300">Ready to Submit Your Application</h3>
                  <p className="text-green-700 dark:text-green-400 mt-2 max-w-lg mx-auto">
                    Once submitted, our team will review your application within 2 business days and reach out via email.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                  <h4 className="text-md font-medium mb-4">What happens next?</h4>
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/40 w-6 h-6 rounded-full flex items-center justify-center text-sm text-blue-800 dark:text-blue-300 flex-shrink-0">1</div>
                      <div className="text-sm">Our team reviews your application (1-2 business days)</div>
                    </li>
                    <li className="flex gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/40 w-6 h-6 rounded-full flex items-center justify-center text-sm text-blue-800 dark:text-blue-300 flex-shrink-0">2</div>
                      <div className="text-sm">If approved, you'll receive an onboarding email with next steps</div>
                    </li>
                    <li className="flex gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/40 w-6 h-6 rounded-full flex items-center justify-center text-sm text-blue-800 dark:text-blue-300 flex-shrink-0">3</div>
                      <div className="text-sm">Connect your payment processor for revenue tracking</div>
                    </li>
                    <li className="flex gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/40 w-6 h-6 rounded-full flex items-center justify-center text-sm text-blue-800 dark:text-blue-300 flex-shrink-0">4</div>
                      <div className="text-sm">Schedule an onboarding call with your dedicated success manager</div>
                    </li>
                  </ol>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      I understand and agree to the Partner Program terms, including the revenue sharing agreement, 
                      3-month probationary period, and monthly revenue requirements.
                    </span>
                  </label>
                </div>
              </div>
            )}
            
            <DialogFooter className="mt-8 flex justify-between items-center">
              {step > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(prev => (prev === 2 ? 1 : 2) as 1 | 2 | 3)}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {step === 3 ? (
                <Button onClick={handleSubmit}>
                  Submit Application
                </Button>
              ) : (
                <Button onClick={() => setStep(prev => (prev === 1 ? 2 : 3) as 1 | 2 | 3)}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </DialogFooter>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerApplicationModal;
