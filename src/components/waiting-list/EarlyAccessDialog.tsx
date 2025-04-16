
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Percent } from 'lucide-react';

interface EarlyAccessDialogProps {
  open: boolean;
  onClose: () => void;
}

const EarlyAccessDialog = ({ open, onClose }: EarlyAccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <Sparkles className="h-12 w-12 text-blue-500" />
          </div>
          <DialogTitle className="text-center text-xl">Early Access Special Offer</DialogTitle>
          <DialogDescription className="text-center">
            Unlock exclusive benefits by joining our early access program!
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-blue-800 dark:text-blue-300">Limited Time Discount</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">50% OFF</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
            First 100 early access members get half off our Pro Plan for the first year.
          </p>
        </div>
        
        <div className="space-y-4">
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Exclusive early access to platform features</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Priority support from our expert team</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Personalized business building consultation</span>
            </li>
          </ul>
          
          <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
            Join Early Access Program
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyAccessDialog;

