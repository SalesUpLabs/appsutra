import React from 'react';
import * as SimpleIcons from 'react-icons/si'; // Simple Icons
import * as FaBrands from 'react-icons/fa'; // Font Awesome Brands

interface BrandIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string; // For custom color
}

export default function BrandIcon({ name, size = 32, className = '', color }: BrandIconProps) {
  // Clean and format the brand name
  const formatIconName = (brandName: string): string => {
    // Remove special characters and convert to lowercase
    const cleaned = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Capitalize first letter
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  const getIcon = () => {
    const formattedName = formatIconName(name);

    // Try Simple Icons first (Si prefix)
    const siIconName = `Si${formattedName}` as keyof typeof SimpleIcons;
    if (SimpleIcons[siIconName]) {
      const IconComponent = SimpleIcons[siIconName];
      return <IconComponent size={size} className={className} color={color} />;
    }

    // Try Font Awesome Brands (Fa prefix)
    const faIconName = `Fa${formattedName}` as keyof typeof FaBrands;
    if (FaBrands[faIconName]) {
      const IconComponent = FaBrands[faIconName];
      return <IconComponent size={size} className={className} color={color} />;
    }

    // Fallback: show first letter in a circle with custom color
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color ? color + '20' : '#e5e7eb', // 20 is alpha for transparency
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.5,
          fontWeight: 'bold',
          color: color || '#525050'
,
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return <>{getIcon()}</>;
}