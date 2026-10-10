type ChannelCardProps = {
  href: string;
  name: string;
  note?: string;
};

/** Outbound channel link. One shared card so every channel reads as one grid. */
export function ChannelCard({ href, name, note }: ChannelCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full min-h-11 w-full items-center justify-between gap-3 rounded-card border border-hairline bg-surface p-5 text-left transition duration-200 ease-out hover:-translate-y-0.5 hover:border-lapacho focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:hover:translate-y-0"
    >
      <span>
        <span className="block font-semibold text-text">{name}</span>
        {note ? (
          <span className="mt-1 block text-sm text-text-muted">{note}</span>
        ) : null}
      </span>
      <span aria-hidden="true" className="text-text-muted">
        ↗
      </span>
    </a>
  );
}
