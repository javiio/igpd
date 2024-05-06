import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'secondary'
}

export const Input = ({ variant = 'primary', className, ...props }: InputProps) => {
  const classes = [
    className,
    'rounded-md focus:ring-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block p-2.5',
    variant === 'secondary' ? 'bg-white/5 border border-white/30' : 'bg-slate-900',
  ];

  return (
    <input
      className={classes.join(' ')}
      {...props}
    />
  );
};
