import { ExternalLink } from "lucide-react"

export function ProductInfo() {
  return (
    <div className="box-border flex flex-col items-start p-8 gap-[23px] w-[1175px] h-[255px] bg-[rgba(93,147,255,0.02)] border border-[#5D93FF]  rounded-[9px]" id='product-information'>
      
      {/* Inner Wrapper */}
      <div className="flex flex-col items-start gap-[35px] w-full h-[191px]">
        
        {/* Header Section */}
        <div className="flex flex-row items-start justify-between gap-[26px] w-full">
          
          {/* Title */}
          <h2 className="text-[36px] font-semibold leading-[44px] text-[#262626]">
            What is Keka Services?
          </h2>

          {/* Visit Website Button */}
          <a
            href="https://www.keka.com/?utm=appsutra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row justify-center items-center gap-[10px] px-5 py-[15px] w-[199px] h-[45px] rounded-[9px] text-[#2563EB] font-semibold text-[16px] leading-[19px] hover:bg-[rgba(37,99,235,0.05)] transition-colors"
          >
            <ExternalLink className="w-[20px] h-[20px]" />
            Visit Website
          </a>
        </div>

        {/* Description */}
        <div className="w-full text-[#525050] text-[16px] font-medium leading-[190%]">
          <p>
            A modern HR & payroll platform for growing businesses.
          </p>
          <p className="mt-4">
            Keka is your people enabler. From automation of people processes to creating an engaged and driven culture, Keka is all you need to build a good to great company....
            <span className="text-[#2563EB] cursor-pointer font-semibold hover:underline">
              {" "}Show More
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
