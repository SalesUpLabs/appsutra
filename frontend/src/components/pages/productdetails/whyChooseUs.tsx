// components/WhyChooseUs.tsx
import { CloudLightning, Scale, Tag } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <img src="/icons/whyChooseUs/Discount.png" alt="Exclusive Discounts" className="w-9 h-9 " />,
      title: "Exclusive Discounts",
      description: "Save up to 12% with our verified partner deals",
    },
    {
      icon: <img src="/icons/whyChooseUs/LightningBolt.png" alt="Faster Vendor Response" className="w-9 h-9 " />,
      title: "Faster Vendor Response",
      description: "Get priority support from verified vendors",
    },
    {
      icon: <img src="/icons/whyChooseUs/compare.png" alt="Compare Multiple Options" className="w-9 h-9 " />,
      title: "Compare Multiple Options",
      description: "Quickly evaluate different vendors/products.",
    },
  ];

  return (
    <section className="bg-[#F8F8FF] py-[24px] px-[16px] sm:py-[36px] sm:px-[32px] md:px-[48px] lg:px-[69px] border-[0.5px] border-[#2563EB99]">
      <div className="mx-auto text-center md:text-left">
        <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#062C7F] mb-3 sm:mb-2">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-[17px]">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 sm:gap-4">
              <div className="bg-[linear-gradient(139.55deg,_#72B0FB_0%,_#88BEFF_109.32%)] p-2 sm:p-2.5 rounded-[9px] flex-shrink-0">{feature.icon}</div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#262626] mb-1">
                  {feature.title}
                </h3>
                <p className="font-inter font-medium text-[14px] sm:text-[15px] md:text-[16px] leading-[160%] tracking-[0] text-[#778696]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
