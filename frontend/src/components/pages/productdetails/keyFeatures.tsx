import { Product } from "@/types/product";
import Image from "next/image";

interface KeyFeaturesProps {
  data: Product["keyFeatures"];
}

const ICON_SIZE = 60;

const FEATURE_ICONS = [
  { src: "/icons/KeyFeatures/Calendar.png", alt: "Calendar Icon" },
  { src: "/icons/KeyFeatures/Scale.png", alt: "Scale Icon" },
  { src: "/icons/KeyFeatures/Progress.png", alt: "Progress Icon" },
  { src: "/icons/KeyFeatures/Dollar.png", alt: "Dollar Icon" },
  { src: "/icons/KeyFeatures/Scale.png", alt: "Scale Icon" },
  { src: "/icons/KeyFeatures/Progress.png", alt: "Progress Icon" },
  { src: "/icons/KeyFeatures/Dollar.png", alt: "Dollar Icon" },
  { src: "/icons/KeyFeatures/Calendar.png", alt: "Calendar Icon" },
] as const;

const COLOR_SETS = [
  { icon: "text-red-500", border: "border-[#FCCFC766]" },
  { icon: "text-green-500", border: "border-[#CAEBD066]" },
  { icon: "text-blue-500", border: "border-[#84ADFF66]" },
  { icon: "text-yellow-600", border: "border-[#FFD5AE4D]" },
  { icon: "text-green-500", border: "border-[#CAEBD066]" },
  { icon: "text-blue-500", border: "border-[#84ADFF66]" },
  { icon: "text-yellow-600", border: "border-[#FFD5AE4D]" },
  { icon: "text-red-500", border: "border-[#FCCFC766]" },
] as const;

const MAX_FEATURES = 8;

export default function KeyFeatures({ data }: KeyFeaturesProps) {
  const features = data.features.slice(0, MAX_FEATURES);

  return (
    <section id="key-features" className="w-full bg-white py-fluid-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <h2 className="text-fluid-4xl font-semibold text-black mb-fluid-6">
          Key Features
        </h2>

        {/* Description */}
        <p className="text-[#525050] text-fluid-base font-medium leading-relaxed mb-fluid-12 max-w-[1200px]">
          {data.description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-4 gap-fluid-6">
          {features.map((feature, index) => {
            const colors = COLOR_SETS[index];
            const icon = FEATURE_ICONS[index];

            return (
              <div
                key={`${feature.title}-${index}`}
                className={`bg-white rounded-xl py-fluid-5 px-[clamp(1.5rem,1.75rem+0.313vw,1.875rem)] border-2 ${colors.border}`}
              >
                {/* Icon */}
                <div className={`mb-fluid-4 ${colors.icon}`}>
                  <Image
                    src={icon.src}
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    alt={icon.alt}
                    className="w-[clamp(3rem,3.5rem+0.313vw,3.75rem)] h-[clamp(3rem,3.5rem+0.313vw,3.75rem)]"
                  />
                </div>

                {/* Title */}
                <h3 className="text-fluid-base font-bold text-[#525050] mb-fluid-2 leading-snug">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-medium text-fluid-base text-[#525050] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
