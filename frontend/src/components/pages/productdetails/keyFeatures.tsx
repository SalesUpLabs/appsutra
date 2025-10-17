import {  Scale, TrendingUp, Lock, Users, DollarSign, Clock, Award, CalendarDays } from 'lucide-react';

interface KeyFeature {
  icon: string;
  title: string;
  desc: string;
}

interface KeyFeaturesData {
  description: string;
  features: KeyFeature[];
}

interface KeyFeaturesProps {
  data: KeyFeaturesData;
}

export default function KeyFeatures({ data }: KeyFeaturesProps) {
  // Map icon names to Lucide components
  const iconMap: { [key: string]: React.ReactNode } = {
    'calendar': <CalendarDays  className="w-6 h-6" strokeWidth={2} />,
    'scale': <Scale className="w-6 h-6" strokeWidth={2} />,
    'trending': <TrendingUp className="w-6 h-6" strokeWidth={2} />,
    'lock': <Lock className="w-6 h-6" strokeWidth={2} />,
    'users': <Users className="w-6 h-6" strokeWidth={2} />,
    'dollar': <DollarSign className="w-6 h-6" strokeWidth={2} />,
    'clock': <Clock className="w-6 h-6" strokeWidth={2} />,
    'award': <Award className="w-6 h-6" strokeWidth={2} />,
  };

  // Define color mapping based on index
  const getColors = (index: number) => {
    const colorSets = [
      { icon: 'text-red-500', border: 'border-red-500' },
      { icon: 'text-green-500', border: 'border-green-500' },
      { icon: 'text-blue-500', border: 'border-blue-500' },
      { icon: 'text-yellow-600', border: 'border-yellow-600' },
    ];
    return colorSets[index % colorSets.length];
  };

  return (
    <section id="key-features" className="w-full bg-white py-16 px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <h2 className="text-[36px] font-semibold text-black mb-6">Key Features</h2>
        
        {/* Description */}
        <p className="text-[#525050] text-[15px] font-medium leading-relaxed mb-12 max-w-[1200px]">
          {data.description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-4 gap-6">
          {data.features.map((feature, index) => {
            const colors = getColors(index);
            return (
              <div
                key={index}
                className={`bg-white rounded-xl py-[20px] px-[30px] border-2 ${colors.border} shadow-lg transition-all hover:shadow-xl`}
              >
                {/* Icon */}
                <div className={`mb-4 ${colors.icon}`}>
                  {iconMap[feature.icon] || iconMap['calendar']}
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-bold text-[#525050] mb-2 leading-snug">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-medium text-[16px] text-[#525050] leading-relaxed">
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