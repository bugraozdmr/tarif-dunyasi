import {  LucideIcon, Coffee, IceCream, Pizza ,Sandwich ,EggFried } from 'lucide-react';


// Iconlari maplemek sart
const iconMap: Record<string, LucideIcon> = {
    IceCream,
    Coffee,
    Pizza,
    Sandwich,
    EggFried
  };
  
  
  export const getIconComponent = (iconName: string): LucideIcon | null => {
    return iconMap[iconName] || null;
  };
  