
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PlanTemplate from '@/components/PlanTemplate';
import Testimonial from '@/components/Testimonial';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, LineChart, FileCheck, ArrowUpRight, Sparkles, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Sample template data
  const templates = [
    {
      title: "Tech Startup Plan",
      description: "Perfect for software, SaaS, and technology startups looking to secure funding.",
      imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Technology",
      popular: true
    },
    {
      title: "E-commerce Business",
      description: "Comprehensive plan for online retail businesses targeting digital consumers.",
      imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Retail",
      popular: false
    },
    {
      title: "Service Business",
      description: "Structured plan for consulting, professional services, and B2B service providers.",
      imageSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Services",
      popular: false
    },
    {
      title: "Restaurant & Food",
      description: "Specialized plan for restaurants, cafes, food trucks, and culinary businesses.",
      imageSrc: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      category: "Food",
      popular: true
    }
  ];

  // Sample testimonial data
  const testimonials = [
    {
      content: "Visionary Plans transformed my business idea into a comprehensive plan that helped secure our first round of funding. The AI-generated insights were remarkably accurate and saved us weeks of research.",
      author: "Sarah Johnson",
      role: "Founder, TechNova",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      content: "As someone with no business background, I was intimidated by the idea of creating a business plan. This platform made it incredibly easy and produced a professional document that impressed my potential partners.",
      author: "Michael Chen",
      role: "Entrepreneur",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      content: "The market analysis section was particularly valuable for our retail business. It provided insights we hadn't considered and helped us pivot our strategy before launch, potentially saving us from a costly mistake.",
      author: "Emma Rodriguez",
      role: "Co-founder, Urban Retail",
      rating: 4,
      imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <Features />
      
      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Visionary Plans Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create a professional business plan in minutes using our AI-powered platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileCheck className="w-8 h-8 text-primary" />
                <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">1</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Your Details</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fill out a simple form with information about your business idea, goals, and target market.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Sparkles className="w-8 h-8 text-primary" />
                <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">2</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our advanced AI analyzes your inputs and generates a comprehensive business plan with all necessary sections.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Download className="w-8 h-8 text-primary" />
                <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">3</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Download & Use</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Review your customized business plan, make any adjustments, and download it in PDF format ready for presentation.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/create">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 px-8 text-base font-medium">
                Create Your Plan Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Templates */}
      <section id="templates" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
              Ready-to-Use Templates
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Plan Templates</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Jump-start your planning with our industry-specific templates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <PlanTemplate 
                key={index}
                title={template.title}
                description={template.description}
                imageSrc={template.imageSrc}
                category={template.category}
                popular={template.popular}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="rounded-full h-12 px-8 text-base font-medium border-gray-300 dark:border-gray-700">
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <p className="text-blue-100">Business Plans Generated</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">85%</div>
              <p className="text-blue-100">Success Rate for Funding</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">25+</div>
              <p className="text-blue-100">Industry Templates</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
              Client Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from entrepreneurs who have transformed their ideas into successful businesses with our help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                content={testimonial.content}
                author={testimonial.author}
                role={testimonial.role}
                rating={testimonial.rating}
                imageSrc={testimonial.imageSrc}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to turn your vision into reality?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Create a professional business plan today and take the first step toward building your successful business.
            </p>
            <Link to="/create">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-full h-12 px-8 text-base font-medium shadow-lg">
                Start Creating Your Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
