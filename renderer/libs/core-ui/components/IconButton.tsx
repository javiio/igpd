import React from 'react';
import { Icon } from '../';

interface IconButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  name: string
  size?: string | number
  className?: string
  iconClassName?: string
}

export const IconButton = ({
  name,
  size,
  className = '',
  iconClassName = '',
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={`hover:bg-white/5 rounded-md p-[1px] opacity-90 hover:opacity-100 hover:text-blue-400 transition-all duration-150 ${className}`}
      {...props}
    >
      <Icon name={name} size={size} className={iconClassName} />
    </button>
  );
};
