"use client";
import React, { useState } from "react";
import BrandIcon from "@/components/ui/brandIconUtils";
import { getAccentColor } from "@/lib/accent-color";
import { Integration } from "@/types/product";

interface IntegrationsPageProps {
  integrations?: Integration[];
}

const INITIAL_DISPLAY_COUNT = 14;

const IntegrationsPage = ({ integrations = [] }: IntegrationsPageProps) => {
  const [showAll, setShowAll] = useState(false);

  const integrationsToShow = showAll
    ? integrations
    : integrations.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-xl border border-orange-300 shadow-sm -mt-12 mb-10" id="integrations">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Integrations ({integrations.length})
      </h1>

      <div className="flex flex-wrap gap-3">
        {integrationsToShow.map((integration, index) => {
          const accentColor = getAccentColor(index);

          return (
            <div
              key={`${integration.title}-${index}`}
              className="flex items-center gap-2 px-3 py-1.5 border rounded-md bg-white hover:bg-gray-50 transition-colors"
              style={{ borderColor: accentColor }}
            >
              <BrandIcon
                name={integration.title}
                size={20}
                color={accentColor}
              />
              <span className="text-sm font-medium text-gray-700">
                {integration.title}
              </span>
            </div>
          );
        })}
      </div>

      {integrations.length > INITIAL_DISPLAY_COUNT && (
        <div className="mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            {showAll ? "Show Less" : "Show More"}
            {showAll ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default IntegrationsPage;
