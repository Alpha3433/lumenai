
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BusinessInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refinedName: string;
  setRefinedName: (name: string) => void;
  refinedDescription: string;
  setRefinedDescription: (description: string) => void;
  onSave: () => void;
}

const BusinessInfoDialog: React.FC<BusinessInfoDialogProps> = ({
  open,
  onOpenChange,
  refinedName,
  setRefinedName,
  refinedDescription,
  setRefinedDescription,
  onSave
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Refine Business Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium mb-1">Business Name</label>
            <Input 
              id="businessName" 
              value={refinedName} 
              onChange={(e) => setRefinedName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="businessDescription" className="block text-sm font-medium mb-1">Business Description</label>
            <Textarea 
              id="businessDescription" 
              value={refinedDescription} 
              onChange={(e) => setRefinedDescription(e.target.value)}
              className="w-full min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessInfoDialog;
