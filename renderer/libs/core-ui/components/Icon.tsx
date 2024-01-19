import React from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { FiPlus, FiX, FiMoreHorizontal, FiEdit, FiTrash2 } from 'react-icons/fi';

interface IconProps {
  name: string
  size?: string | number
  className?: string
}

const ICONS_MAP = {
  menu: CiMenuFries,
  plus: FiPlus,
  x: FiX,
  more: FiMoreHorizontal,
  edit: FiEdit,
  remove: FiTrash2,
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
