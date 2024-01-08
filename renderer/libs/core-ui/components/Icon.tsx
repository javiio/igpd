import React from 'react';
import { CiMenuFries } from 'react-icons/ci';

interface IconProps {
  name: string
  size?: string | number
  className?: string
}

const ICONS_MAP = {
  menu: CiMenuFries,
};

export const Icon = ({ name, size = '5', className = '', ...props }: IconProps) => {
  const IconComp = ICONS_MAP[name];

  if (!IconComp) {
    return null;
  }

  return (
    <IconComp
      className={`h-${size} w-${size} ${className}`}
      {...props}
    />
  );
};
