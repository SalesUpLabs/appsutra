import React from 'react';
import Image from 'next/image';
import { PricingDetails } from '@/types/product';

interface PricingOverviewProps {
  data: PricingDetails;
}

const icons = [
  '/icons/pricingOverview/Beginner.png',
  '/icons/pricingOverview/Increase.png',
  '/icons/pricingOverview/Scale.png',
  '/icons/pricingOverview/Building.png',
];

// Theme colors cycling
const themes = [
  {
    textColor: 'text-orange-500',
    borderColor: 'border-orange-300',
    buttonClasses: 'bg-orange-500 hover:bg-orange-600 text-white',
  },
  {
    textColor: 'text-lime-600',
    borderColor: 'border-lime-400',
    buttonClasses: 'bg-lime-500 hover:bg-lime-600 text-white',
  },
  {
    textColor: 'text-blue-500',
    borderColor: 'border-blue-300',
    buttonClasses: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
  {
    textColor: 'text-violet-500',
    borderColor: 'border-violet-300',
    buttonClasses: 'bg-violet-500 hover:bg-violet-600 text-white',
  },
];

const MAX_PLANS = 4;

const PricingOverview = ({ data }: PricingOverviewProps) => {
  const plans = data.plans.slice(0, MAX_PLANS);

  return (
    <div className="bg-white min-h-screen font-sans py-12 sm:py-16" id="pricing">
        {/* Header Section */}
        <div className="mb-14 text-left">
          <h1 className="text-3xl  font-semibold text-gray-800 mb-5">
            Pricing Overview
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            {data.desc}
          </p>
        </div>

        {/* Pricing Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => {
            const theme = themes[index % themes.length];

            return (
              <div
                key={plan.name}
                className={`rounded-lg p-6 border flex flex-col transition-transform duration-300 hover:scale-102 hover:shadow-md ${theme.borderColor}`}
              >
                <div className="flex-grow">
                  <div className="mb-6">
                    <Image src={icons[index]} alt={plan.name} className={`w-12 h-12 ${theme.textColor}`} width={48} height={48} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mb-3">{plan.name}</h2>
                  <div className="mb-5 flex items-baseline">
                      <p className={`text-2xl font-bold ${theme.textColor}`}>
                          {plan.pricing.isCustom ? 'Custom' : `${plan.pricing.currencySymbol}${plan.pricing.amount?.toLocaleString('en-IN')}`}
                      </p>
                      <span className="ml-1.5 text-sm text-gray-600 font-medium">
                        {plan.pricing.isCustom ? 'pricing' : `per ${plan.pricing.period}${plan.pricing.perUnit ? ` / ${plan.pricing.perUnit}` : ''}`}
                      </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {plan.description.split('**').map((part, i) =>
                      i % 2 === 0 ? part : <strong key={i} className="font-bold text-gray-800">{part}</strong>
                    )}
                  </p>
                </div>

                <button className={`w-full mt-6 py-2.5 px-6 rounded-lg font-medium shadow-sm transition-all duration-300 ${theme.buttonClasses}`}>
                  Buy Now
                </button>
              </div>
            );
          })}
        </div>
    </div>
  );
}

export default PricingOverview;