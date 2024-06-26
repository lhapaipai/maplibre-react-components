export default function ReactLogo() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="-10.5 -10.5 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="0" cy="0" r="2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="10" ry="4.5" />
        <ellipse rx="10" ry="4.5" transform="rotate(60)" />
        <ellipse rx="10" ry="4.5" transform="rotate(120)" />
      </g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="15s"
        values="0 0 0;360 0 0;"
        repeatCount="indefinite"
      />
    </svg>
  );
}
