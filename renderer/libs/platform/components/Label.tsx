import React from 'react';

interface LabelProps extends React.InputHTMLAttributes<HTMLLabelElement> {}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label
      className="block font-medium mb-2"
      {...props}
    >
      {children}
    </label>
  );
};
