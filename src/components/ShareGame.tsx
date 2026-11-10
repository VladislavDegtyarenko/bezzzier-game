import { useRef, useState } from 'react';
import { Icon } from './Icon.tsx';
import { SocialIcon } from './SocialIcon.tsx';

export function ShareGame() {
  const dialog = useRef<HTMLDialogElement>(null);
  const linkField = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState('');
  const link = window.location.origin + window.location.pathname;
  const url = encodeURIComponent(link);
  const message = encodeURIComponent(
    'Can you match the motion in Bezzzier Game?',
  );
  const networks = [
    {
      name: 'LinkedIn' as const,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      name: 'X' as const,
      href: `https://twitter.com/intent/tweet?url=${url}&text=${message}`,
    },
    {
      name: 'Telegram' as const,
      href: `https://t.me/share/url?url=${url}&text=${message}`,
    },
    {
      name: 'WhatsApp' as const,
      href: `https://wa.me/?text=${message}%20${url}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      setStatus('Link copied.');
    } catch {
      linkField.current?.focus();
      linkField.current?.select();
      setStatus('Copy the selected link to share it.');
    }
  }

  return (
    <>
      <button
        type="button"
        className="action primary"
        onClick={() => {
          setStatus('');
          dialog.current?.showModal();
        }}
      >
        Share game
      </button>
      <dialog
        className="share-dialog"
        ref={dialog}
        aria-labelledby="share-title"
      >
        <div className="panel-heading">
          <h2 id="share-title">Share game</h2>
          <form method="dialog">
            <button type="submit" className="quiet">
              Close
            </button>
          </form>
        </div>
        <label className="share-label" htmlFor="game-link">
          Game link
        </label>
        <div className="share-link">
          <input id="game-link" ref={linkField} value={link} readOnly />
          <button
            type="button"
            className="action primary icon-action"
            aria-label="Copy link"
            title="Copy link"
            onClick={copyLink}
          >
            <Icon name="copy" />
          </button>
        </div>
        <p className="share-status" role="status">
          {status}
        </p>
        <p className="share-divider">OR</p>
        <fieldset className="share-networks" aria-label="Social networks">
          {networks.map(({ name, href }) => (
            <a
              className="action icon-action"
              key={name}
              aria-label={name}
              title={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon name={name} />
            </a>
          ))}
        </fieldset>
      </dialog>
    </>
  );
}
