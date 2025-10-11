import React from 'react';
import { clsx } from 'clsx';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Search,
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  HardHat,
  Hammer,
  Building2,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  Quote,
  Star,
  Calendar,
  Menu,
  X,
  Home,
  Pencil,
  Clipboard,
  Settings,
  PaintBucket,
  TreeDeciduous,
} from 'lucide-react';

const iconMap = {
  phone: Phone,
  mail: Mail,
  email: Mail,
  clock: Clock,
  mapPin: MapPin,
  location: MapPin,
  search: Search,
  arrowRight: ArrowRight,
  play: Play,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  hardHat: HardHat,
  construction: HardHat,
  hammer: Hammer,
  building: Building2,
  trendingUp: TrendingUp,
  users: Users,
  award: Award,
  check: CheckCircle2,
  quote: Quote,
  star: Star,
  calendar: Calendar,
  menu: Menu,
  close: X,
  home: Home,
  pencil: Pencil,
  clipboard: Clipboard,
  settings: Settings,
  paintBrush: PaintBucket,
  tree: TreeDeciduous,
};

export type IconName = keyof typeof iconMap;

export interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Icon({ name, size = 'md', className }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <IconComponent 
      className={clsx(sizeClasses[size], className)} 
      strokeWidth={2}
    />
  );
}


