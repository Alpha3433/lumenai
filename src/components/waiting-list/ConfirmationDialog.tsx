
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
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>What's next?</strong> We're currently building our platform and will be launching soon. You'll be among the first to get access to our business validation tools!
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                  85
                </div>
                <div className="text-sm">
                  <p className="font-medium">Business Validation Score</p>
                  <p className="text-xs text-gray-500">Data-driven insights for your startup</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Coming Soon</span>
            </div>
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
          <Button onClick={onClose} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full sm:w-auto border-none">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
