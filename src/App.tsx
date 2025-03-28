
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Create from "./pages/Create";
import GenerateIdea from "./pages/GenerateIdea";
import Examples from "./pages/Examples";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import MarketTrends from "./pages/MarketTrends";
import Settings from "./pages/Settings";
import AuthProvider from "./components/AuthProvider";
import ScrollProgressBar from "./components/ScrollProgressBar";
import AdminTest from "./pages/AdminTest";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <ScrollProgressBar />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/generate-idea" element={<GenerateIdea />} />
                  <Route path="/examples" element={<Examples />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/market-trends" element={<MarketTrends />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin-test" element={<AdminTest />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
