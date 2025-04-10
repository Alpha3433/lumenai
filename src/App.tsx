
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SwitchAccount from "./pages/SwitchAccount";
import AuthProvider from "./components/AuthProvider";
import ScrollProgressBar from "./components/ScrollProgressBar";
import WaitingList from "./pages/WaitingList";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import Analytics from "./pages/Analytics";
import ScheduleMeeting from "./pages/ScheduleMeeting";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollProgressBar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<WaitingList />} />
                <Route path="/home" element={<Index />} />
                <Route path="/create" element={<Create />} />
                <Route path="/generate-idea" element={<GenerateIdea />} />
                <Route path="/examples" element={<Examples />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/switch-account" element={<SwitchAccount />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-canceled" element={<PaymentCanceled />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
