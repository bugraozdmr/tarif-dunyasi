import React from 'react';
import { IconType } from 'react-icons';
import { FaCoffee, FaIceCream, FaPizzaSlice,  FaEgg } from 'react-icons/fa';
import { GiSandwich } from "react-icons/gi";

// İkonları maplemek
const iconMap: Record<string, IconType> = {
  IceCream: FaIceCream,
  Coffee: FaCoffee,
  Pizza: FaPizzaSlice,
  Sandwich: GiSandwich,
  EggFried: FaEgg,
};

// İkon bileşenini almak için fonksiyon
export const getIconComponent = (iconName: string): IconType | null => {
  return iconMap[iconName] || null;
};