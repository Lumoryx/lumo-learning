import { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export function Card({ children, className = '', style, onClick }: CardProps) {
  return (
    <div
      className={`lumo-card ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
