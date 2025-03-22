
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, TrendingUp, BarChart3, Target, Users, LightbulbIcon, Compass, Globe, CheckCircle, Clock, Box, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  // Core features data
  const coreFeatures = [
    {
      title: "Niche Discovery",
      description: "Identify rising niches with +200% search growth using data from Google Trends, Reddit, and Shopify.",
      icon: <Search className="h-6 w-6" />
    },
    {
      title: "Competitor Gap Analysis",
      description: "Analyze top 3 competitors and highlight underserved customer pain points to find your edge.",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "AI Report Generation",
      description: "Get a 1-page summary with niche demand, competition score, and 3 actionable steps to enter the market.",
      icon: <BarChart3 className="h-6 w-6" />
    }
  ];

  // Analysis tools data
  const analysisTools = [
    {
      title: "Idea Viability Score",
      description: "Evaluate your idea's chances of success with a clear, actionable score based on market data and competitive analysis.",
      icon: <LightbulbIcon className="h-6 w-6" />,
      features: ["Market size assessment", "Competition intensity score", "Profit potential calculation"]
    },
    {
      title: "Key Market Metrics",
      description: "Get critical data to understand demand, competition, and opportunities with real-time metrics and trend analysis.",
      icon: <BarChart3 className="h-6 w-6" />,
      features: ["Search volume trends", "Growth rate projections", "Seasonal demand patterns"]
    },
    {
      title: "Competitor Analysis",
      description: "Analyze competitors to identify opportunities and refine your strategy with detailed strengths and weaknesses assessment.",
      icon: <Target className="h-6 w-6" />,
      features: ["Pricing strategy comparison", "Feature gap identification", "Market positioning map"]
    },
    {
      title: "Customer Pain Points",
      description: "Identify the challenges your audience faces to craft better solutions and create products that truly resonate.",
      icon: <Users className="h-6 w-6" />,
      features: ["Social media sentiment analysis", "Review mining insights", "Customer journey friction points"]
    },
    {
      title: "Growth Strategy",
      description: "Get tailored strategies to grow your business effectively with stage-appropriate tactics and milestones.",
      icon: <TrendingUp className="h-6 w-6" />,
      features: ["Revenue projection models", "Marketing channel recommendations", "Scaling timeline roadmap"]
    },
    {
      title: "Trending SEO Keywords",
      description: "Discover keywords to improve search rankings and attract the right audience with volume and competition data.",
      icon: <Globe className="h-6 w-6" />,
      features: ["Low-competition keyword opportunities", "Rising search trend alerts", "Content gap suggestions"]
    }
  ];
  
  // Stats data
  const stats = [
    {
      value: "92%",
      label: "Prediction Accuracy",
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      value: "30s",
      label: "Report Generation",
      icon: <Clock className="h-6 w-6" />
    },
    {
      value: "3x",
      label: "More Data Sources",
      icon: <Box className="h-6 w-6" />
    },
    {
      value: "87%",
      label: "Success Rate",
      icon: <Zap className="h-6 w-6" />
    }
  ];
  
  // FAQ data
  const faqs = [
    {
      question: "How accurate are our AI predictions?",
      answer: "Our algorithm delivers 92% accuracy in predicting profitable niches, compared to the industry average of 67%. We combine data from multiple sources for unmatched precision."
    },
    {
      question: "How long does it take to generate a business report?",
      answer: "Most reports are generated in under 30 seconds, giving you instant insights to make informed decisions quickly."
    },
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes 2 niche reports per month, basic market analysis, and competitor insights. No credit card required to get started."
    },
    {
      question: "How does our AI find profitable niches?",
      answer: "We analyze search trends, social media conversations, and market data to identify growing niches with high demand and low competition."
    },
    {
      question: "Can I use this platform for any industry?",
      answer: "Yes, our platform works across virtually all industries and market segments, from e-commerce to B2B services."
    },
    {
      question: "Do I need technical skills to use this platform?",
      answer: "No technical skills required. Our user-friendly interface is designed for entrepreneurs and business owners, not data scientists."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Core Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to validate your business idea in minutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Comprehensive Analysis Tools */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Comprehensive Analysis Tools</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to validate, launch, and grow your business idea
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisTools.map((tool, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                        {tool.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{tool.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
                    <ul className="mt-4 space-y-2">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our advanced algorithm outperforms competitors across key metrics
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-800 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 mt-8">
            <h3 className="text-2xl font-bold mb-4">Superior Prediction Accuracy</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our algorithm delivers 92% accuracy in predicting profitable niches, compared to the industry average of 67%. 
              Our multi-source data analysis combines trends from Google, Reddit, and e-commerce platforms for unmatched precision.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>92% accuracy in trend prediction</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Multi-source data validation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Advanced pattern recognition</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Curious about our platform? We've got you covered!
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-gray-600 dark:text-gray-300 mt-4 group-open:animate-fadeIn">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-12 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to discover your profitable niche?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Start generating data-driven business insights today and validate your ideas in minutes.
            </p>
            <Link to="/create">
              <Button className="bg-black hover:bg-black/90 text-white rounded-md h-12 px-8 text-base font-medium">
                Try for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required. 2 free reports per month.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
