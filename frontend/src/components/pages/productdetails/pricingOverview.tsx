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
    <div className="bg-white min-h-screen font-sans py-fluid-12" id="pricing">
        {/* Header Section */}
        <div className="mb-[clamp(2.5rem,3rem+0.938vw,3.5rem)] text-left">
          <h1 className="text-fluid-3xl font-semibold text-gray-800 mb-fluid-5">
            Pricing Overview
          </h1>
          <p className="text-gray-500 text-fluid-base leading-relaxed">
            {data.desc}
          </p>
        </div>

        {/* Pricing Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-fluid-6">
          {plans.map((plan, index) => {
            const theme = themes[index % themes.length];

            return (
              <div
                key={plan.name}
                className={`rounded-lg p-fluid-6 border flex flex-col transition-transform duration-300 hover:scale-102 hover:shadow-md ${theme.borderColor}`}
              >
                <div className="flex-grow">
                  <div className="mb-fluid-6">
                    <Image src={icons[index]} alt={plan.name} className={`w-fluid-12 h-fluid-12 ${theme.textColor}`} width={48} height={48} />
                  </div>
                  <h2 className="text-fluid-lg font-bold text-gray-800 mb-fluid-3">{plan.name}</h2>
                  <div className="mb-fluid-5 flex items-baseline">
                      <p className={`text-fluid-2xl font-bold ${theme.textColor}`}>
                          {plan.pricing.isCustom ? 'Custom' : `${plan.pricing.currencySymbol}${plan.pricing.amount?.toLocaleString('en-IN')}`}
                      </p>
                      <span className="ml-fluid-1 text-fluid-sm text-gray-600 font-medium">
                        {plan.pricing.isCustom ? 'pricing' : `per ${plan.pricing.period}${plan.pricing.perUnit ? ` / ${plan.pricing.perUnit}` : ''}`}
                      </span>
                  </div>
                  <p className="text-gray-600 text-fluid-sm leading-relaxed">
                    {plan.description.split('**').map((part, i) =>
                      i % 2 === 0 ? part : <strong key={i} className="font-bold text-gray-800">{part}</strong>
                    )}
                  </p>
                </div>

                <button className={`w-full mt-fluid-6 py-[clamp(0.563rem,0.625rem+0.156vw,0.688rem)] px-fluid-6 rounded-lg font-medium shadow-sm transition-all duration-300 ${theme.buttonClasses}`}>
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