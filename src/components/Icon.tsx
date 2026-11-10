const paths = {
  lock: 'M7 10V7a5 5 0 0 1 10 0v3M6 10h12v10H6z',
  check: 'm5 12 4 4L19 6',
  play: 'm9 5 10 7-10 7z',
  loop: 'M19 8a8 8 0 1 0 1 7M19 3v5h-5',
  next: 'M4 12h15m-6-6 6 6-6 6',
  copy: 'M8 8h12v12H8zM16 8V4H4v12h4',
  flag: 'M5 21V4m0 1c5-4 9 4 15 0v11c-6 4-10-4-15 0',
  mark: 'M3 19C9 19 8 5 21 5M3 17v4m18-18v4',
};

export function Icon({ name }: { name: keyof typeof paths }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
