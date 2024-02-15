import React from 'react';
import cn from 'classnames';
import { Icon, Loading } from '../';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'clear' | 'link'
  theme?: 'light' | 'dark'
  icon?: string
  isLoading?: boolean
};

export const Button = ({
  className,
  size = 'md',
  variant = 'primary',
  theme = 'dark',
  icon,
  children,
  isLoading,
  type = 'button',
  ...props
}: ButtonProps) => {
  const classes = cn(
    'focus:ring-4 focus:outline-none focus:ring-blue-800 rounded-md mb-2 flex justify-center items-center space-x-2 transition-all duration-200 ease-in-out',
    size === 'xs' && 'text-xs py-0.5 px-2',
    size === 'sm' && 'text-sm py-1 px-3',
    size === 'md' && 'text-md py-2.5 px-5',
    variant === 'primary' && 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br',
    variant === 'clear' && 'border border-white',
    variant === 'link' && 'text-blue-500 hover:underline',
    theme === 'light' && '!text-slate-900 !border-slate-900',
    className && className
  );

  return (
    <button className={classes} {...props} disabled={isLoading} type={type}>
      {isLoading
        ? <Loading />
        : <>
          {icon && <Icon name={icon} size={4} />}
          <span>{children}</span>
        </>
      }
    </button>
  );
};
