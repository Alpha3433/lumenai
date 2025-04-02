
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { toast } from 'sonner';
import BrandLogo from '@/components/navigation/BrandLogo';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

type FormValues = z.infer<typeof formSchema>;

const WaitingList = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('You\'ve been added to our waiting list!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-950">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-4">
          <BrandLogo />
          <Link to="/home">
            <Button variant="ghost" size="sm" className="text-sm font-medium">
              Skip to Website <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </header>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xl rounded-xl overflow-hidden">
                <img
                  src="/lovable-uploads/509ee2b7-efe9-4fad-b69b-410f47de9875.png"
                  alt="Business Plan Builder Interface"
                  className="w-full h-auto"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-3 -right-3 z-10"
              >
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
                  Coming Soon
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-6">
              <Sparkles className="mr-1 h-4 w-4" /> 
              <span>Early Access</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
                AI-Powered
              </span>
              <span className="block">Business Plans</span>
              <span className="block">For Your Next Venture</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Transform your ideas into comprehensive business plans with our AI-powered platform. 
              Join our waiting list to be among the first to get access to our revolutionary tools.
            </p>

            {!isSubmitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-md space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300">
                          Email Address
                        </Label>
                        <FormControl>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Input
                              id="email"
                              placeholder="Your email address"
                              className="h-12 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                              {...field}
                            />
                            <Button
                              type="submit"
                              className="h-12 px-6 font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <div className="flex items-center">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> 
                                  <span>Joining...</span>
                                </div>
                              ) : "Join Waiting List"}
                            </Button>
                          </div>
                        </FormControl>
                        {form.formState.errors.email && (
                          <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
                        )}
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          We'll notify you when we launch. No spam, ever.
                        </p>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-5 max-w-md"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 bg-green-100 dark:bg-green-800/30 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-300 text-lg">You're on the list!</h3>
                    <p className="text-green-700 dark:text-green-400 mt-1">
                      Thank you for your interest! We'll notify you when we launch.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-10">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Why join our waiting list?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  "AI-powered insights",
                  "Market analysis",
                  "Investor-ready plans",
                  "Early access discount",
                  "Premium templates",
                  "Priority support"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <div className="shrink-0 bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WaitingList;
