
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GenerateReport = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-20 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Generate a Business Report</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Here you can generate detailed and professional business reports powered by our AI tools. This section is coming soon!
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default GenerateReport;
