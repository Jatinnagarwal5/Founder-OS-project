"use client";

import React from "react";
import AutoFlowNavbar from "@/components/autoflow/AutoFlowNavbar";
import AutoFlowHero from "@/components/autoflow/AutoFlowHero";
import TrustedLogos from "@/components/autoflow/TrustedLogos";
import ProblemStatement from "@/components/autoflow/ProblemStatement";
import HowItWorks from "@/components/autoflow/HowItWorks";
import WorkflowAnalyzer from "@/components/autoflow/WorkflowAnalyzer";
import ROICalculator from "@/components/autoflow/ROICalculator";
import AIRecommendations from "@/components/autoflow/AIRecommendations";
import BeforeAfterFlow from "@/components/autoflow/BeforeAfterFlow";
import OpportunityMatrix from "@/components/autoflow/OpportunityMatrix";
import DashboardPreview from "@/components/autoflow/DashboardPreview";
import FeatureGrid from "@/components/autoflow/FeatureGrid";
import ConsultantChat from "@/components/autoflow/ConsultantChat";
import ReportPreview from "@/components/autoflow/ReportPreview";
import StatCounters from "@/components/autoflow/StatCounters";
import Testimonials from "@/components/autoflow/Testimonials";
import PricingSection from "@/components/autoflow/PricingSection";
import FAQSection from "@/components/autoflow/FAQSection";
import FinalCTA from "@/components/autoflow/FinalCTA";
import AutoFlowFooter from "@/components/autoflow/AutoFlowFooter";

export default function AutoFlowPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] selection:bg-purple-600 selection:text-white flex flex-col justify-between overflow-x-hidden font-sans">
      {/* 1. Navbar */}
      <AutoFlowNavbar />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <AutoFlowHero />

        {/* 3. Trusted By Startups Ticker */}
        <TrustedLogos />

        {/* 4. Problem Statement Section */}
        <ProblemStatement />

        {/* 5. How It Works Section */}
        <HowItWorks />

        {/* 6. AI Workflow Analysis Section */}
        <WorkflowAnalyzer />

        {/* 7. ROI Calculator Section */}
        <ROICalculator />

        {/* 8. AI Recommendations Section */}
        <AIRecommendations />

        {/* 9. Before vs After Workflow Section */}
        <BeforeAfterFlow />

        {/* 10. Automation Opportunity Matrix */}
        <OpportunityMatrix />

        {/* 11. AI Dashboard Preview */}
        <DashboardPreview />

        {/* 12. 10 Feature Grid */}
        <FeatureGrid />

        {/* 13. AI Consultant Chat Section */}
        <ConsultantChat />

        {/* 14. Executive Report Preview Section */}
        <ReportPreview />

        {/* 15. Animated Stat Counters */}
        <StatCounters />

        {/* 16. Customer Testimonials */}
        <Testimonials />

        {/* 17. Pricing Section */}
        <PricingSection />

        {/* 18. FAQ Accordions */}
        <FAQSection />

        {/* 19. Final CTA */}
        <FinalCTA />
      </main>

      {/* 20. Professional Footer */}
      <AutoFlowFooter />
    </div>
  );
}
