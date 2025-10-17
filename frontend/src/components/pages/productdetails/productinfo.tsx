"use client"

import { useState } from "react"
import { ExternalLink, CheckCircle2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Product } from "@/types/product"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Split description into paragraphs
  const descriptionParts = product.description.split("\n\n")
  const shortDesc = descriptionParts[0]
  const previewDesc = descriptionParts.slice(0, 2).join("\n\n")
  const remainingDesc = descriptionParts.slice(2).join("\n\n")

  const displayUseCases = product.useCases

  const keywordsString = product.keywords.slice(0, 6).join(", ")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content Card */}
      <div className="lg:col-span-2 border-2 border-blue-200 rounded-2xl p-8 bg-white">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-3xl font-bold text-black">What is {product.name}?</h2>
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
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="text-gray-700 mb-4 text-base leading-relaxed">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-black">{children}</strong>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700">{children}</li>
              ),
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-black mb-4 mt-6">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-black mb-3 mt-5">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold text-black mb-2 mt-4">{children}</h3>
              ),
            }}
          >
            {isExpanded ? product.description : previewDesc}
          </ReactMarkdown>

          {/* Show More/Less Button */}
          {remainingDesc && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Card */}
      <div className="border-2 border-green-300 rounded-2xl p-6 bg-white h-fit">
        {/* Verified Badge */}
        <div className="flex items-center gap-2 mb-6 bg-green-100 w-fit px-4 py-2 rounded-full">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-green-700">Verified Business</span>
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
                  { border: "border-blue-300", text: "text-blue-700", bg: "bg-blue-50" },
                  { border: "border-green-300", text: "text-green-700", bg: "bg-green-50" },
                  { border: "border-yellow-300", text: "text-yellow-700", bg: "bg-yellow-50" },
                ]
                const color = colors[index % colors.length]
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 border ${color.border} rounded-full text-xs font-medium ${color.text} ${color.bg}`}
                  >
                    {useCase}
                  </span>
                )
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
            {product?.integration?.map((integration, index) => (
              <span key={index} className="text-lg" title={integration.title}>
                {integration.icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
