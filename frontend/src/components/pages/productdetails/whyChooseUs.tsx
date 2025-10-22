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
    <section className="w-full bg-[#F8F8FF] border-[0.5px] border-[#2563EB99] py-fluid-4">
      <div className="max-w-[1728px] mx-auto px-[clamp(1rem,3rem+1vw,4.3rem)]">
        <h2 className="text-fluid-xl font-semibold text-[#062C7F] mb-fluid-3">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-fluid-3">
              <div className="bg-[linear-gradient(139.55deg,_#72B0FB_0%,_#88BEFF_109.32%)] p-fluid-2 rounded-lg flex-shrink-0 w-fluid-10 h-fluid-10 flex items-center justify-center">
                {feature.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-fluid-base font-semibold text-[#262626] mb-fluid-1">
                  {feature.title}
                </h3>
                <p className="text-fluid-sm font-medium leading-[160%] text-[#778696]">
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