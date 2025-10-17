"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"

interface SoftwareCard {
  id: string
  logo: string
  name: string
  description: string
  viewDetailsColor: "blue" | "green"
  compareColor: "blue" | "green"
}

const softwareData: SoftwareCard[] = [
  {
    id: "zoho",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-y2wuI9bBc4obcdBTkwzFb2eeeUNd9h.png",
    name: "Zoho Payroll",
    description:
      "Cloud-based payroll management with good automation (TDS, PT, PF etc.). If you are already using Zoho's ecosystem (Books, People, etc.), integration is a big plus.",
    viewDetailsColor: "green",
    compareColor: "green",
  },
  {
    id: "greyhr",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2mRgIvcXyd9yuEogxv04JmFdvKDnjx.png",
    name: "GreytHR",
    description:
      "Cloud-based payroll management with good automation (TDS, PT, PF etc.). If you are already using Zoho's ecosystem (Books, People, etc.), integration is a big plus.",
    viewDetailsColor: "blue",
    compareColor: "blue",
  },
  {
    id: "factohr",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rL4VQ6cCqhehKFu7IcLVYhOI89zeyL.png",
    name: "FactoHR",
    description:
      "More workflow/customisation for HR + payroll. Useful if your pay structure or provals are a bit complex. Also good if you want sleek dashboards and modern UX.",
    viewDetailsColor: "green",
    compareColor: "green",
  },
  {
    id: "pocket",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-np4LPM24oWqhtp1v9sKtaSsj9H7tuY.png",
    name: "Pocket HRMS",
    description:
      "Good mobile-friendly HRMS + payroll + self-service portals. Wiseranker - Daily Dose of Fun! Offers attendance, leave, etc., with somewhat simpler UI.",
    viewDetailsColor: "blue",
    compareColor: "blue",
  },
]

export function SoftwareComparisonCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === softwareData.length - 2 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? softwareData.length - 2 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === softwareData.length - 2 ? 0 : prev + 1))
  }

  const visibleCards = [softwareData[currentIndex], softwareData[currentIndex + 1]].filter(Boolean)

  return (
    <div className="w-full py-16" id="alternatives">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-16">
          {/* Left Section */}
          <div className="w-1/3 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Softwares with similar functionality</h2>
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                Whether you're looking for alternatives, complementary tools, or programs in the same category, this
                collection highlights options that can help you.
              </p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg w-fit transition-colors">
              Load More
            </button>

            {/* Navigation Arrows */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-gray-600 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-gray-600 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Right Section - Carousel */}
          <div className="w-2/3 flex gap-6">
            {visibleCards.map((card, index) => (
              <div
                key={card.id}
                className="flex-1 border border-gray-300 rounded-lg p-6 bg-white transition-all duration-500 ease-out"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s`,
                }}
              >
                {/* Logo */}
                <div className="mb-4 h-12 flex items-center">
                  <img src={card.logo || "/placeholder.svg"} alt={card.name} className="h-full object-contain" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{card.description}</p>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-colors ${
                      card.viewDetailsColor === "blue"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    <Info className="w-5 h-5" />
                    View Details
                  </button>

                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 border-2 transition-colors ${
                      card.compareColor === "blue"
                        ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                        : "border-green-500 text-green-600 hover:bg-green-50"
                    }`}
                  >
                    <span className="text-lg">⚖️</span>
                    Compare Items
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
