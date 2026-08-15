/**
 * The PDF Master mark: three pages stacked and fanned, the front one with its
 * top-right corner turned down. Same geometry as the Android app's vector — the
 * fold is cut at 68% across and 26% down the front page.
 */
export function Mark({
  size = 40,
  variant = "tiled",
  className,
}: {
  size?: number;
  /** "tiled" sits on the ink-blue tile; "fanned" is the loose stack for dark grounds. */
  variant?: "tiled" | "fanned";
  className?: string;
}) {
  if (variant === "fanned") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={className}
        role="img"
        aria-label="PDF Master"
      >
        <rect
          x="15.6"
          y="11.5"
          width="71.9"
          height="83.6"
          rx="9.4"
          fill="#2B3F7D"
          transform="rotate(-9 51.55 53.3)"
        />
        <rect
          x="21.9"
          y="7.7"
          width="71.9"
          height="83.6"
          rx="9.4"
          fill="#F0A323"
          transform="rotate(5 57.85 49.5)"
        />
        <path
          d="M22.9 2.9 H62.4 L85.4 21.6 V77.1 A9.4 9.4 0 0 1 76 86.5 H22.9 A9.4 9.4 0 0 1 13.5 77.1 V12.3 A9.4 9.4 0 0 1 22.9 2.9 Z"
          fill="#FFFFFF"
        />
        <path d="M62.4 2.9 L85.4 21.6 H62.4 Z" fill="#DCD6CC" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="PDF Master"
    >
      <rect width="100" height="100" rx="23" fill="#2B3F7D" />
      <rect
        x="27.1"
        y="22.9"
        width="47.9"
        height="60.4"
        rx="6.25"
        fill="#F0A323"
        transform="rotate(6 51.05 53.1)"
      />
      <path
        d="M27.1 18.75 H53.4 L68.7 34.5 V72.9 A6.25 6.25 0 0 1 62.4 79.15 H27.1 A6.25 6.25 0 0 1 20.8 72.9 V25 A6.25 6.25 0 0 1 27.1 18.75 Z"
        fill="#FFFFFF"
      />
      <path d="M53.4 18.75 L68.7 34.5 H53.4 Z" fill="#CFD6E8" />
    </svg>
  );
}

/** Mark plus wordmark. */
export function Lockup({
  size = 34,
  variant = "tiled",
  className = "",
  textClassName = "text-industry-ink",
}: {
  size?: number;
  variant?: "tiled" | "fanned";
  className?: string;
  textClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark size={size} variant={variant} />
      <span
        className={`font-heading font-bold uppercase tracking-[0.16em] ${textClassName}`}
        style={{ fontSize: size * 0.52 }}
      >
        PDF Master
      </span>
    </span>
  );
}
