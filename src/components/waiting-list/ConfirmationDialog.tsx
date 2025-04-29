
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
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, BarChart3, TrendingUp } from 'lucide-react';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmationDialog = ({ open, onClose }: ConfirmationDialogProps) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" /> 
                Thanks for joining our waitlist!
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-2 text-base">
                You're now in line for early access to our powerful validation tools.
              </DialogDescription>
            </DialogHeader>
            
            <div className="px-6 py-2 space-y-5">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-5">
                <h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-1.5">
                  <CheckCircle className="h-5 w-5 text-blue-600" /> 
                  You'll be among the first to:
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      icon: <BarChart3 className="h-4 w-4 text-blue-600" />,
                      title: "Access Validation Score Reports",
                      desc: "Get comprehensive analysis of your startup idea"
                    },
                    {
                      icon: <TrendingUp className="h-4 w-4 text-purple-600" />,
                      title: "Discover Profitable Niche Markets",
                      desc: "Find untapped opportunities with growth potential"
                    },
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                    >
                      <div className="mt-1 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <motion.div 
                className="grid grid-cols-2 gap-4 py-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="text-3xl font-bold text-blue-700">85</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="text-3xl font-bold text-purple-700">7</div>
                  <div className="text-sm text-gray-600">Days to Launch</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm font-semibold text-gray-700">Follow us for updates:</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="px-4 py-1 h-auto bg-white hover:bg-gray-50 border-gray-200">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="px-4 py-1 h-auto bg-white hover:bg-gray-50 border-gray-200">
                    LinkedIn
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <DialogFooter className="p-6 pt-2">
              <Button 
                onClick={onClose} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Got it, thanks!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;
