import { ReactNode, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'default' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', size = 'default', children, fullWidth, style, ...rest }: ButtonProps) {
  return (
    <button
      className={`lumo-btn lumo-btn--${variant} ${size === 'sm' ? 'lumo-btn--sm' : ''}`}
      style={{ ...(fullWidth ? { width: '100%' } : {}), ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
