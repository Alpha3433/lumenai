
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmationDialog = ({ open, onClose }: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-500" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold">You're on the waitlist!</DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Thank you for joining our waiting list. We'll notify you when we launch our AI-powered startup validation platform!
          </p>
          <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white w-full">
            Close
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You can always unsubscribe from our emails if you change your mind.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
