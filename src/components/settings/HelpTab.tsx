
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const HelpTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Help & Support</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
          <div className="space-y-2">
            <p className="font-medium">How do I create a new business plan?</p>
            <p className="text-muted-foreground">Navigate to the Create page and follow the step-by-step guide to create your business plan.</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">How can I export my business plan?</p>
            <p className="text-muted-foreground">Once your plan is complete, use the export button on the dashboard to download it in PDF format.</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Contact Support</h3>
            <p className="text-muted-foreground mb-4">Need more help? Our support team is here for you.</p>
            <Button variant="outline">Contact Support</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpTab;
