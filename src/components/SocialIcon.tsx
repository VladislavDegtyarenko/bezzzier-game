const paths = {
  LinkedIn:
    'M5 8a1.75 1.75 0 1 0 0-3.5A1.75 1.75 0 0 0 5 8Zm-1.5 2h3v10h-3V10Zm5.5 0h3v1.4a3.5 3.5 0 0 1 6.5 1.9V20h-3v-5.9a1.75 1.75 0 0 0-3.5 0V20H9V10Z',
  X: 'M5 4h4.4l4 5.4L18 4h2l-5.6 6.6L20 20h-4.4l-4.4-6.1L6 20H4l6.2-7.3L5 4Zm2.6 1.4 8.7 13.2h1.3L8.7 5.4H7.6Z',
  Telegram: 'M21 4 3 11l5 2 2 5 3-3 4 3 4-14Zm-11 9 7-5-5.5 6-.9 2-.6-3Z',
  WhatsApp:
    'M12 3a9 9 0 0 0-7.9 13.3L3 21l4.8-1.1A9 9 0 1 0 12 3Zm0 1.6a7.4 7.4 0 1 1-3.8 13.8l-.3-.2-2.7.6.7-2.7-.2-.3A7.4 7.4 0 0 1 12 4.6ZM9.5 8c-.7 0-1.4.7-1.4 1.7 0 2.1 2.7 5 5 5.8 1.2.4 2.3-.2 2.6-1.1.1-.4 0-.6-.3-.7l-1.6-.8c-.2-.1-.4 0-.5.2l-.6.7c-1.3-.5-2.4-1.6-2.9-2.7l.5-.6c.2-.2.2-.4.1-.7l-.6-1.4c-.1-.3-.2-.4-.3-.4Z',
};

export function SocialIcon({ name }: { name: keyof typeof paths }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
