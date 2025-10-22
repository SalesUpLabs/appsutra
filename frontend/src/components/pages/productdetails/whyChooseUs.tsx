// components/WhyChooseUs.tsx
// import { CloudLightning, Scale, Tag } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <img src="/icons/whyChooseUs/Discount.png" alt="Exclusive Discounts" className="w-[clamp(1.5rem,1.75rem+0.313vw,2rem)] h-[clamp(1.5rem,1.75rem+0.313vw,2rem)]" />,
      title: "Exclusive Discounts",
      description: "Save up to 12% with our verified partner deals",
    },
    {
      icon: <img src="/icons/whyChooseUs/LightningBolt.png" alt="Faster Vendor Response" className="w-[clamp(1.5rem,1.75rem+0.313vw,2rem)] h-[clamp(1.5rem,1.75rem+0.313vw,2rem)]" />,
      title: "Faster Vendor Response",
      description: "Get priority support from verified vendors",
    },
    {
      icon: <img src="/icons/whyChooseUs/compare.png" alt="Compare Multiple Options" className="w-[clamp(1.5rem,1.75rem+0.313vw,2rem)] h-[clamp(1.5rem,1.75rem+0.313vw,2rem)]" />,
      title: "Compare Multiple Options",
      description: "Quickly evaluate different vendors/products.",
    },
  ];

  return (
    <section className="bg-[#F8F8FF] py-[clamp(1.25rem,1.5rem+0.313vw,1.75rem)] px-[clamp(1rem,2rem+1vw,4.3rem)] border-[0.5px] border-[#2563EB99]">
      <div className="mx-auto text-center md:text-left">
        <h2 className="text-fluid-xl font-semibold text-[#062C7F] mb-fluid-2">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-fluid-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-fluid-3">
              <div className="bg-[linear-gradient(139.55deg,_#72B0FB_0%,_#88BEFF_109.32%)] p-fluid-2 rounded-[9px] flex-shrink-0">{feature.icon}</div>
              <div className="min-w-0 flex-1">
                <h3 className="text-fluid-base font-semibold text-[#262626] mb-fluid-1">
                  {feature.title}
                </h3>
                <p className="font-inter font-medium text-fluid-sm leading-[160%] tracking-[0] text-[#778696]">
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