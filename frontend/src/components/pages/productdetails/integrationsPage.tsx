"use client"
import React, { useState } from 'react';
import Image from 'next/image';

import google from '@/public/google.png';
import microsoftteam from '@/public/microsoftteam.png';
import hdfc from '@/public/hdfc.png';
import razorpay from '@/public/razorpay.png';
import slack from '@/public/slack.png';

// --- Integrations Data ---
// Array is populated to have 52 items as shown in the image.
const initialIntegrations = [
  { name: 'Razorpay', icon: <Image src={razorpay} alt="Razorpay" width={24} height={24} />, color: 'blue-500' },
  { name: 'Slack', icon: <Image src={slack} alt="Slack" width={24} height={24} />, color: 'green-500' },
  { name: 'Microsoft Teams', icon: <Image src={microsoftteam} alt="Microsoft Teams" width={24} height={24} />, color: 'indigo-500' },
  { name: 'Google workspace', icon: <Image src={google} alt="Google Workspace" width={24} height={24} />, color: 'green-500' },
  { name: 'HDFC Bank', icon: <Image src={hdfc} alt="HDFC Bank" width={24} height={24} />, color: 'red-500' },
  { name: 'Razorpay', icon: <Image src={razorpay} alt="Razorpay" width={24} height={24} />, color: 'blue-500' },
  { name: 'Microsoft Teams', icon: <Image src={microsoftteam} alt="Microsoft Teams" width={24} height={24} />, color: 'indigo-500' },
  { name: 'Slack', icon: <Image src={slack} alt="Slack" width={24} height={24} />, color: 'green-500' },
  { name: 'Microsoft Teams', icon: <Image src={microsoftteam} alt="Microsoft Teams" width={24} height={24} />, color: 'orange-500' },
  { name: 'HDFC Bank', icon: <Image src={hdfc} alt="HDFC Bank" width={24} height={24} />, color: 'red-500' },
  { name: 'Razorpay', icon: <Image src={razorpay} alt="Razorpay" width={24} height={24} />, color: 'blue-500' },
  { name: 'Razorpay', icon: <Image src={razorpay} alt="Razorpay" width={24} height={24} />, color: 'blue-500' },
  { name: 'Google workspace', icon: <Image src={google} alt="Google Workspace" width={24} height={24} />, color: 'green-500' },
  { name: 'Microsoft Teams', icon: <Image src={microsoftteam} alt="Microsoft Teams" width={24} height={24} />, color: 'orange-500' },
  { name: 'Slack', icon: <Image src={slack} alt="Slack" width={24} height={24} />, color: 'green-500' },
  { name: 'Google work', icon: <Image src={google} alt="Google Workspace" width={24} height={24} />, color: 'green-500' },
];

const allIntegrations = Array.from({ length: 3 }).flatMap(() => initialIntegrations).slice(0, 52);


// --- Main Component ---
const IntegrationsPage = () => {
  const [showAll, setShowAll] = useState(false);

  const integrationsToShow = showAll ? allIntegrations : allIntegrations.slice(0, 14);

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-xl border border-orange-300 shadow-sm -mt-12 mb-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Integrations ({allIntegrations.length})
      </h1>
      
      <div className="flex flex-wrap gap-3">
        {integrationsToShow.map((integration, index) => (
          <button
            key={index}
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-md bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2`}
            style={{ borderColor: `var(--color-${integration.color})`, color: `var(--color-gray-700)` }}
          >
            {integration.icon}
            <span className="text-sm font-medium text-gray-700">{integration.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          {showAll ? 'Show Less' : 'Show More'}
          {showAll ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>
      {/* This is a helper style block to dynamically create CSS variables for border colors from Tailwind's palette. */}
      <style jsx global>{`
        :root {
          --color-blue-500: #3b82f6;
          --color-green-500: #22c55e;
          --color-indigo-500: #6366f1;
          --color-red-500: #ef4444;
          --color-orange-500: #f97316;
          --color-gray-700: #374151;
        }
      `}</style>
    </div>
  );
};

export default IntegrationsPage;