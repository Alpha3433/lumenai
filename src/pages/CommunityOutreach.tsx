
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CommunityOutreach = () => {
  const [generating, setGenerating] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [interviewType, setInterviewType] = useState('remote');
  const { toast } = useToast();

  const handleGeneratePosts = () => {
    setGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGenerating(false);
      toast({
        title: "Posts Generated",
        description: "Your community posts have been successfully generated and are ready for review.",
      });
    }, 2000);
  };

  const handleScheduleInterviews = () => {
    setGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGenerating(false);
      toast({
        title: "Interviews Scheduled",
        description: "Your outreach campaign has been set up. You'll be notified when interviews are confirmed.",
      });
    }, 2000);
  };

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30">
      <Navbar />
      
      <div className="container max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Outreach</h1>
          <p className="text-muted-foreground">Connect with potential users and relevant communities to validate your business idea.</p>
        </div>

        <Tabs defaultValue="auto-generate" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="auto-generate">Auto-Generate Posts</TabsTrigger>
            <TabsTrigger value="schedule-interviews">Schedule User Interviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="auto-generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Community Posts</CardTitle>
                <CardDescription>
                  Create engaging posts for relevant online communities to gather feedback and attract potential users.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select platforms</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Reddit', 'Twitter', 'LinkedIn', 'Facebook', 'Discord', 'Product Hunt'].map((platform) => (
                      <Button 
                        key={platform}
                        type="button" 
                        variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                        onClick={() => togglePlatform(platform)}
                        className="h-9"
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="business-description">Business Description</Label>
                  <Textarea 
                    id="business-description" 
                    placeholder="Describe your business idea or product briefly..." 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Input 
                    id="target-audience" 
                    placeholder="Describe your target audience" 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="post-goal">Goal of your posts</Label>
                  <Select>
                    <SelectTrigger id="post-goal">
                      <SelectValue placeholder="What do you want to achieve?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feedback">Collect feedback on idea</SelectItem>
                      <SelectItem value="validate">Validate problem</SelectItem>
                      <SelectItem value="early-users">Find early users</SelectItem>
                      <SelectItem value="interviews">Find interview candidates</SelectItem>
                      <SelectItem value="attention">Create buzz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleGeneratePosts} 
                  disabled={generating || selectedPlatforms.length === 0}
                  className="w-full"
                >
                  {generating ? "Generating..." : "Generate Posts"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule-interviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule User Interviews</CardTitle>
                <CardDescription>
                  Set up interviews with potential users to gather insights and validate your business idea.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="interview-goal">Interview Goal</Label>
                  <Select>
                    <SelectTrigger id="interview-goal">
                      <SelectValue placeholder="Select interview purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="problem">Problem validation</SelectItem>
                      <SelectItem value="solution">Solution feedback</SelectItem>
                      <SelectItem value="product">Product testing</SelectItem>
                      <SelectItem value="pricing">Pricing strategy</SelectItem>
                      <SelectItem value="user-experience">User experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interview-type">Interview Type</Label>
                  <div className="flex gap-2 mt-1">
                    <Button 
                      type="button" 
                      variant={interviewType === 'remote' ? "default" : "outline"}
                      onClick={() => setInterviewType('remote')}
                      className="flex-1"
                    >
                      Remote
                    </Button>
                    <Button 
                      type="button" 
                      variant={interviewType === 'in-person' ? "default" : "outline"}
                      onClick={() => setInterviewType('in-person')}
                      className="flex-1"
                    >
                      In-Person
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="user-criteria">User Criteria</Label>
                  <Textarea 
                    id="user-criteria" 
                    placeholder="Describe the type of users you want to interview..." 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Available Interview Dates</Label>
                  <div className="border rounded-md p-4 flex items-center justify-center">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <Calendar className="h-10 w-10 mb-2" />
                      <p className="text-sm">Please select available dates on the calendar</p>
                      <Button variant="outline" className="mt-2">
                        Open Calendar
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="interview-questions">Sample Questions</Label>
                  <Textarea 
                    id="interview-questions" 
                    placeholder="What questions would you like to ask?" 
                    className="mt-1"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleScheduleInterviews} 
                  disabled={generating}
                  className="w-full"
                >
                  {generating ? "Setting Up..." : "Schedule Interviews"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityOutreach;
