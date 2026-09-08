export default function Footer() {
  return (
    <footer className="border-t border-biddo-line/70 py-10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-3 px-5 text-sm text-ink/50 sm:flex-row sm:justify-between sm:px-8">
        <a
          href="#top"
          className="font-display text-lg text-ink/70 transition-colors hover:text-ink"
        >
          Biddo
        </a>
        <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-4">
          <p>Building in India. Pre-launch.</p>
          <a
            href="mailto:biddomarketplace@gmail.com"
            className="transition-colors hover:text-ink"
          >
            biddomarketplace@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
