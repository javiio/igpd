import React from 'react';
import * as Ci from 'react-icons/ci';
import * as Fi from 'react-icons/fi';

interface IconProps {
  name: string
  size?: string | number
  className?: string
}

const ICONS_MAP = {
  menu: Ci.CiMenuFries,
  plus: Fi.FiPlus,
  x: Fi.FiX,
  more: Fi.FiMoreHorizontal,
  edit: Fi.FiEdit,
  remove: Fi.FiTrash2,
  actionItems: Ci.CiBoxList,
  link: Fi.FiLink,
  external: Fi.FiExternalLink,
  copy: Fi.FiCopy,
  check: Fi.FiCheck,
  comment: Fi.FiMessageCircle,
  prev: Fi.FiChevronLeft,
  next: Fi.FiChevronRight,
  down: Fi.FiChevronDown,
  play: Ci.CiPlay1,
  minus: Fi.FiMinus,
  checkbox: Fi.FiCheckSquare,
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
