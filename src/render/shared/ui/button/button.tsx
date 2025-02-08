import React, { HTMLAttributes } from "react";
import { clsx } from 'clsx';
import cls from './button.module.sass';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
}

export const Button: React.FC<IButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        cls.button,
        className,
      )}
      {...props}
    >
      {children}    
    </button>
  );
};