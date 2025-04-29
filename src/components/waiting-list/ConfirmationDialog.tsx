
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmationDialog = ({ open, onClose }: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Thank you for joining!</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            You've successfully joined our waiting list. We'll notify you as soon as we launch.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>What's next?</strong> We're currently building our platform and will be launching soon. You'll be among the first to know!
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Follow us for updates:</p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="px-3 py-1 h-auto text-xs">
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="px-3 py-1 h-auto text-xs">
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="px-3 py-1 h-auto text-xs">
                Facebook
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
