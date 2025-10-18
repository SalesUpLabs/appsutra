export default function WhyChooseUs() {
  const features = [
    {
      icon: <img src="/icons/whyChooseUs/Discount.png" alt="Exclusive Discounts" className="w-7 h-7" />,
      title: "Exclusive Discounts",
      description: "Save up to 12% with our verified partner deals",
    },
    {
      icon: <img src="/icons/whyChooseUs/LightningBolt.png" alt="Faster Vendor Response" className="w-7 h-7" />,
      title: "Faster Vendor Response",
      description: "Get priority support from verified vendors",
    },
    {
      icon: <img src="/icons/whyChooseUs/compare.png" alt="Compare Multiple Options" className="w-7 h-7" />,
      title: "Compare Multiple Options",
      description: "Quickly evaluate different vendors/products.",
    },
  ];

  return (
    <section className="w-full bg-[#F8F8FF] border-[0.5px] border-[#2563EB99] py-4 lg:py-6">
      <div className="max-w-[1728px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[69px]">
        <h2 className="text-lg lg:text-xl font-semibold text-[#062C7F] mb-3 lg:mb-4">
          Why Choose Us?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="bg-[linear-gradient(139.55deg,_#72B0FB_0%,_#88BEFF_109.32%)] p-2 rounded-lg flex-shrink-0 w-10 h-10 flex items-center justify-center">
                {feature.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm lg:text-base font-semibold text-[#262626] mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs lg:text-sm font-medium leading-[160%] text-[#778696]">
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