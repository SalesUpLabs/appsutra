import React from "react";
import Image from "next/image";
import pointer from "@/public/image.png";


const PointerIcon = () => (
  <Image
    src={pointer}
    alt="Pointer Icon"
    className="h-5 w-5" 
  />
);

const BuyingGuide = () => {
  const guideQuestions = [
    {
      question: "1. What's your team size and expected growth?",
      why: "Critical for pricing and feature planning",
      answer:
        "Consider both current needs and 12-18 month projections",
    },
    {
      question: "2. Which existing tools need integration?",
      why: "Affects workflow efficiency and adoption",
      answer:
        "List your current stack: CRM, project management, calendar, etc.",
    },
    {
      question: "3. What's your security and compliance requirements?",
      why: "May be regulatory requirement",
      answer:
        "Consider GDPR, SOC2, HIPAA, or industry-specific standards",
    },
    {
      question: "4. Who will be the primary administrators?",
      why: "Affects training needs and ongoing management",
      answer:
        "Plan for user onboarding, training, and ongoing support",
    },
    {
      question: "5. What's your budget range and billing preference?",
      why: "Determines viable options",
      answer:
        "Consider monthly vs annual billing, volume discounts, and hidden costs",
    },
    {
      question: "6. Who will be the primary administrators?",
      why: "Affects training needs and ongoing management",
      answer:
        "Plan for user onboarding, training, and ongoing support",
    },
    {
      question: "7. What's your security and compliance requirements?",
      why: "May be regulatory requirement",
      answer:
        "Consider GDPR, SOC2, HIPAA, or industry-specific standards",
    },
    {
      question: "8. Which existing tools need integration?",
      why: "Affects workflow efficiency and adoption",
      answer:
        "List your current stack: CRM, project management, calendar, etc.",
    },
  ];

  const leftColumnQuestions = guideQuestions.slice(0, 4);
  const rightColumnQuestions = guideQuestions.slice(4, 8);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Buying Guide
        </h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium border border-blue-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          <span>Share Guide</span>
        </button>
      </div>

      <p className="text-gray-600 mb-8 text-base">
        Before finalizing a solution, it's important to evaluate whether
        it truly fits your team's needs. To do this, make sure you can
        confidently answer the following key questions that will help you
        assess its effectiveness, usability, and long-term value:
      </p>

      <div className="rounded-xl p-6 sm:p-8 border border-[#4F948A] ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {/* Left Column */}
          <div className="space-y-8">
            {leftColumnQuestions.map((item, index) => (
              <div
                key={index}
                className="pl-4 border-l-2 border-[#a3cfb4]"
              >
                <h3 className="text-[#525050] font-semibold mb-2 text-base">
                  {item.question}
                </h3>
                <p className="text-[#37C906] text-sm font-medium mb-2">
                  Why it matters:{" "}
                  <span className="text-[#37C906] font-normal">
                    {item.why}
                  </span>
                </p>
                <p className="text-[#666666] text-sm flex items-start">
                  <span className="mr-2 text-gray-400 ">
                    <PointerIcon />
                  </span>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {rightColumnQuestions.map((item, index) => (
              <div
                key={index}
                className="pl-4 border-l-2 border-[#a3cfb4]"
              >
                <h3 className="text-[#525050] font-semibold mb-2 text-base">
                  {item.question}
                </h3>
                <p className="text-[#37C906] text-sm font-medium mb-2">
                  Why it matters:{" "}
                  <span className="text-[#37C906] font-normal">
                    {item.why}
                  </span>
                </p>
                <p className="text-[#666666] text-sm flex items-start">
                  <span className="mr-2 text-gray-400 ">
                    <PointerIcon />
                  </span>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyingGuide;
