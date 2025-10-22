"use client";

import { Button } from "@/components/ui/button";
import { Building2, Calendar, Scale } from "lucide-react";
import { useState, useEffect } from "react";

interface ProductHeaderProps {
  company: string;
  name: string;
  icon: string;
  trialPlan: boolean;
  trialPlanPricing: string;
  categorySlug: string;
  slug: string;
}

export function ProductHeader({
  company,
  name,
  icon,
  trialPlan,
  trialPlanPricing,
  categorySlug,
  slug,
}: ProductHeaderProps) {
  const [activeTab, setActiveTab] = useState("product-information");

  const tabs = [
    { id: "product-information", label: "Product Information" },
    { id: "key-features", label: "Key Features" },
    { id: "buying-guide", label: "Buying Guide" },
    { id: "pricing", label: "Pricing" },
    { id: "integrations", label: "Integrations" },
    // { id: "alternatives", label: "Alternatives" },
  ];

  // Set active tab based on URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && tabs.some((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);

    // Update URL hash
    window.history.pushState(null, "", `#${tabId}`);

    // Scroll to element with offset for sticky headers
    const element = document.getElementById(tabId);
    if (element) {
      // Calculate offset: main header (64px) + product nav (72px) + padding (20px) = 156px
      const offset = 156;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="w-full bg-white p-fluid-6">
        {/* Header with logo and action buttons */}
        <div className="flex items-start justify-between gap-fluid-4">
          {/* Left side - Logo and service info */}
          <div className="flex-1">
            {/* Logo */}
            <div className="mb-fluid-4">
              <img
                src={icon || ""}
                alt={`${name} logo`}
                className="h-fluid-12 w-auto"
              />
            </div>

            {/* Service name */}
            <h2 className="text-fluid-2xl font-bold text-gray-900 mb-fluid-2">{name}</h2>

            {/* Provider info */}
            <div className="flex items-center gap-fluid-2 text-gray-600 mb-fluid-4">
              <Building2 className="w-fluid-4 h-fluid-4" />
              <span className="text-fluid-sm">
                By{" "}
                <span className="font-semibold text-blue-600">{company}</span>
              </span>
            </div>

            {/* Pricing */}
            <div className="text-fluid-lg font-semibold text-green-600">
              {trialPlan && trialPlanPricing}
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex flex-col gap-fluid-3">
            <button className="min-w-[clamp(11rem,12rem+1vw,12.5rem)] text-white font-semibold h-[clamp(3rem,3.25rem+0.5vw,3.5rem)] rounded-[9px] bg-gradient-to-r from-[#2563EB] to-[#5288FF] border border-[rgba(37,99,235,0.4)] flex flex-row items-center justify-center gap-fluid-2 px-fluid-5 py-fluid-3 hover:opacity-90 transition-opacity">
              <Calendar className="w-fluid-5 h-fluid-5" />
              <span className="text-fluid-base">Curate Demo</span>
            </button>
            <button className="min-w-[clamp(11rem,12rem+1vw,12.5rem)] h-[clamp(3rem,3.25rem+0.5vw,3.5rem)] rounded-[9px] bg-gradient-to-br from-[rgba(37,99,235,0.04)] to-[rgba(255,255,255,0.04)] border border-[rgba(37,99,235,0.4)] flex flex-row items-center justify-center gap-fluid-2 px-fluid-4 py-fluid-2 hover:bg-gradient-to-br hover:from-[rgba(37,99,235,0.08)] hover:to-[rgba(255,255,255,0.08)] transition-colors font-semibold text-[#2563EB]">
              <Scale className="w-fluid-5 h-fluid-5" />
              <span className="text-fluid-base">Compare Items</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      {/* Navigation Bar */}
      <div className="w-full h-[clamp(4rem,4.25rem+0.5vw,4.5rem)] flex items-center justify-start px-[clamp(3%,4%,5.8%)] gap-x-[clamp(3%,4%,5.5%)] bg-white shadow-md sticky top-16 z-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center justify-center py-fluid-6 px-fluid-1 h-full transition-colors ${
                isActive ? "border-b-2 border-blue-600" : ""
              }`}
            >
              <span
                className={`text-fluid-lg whitespace-nowrap ${
                  isActive
                    ? "font-semibold text-blue-600"
                    : "font-medium text-neutral-800 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
