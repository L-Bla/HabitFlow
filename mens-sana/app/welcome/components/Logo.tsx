export function Logo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      
      {/* Rounded square background */}
      <rect width="100" height="100" rx="20" fill="url(#logoGradient)" />
      
      {/* Checkmark circles representing habit completion */}
      <circle cx="30" cy="35" r="8" fill="white" opacity="0.9" />
      <circle cx="50" cy="35" r="8" fill="white" opacity="0.9" />
      <circle cx="70" cy="35" r="8" fill="white" opacity="0.6" />
      
      {/* Flow wave underneath */}
      <path
        d="M 15 65 Q 30 55, 45 65 T 85 65"
        stroke="white"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Checkmark on first circle */}
      <path
        d="M 26 35 L 29 38 L 35 32"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Checkmark on second circle */}
      <path
        d="M 46 35 L 49 38 L 55 32"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
