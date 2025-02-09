import React, { HTMLAttributes } from "react";
import { clsx } from 'clsx';
import cls from './button.module.sass';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  className,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        cls.button,
        { [cls.button_disabled]: disabled },
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}    
    </button>
  );
};