import React from 'react';
import LogoIcon from './LogoIcon';

export default function Brand({ className = "", iconClassName = "w-6 h-6", textClassName = "text-lg font-bold tracking-tight text-foreground" }: { className?: string, iconClassName?: string, textClassName?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="text-accent">
        <LogoIcon className={iconClassName} />
      </div>
      <span className={textClassName}>
        Bitácora <span className="text-accent">Fit</span>
      </span>
    </div>
  );
}
