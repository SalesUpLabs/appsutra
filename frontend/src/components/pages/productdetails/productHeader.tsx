import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"

interface ProductHeaderProps {
    company: string
    name: string
    icon: string
    freeplan: boolean
    freeplanpricing: string
    categorySlug: string
    slug: string
}
export function ProductHeader({ company, name, icon, freeplan, freeplanpricing, categorySlug, slug }: ProductHeaderProps) {
  return (
    <div className="w-full bg-white rounded-lg  p-6 ">
      {/* Header with logo and action buttons */}
      <div className="flex items-start justify-between gap-4">
        {/* Left side - Logo and service info */}
        <div className="flex-1">
          {/* Logo */}
          <div className="mb-4">
            <img
              src={icon || ""}
              alt={`${name} logo`}
              className="h-12 w-auto"
            />
          </div>

          {/* Service name */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>

          {/* Provider info */}
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">
              By <span className="font-semibold text-blue-600">{company}</span>
            </span>
          </div>

          {/* Pricing */}
          <div className="text-lg font-semibold text-green-600">{freeplan && freeplanpricing  }</div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex flex-col gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
            📋 Curate Demo
          </Button>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium bg-transparent"
          >
            ⚖️ Compare Items
          </Button>
        </div>
      </div>
    </div>
  )
}
