import React from 'react';

export default function LogoIcon({ className = "w-8 h-8", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {/* Libro / Base */}
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      
      {/* Gráfico de línea con flecha (Ziga-zag ascendente) */}
      <path d="M5 14l4-4 3 3 6-7" />
      <path d="M14 6h4v4" />
      
      {/* Barras verticales */}
      <path d="M9 16v-2" />
      <path d="M13 16v-4" />
      <path d="M17 16v-6" />
    </svg>
  );
}
