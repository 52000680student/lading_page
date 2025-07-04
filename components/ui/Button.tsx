'use client';

import { ButtonProps } from '@/types';
import { clsx } from 'clsx';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'default',
  className,
  href,
  disabled,
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    outline: 'btn-outline',
  };
  const sizeClasses = {
    default: '',
    large: 'btn-large',
  };

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-70 cursor-not-allowed' : '',
    className
  );

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || !onClick) return;
    onClick();
  };

  if (href && !disabled) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;