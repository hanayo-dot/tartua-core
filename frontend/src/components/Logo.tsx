interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  includeText?: boolean;
}

export default function Logo({ size = 'medium', includeText = false }: LogoProps) {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const height = sizeMap[size];
  const width = includeText ? height * 4 : height;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular background */}
      <circle cx="30" cy="30" r="28" fill="#2563eb" opacity="0.1" />

      {/* Logo symbol - upward arrow/growth */}
      <g>
        {/* Base shape - stylized T for Tartua */}
        <path
          d="M 20 45 L 40 45 L 40 35 L 50 25 L 40 15 L 40 25 L 20 25 Z"
          fill="#2563eb"
        />
        {/* Growth indicator - ascending line */}
        <path
          d="M 15 40 L 25 30 L 35 35 L 45 20"
          stroke="#2563eb"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Text if included */}
      {includeText && (
        <text
          x="70"
          y="40"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="32"
          fontWeight="700"
          fill="#1a202c"
          letterSpacing="-0.5"
        >
          Tartua
        </text>
      )}
    </svg>
  );
}
