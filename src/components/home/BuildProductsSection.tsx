
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';

const BuildProductsSection = () => {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleTryForFree = () => {
    if (!user) {
      openRegisterModal();
    }
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Build Products Your Users Love?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Turn feedback into your competitive edge—start today and test new ventures to see changes soon, signup today, and start impact. Don't miss this.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-10 mb-10">
            <h3 className="text-2xl font-bold mb-6">
              Get Actionable Insights from User Feedback
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Be part of a unique app that lets us build a business system that works for you.
            </p>
            
            {user ? (
              <Link to="/create">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md h-12 px-8 text-lg font-medium">
                  Try for FREE
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={handleTryForFree}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md h-12 px-8 text-lg font-medium"
              >
                Try for FREE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
            
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>30-Second Reports</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Business Templates</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onRegisterClick={openRegisterModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onLoginClick={openLoginModal}
      />
    </section>
  );
};

export default BuildProductsSection;
