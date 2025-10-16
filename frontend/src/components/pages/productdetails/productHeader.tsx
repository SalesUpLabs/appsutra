import { Button } from "@/components/ui/button"
import { Building2, Calendar, Calendar1, Scale } from "lucide-react"

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
            <button className="w-[199px] text-white font-semibold h-14 rounded-[9px] bg-gradient-to-r from-[#2563EB] to-[#5288FF] border border-[rgba(37,99,235,0.4)] flex flex-row items-center justify-center gap-2.5 px-5 py-3.75 hover:opacity-90 transition-opacity">
              <Calendar className="w-5 h-5" />
              Curate Demo
          </button>
          <button
            className="w-[199px] h-14 rounded-[9px] bg-gradient-to-br from-[rgba(37,99,235,0.04)] to-[rgba(255,255,255,0.04)] border border-[rgba(37,99,235,0.4)] flex flex-row items-center justify-center gap-1 px-3.75 py-2.5 hover:bg-gradient-to-br hover:from-[rgba(37,99,235,0.08)] hover:to-[rgba(255,255,255,0.08)] transition-colors font-semibold text-[#2563EB]"
          >
            <Scale className="w-5 h-5" />
             Compare Items
          </button>
        </div>
      </div>
    </div>
  )
}
