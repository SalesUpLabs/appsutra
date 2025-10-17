import React from 'react';
import Image from 'next/image';

import image1 from '@/public/image1.png';
import image2 from '@/public/image2.png';
import image3 from '@/public/image3.png';
import image4 from '@/public/image4.png';

// --- Data for Pricing Plans ---
const pricingPlans = [
    {
        name: 'Starter Plan',
        Icon: image1 || '/image1.png',
        price: 'Rs. 8,000',
        priceSuffix: 'per month',
        description: <>For up to <strong>50 employees</strong>, Keka offers an affordable starter plan with all essential HR and payroll features.</>,
        theme: {
            textColor: 'text-orange-500',
            borderColor: 'border-orange-300',
            buttonClasses: 'bg-orange-500 hover:bg-orange-600 text-white',
        }
    },
    {
        name: 'Growth Plan',
        Icon: image2 || '/image2.png',
        price: 'Rs. 12,000',
        priceSuffix: 'per month',
        description: <>Plans start at a monthly rate, covering up to <strong>100 employees</strong> with core HR and payroll features.</>,
        theme: {
            textColor: 'text-lime-600',
            borderColor: 'border-lime-400',
            buttonClasses: 'bg-lime-500 hover:bg-lime-600 text-white',
        }
    },
    {
        name: 'Scale Plan',
        Icon: image3 || '/image3.png',
        price: 'Rs. 8000',
        priceSuffix: 'per month',
        description: <>Available at a monthly rate for up to <strong>200 employees</strong>, with complete HR and payroll functionality.</>,
        theme: {
            textColor: 'text-blue-500',
            borderColor: 'border-blue-300',
            buttonClasses: 'bg-blue-500 hover:bg-blue-600 text-white',
        }
    },
    {
        name: 'Enterprise Plan',
        Icon: image4 || '/image4.png',
        price: 'Rs. 8000',
        priceSuffix: 'per month',
        description: <>Custom pricing for 200+ employees - Includes payroll processing statutory compliance and support.</>,
        theme: {
            textColor: 'text-violet-500',
            borderColor: 'border-violet-300',
            
            buttonClasses: 'bg-violet-500 hover:bg-violet-600 text-white',
        }
    }
];

const PricingOverview = () => {
  return (
    <div className="bg-white min-h-screen font-sans py-12 sm:py-16">
        {/* Header Section */}
        <div className="mb-14 text-left">
          <h1 className="text-3xl  font-semibold text-gray-800 mb-5">
            Pricing Overview
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Keka offers flexible pricing tailored to the needs of growing businesses, ensuring organizations pay only for what they use. Its subscription model scales with employee count and chosen modules, making it cost-effective for startups as well as large enterprises. Transparent pricing, no hidden costs, and customizable plans allow companies to adopt HR, payroll, and talent solutions at their own pace while staying within budget.
          </p>
        </div>

        {/* Pricing Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-6 border flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl } ${plan.theme.borderColor}`}
            >
              <div className="flex-grow">
                <div className="mb-6">
                  <Image src={plan.Icon} alt={plan.name} className={`w-12 h-12 ${plan.theme.textColor}`} />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">{plan.name}</h2>
                <div className="mb-5 flex items-baseline">
                    <p className={`text-2xl font-bold ${plan.theme.textColor}`}>
                        {plan.price}
                    </p>
                    <span className="ml-1.5 text-sm text-gray-600 font-medium">{plan.priceSuffix}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>
              
              <button className={`w-full mt-6 py-2.5 px-6 rounded-lg font-medium shadow-sm transition-all duration-300 ${plan.theme.buttonClasses}`}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
    </div>
  );
}

export default PricingOverview;