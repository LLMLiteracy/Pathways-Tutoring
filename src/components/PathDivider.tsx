export function PathDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      className={`h-6 w-40 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 20C40 20 40 4 78 4C116 4 116 20 154 20C176 20 184 12 198 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
      <circle cx="198" cy="12" r="4" fill="currentColor" />
    </svg>
  );
}
