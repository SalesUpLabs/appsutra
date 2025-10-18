"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Product } from "@/types/product";
import Image from "next/image";
import BrandIcon from "@/components/ui/brandIconUtils";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split description into paragraphs
  const descriptionParts = product.description.split("\n\n");
  const shortDesc = descriptionParts[0];
  const previewDesc = descriptionParts.slice(0, 2).join("\n\n");
  const remainingDesc = descriptionParts.slice(2).join("\n\n");

  const displayUseCases = product.useCases;

  const keywordsString = product.keywords.slice(0, 6).join(", ");

  return (
    <div className="grid grid-cols-5 gap-5">
      {/* Main Content Card */}
      <div className="col-span-4 border border-[#5D93FF] rounded-2xl p-8 gap-6 bg-white">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold leading-tight tracking-normal text-black">
            What is {product.name}?
          </h2>
          <a
            href={product.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors flex-shrink-0"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="text-sm font-medium">Visit Website</span>
          </a>
        </div>

        {/* Description with Markdown Support */}
        <div className="prose prose-[#525050] max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="text-gray-700 mb-4 text-sm sm:text-base lg:text-[1rem] font-medium leading-[190%] tracking-normal">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-[#525050]">
                  {children}
                </strong>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 text-sm sm:text-base lg:text-[1rem] font-medium leading-[190%]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2 text-sm sm:text-base lg:text-[1rem] font-medium leading-[190%]">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700 font-medium leading-[190%]">
                  {children}
                </li>
              ),
              h1: ({ children }) => (
                <h1 className="text-xl sm:text-2xl lg:text-[2.25rem] font-semibold text-black mb-4 mt-6 leading-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg sm:text-xl lg:text-[1.5rem] font-semibold text-black mb-3 mt-5 leading-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base sm:text-lg lg:text-[1.25rem] font-semibold text-black mb-2 mt-4 leading-tight">
                  {children}
                </h3>
              ),
            }}
          >
            {isExpanded ? product.description : previewDesc}
          </ReactMarkdown>

          {/* Show More/Less Button - appears inline after 6 lines */}
          {remainingDesc && !isExpanded && (
            <span className="inline">
              ...{" "}
              <button
                onClick={() => setIsExpanded(true)}
                className="text-blue-500 hover:text-blue-600 text-sm sm:text-base font-medium transition-colors inline"
              >
                Show More
              </button>
            </span>
          )}

          {remainingDesc && isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-blue-500 hover:text-blue-600 text-sm sm:text-base font-medium transition-colors block mt-2"
            >
              Show Less
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Card */}
      <div className="col-span-1 border border-[#5DFF80] rounded-2xl p-8 gap-6 bg-white h-fit">
        {/* Verified Badge */}
        <div className="flex items-center gap-2 mb-6 bg-green-100 w-fit px-4 py-2 rounded-lg border border-[#25EB74] ">
          <Image
            src="/icons/productInfo/verifiedBadge.png"
            alt="Verified Badge"
            width={20}
            height={20}
            className="w-5 h-5"
          />

          <span className="text-sm font-semibold text-green-700">
            Verified Business
          </span>
        </div>

        {/* Category */}
        <div className="mb-6">
          <h3 className="font-bold text-black mb-2 text-base">Category</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
        </div>

        {/* Use Cases - Only show when expanded */}
        {isExpanded && (
          <div className="mb-6 animate-in fade-in duration-300">
            <h3 className="font-bold text-black mb-3 text-base">Use Cases</h3>
            <div className="flex flex-wrap gap-2">
              {displayUseCases?.map((useCase, index) => {
                const colors = [
                  {
                    border: "border-blue-300",
                    text: "text-blue-700",
                    bg: "bg-blue-50",
                  },
                  {
                    border: "border-green-300",
                    text: "text-green-700",
                    bg: "bg-green-50",
                  },
                  {
                    border: "border-yellow-300",
                    text: "text-yellow-700",
                    bg: "bg-yellow-50",
                  },
                ];
                const color = colors[index % colors.length];
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 border ${color.border} rounded-full text-xs font-medium ${color.text} ${color.bg}`}
                  >
                    {useCase}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Keywords - Only show when expanded */}
        {isExpanded && (
          <div className="mb-6 animate-in fade-in duration-300">
            <h3 className="font-bold text-black mb-2 text-base">Keywords</h3>
            <p className="text-sm text-gray-600">{keywordsString}</p>
          </div>
        )}

        {/* Integrations */}
        <div>
          <h3 className="font-bold text-black mb-3 text-base">Integrations:</h3>
          <div className="flex gap-2">
            {product?.integration?.slice(0, 4).map((integration, index) => (
              <span key={index} className="text-lg" title={integration.title}>
                <BrandIcon name={integration.title.toLowerCase()} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
