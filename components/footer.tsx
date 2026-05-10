export function Footer() {
  return (
    <footer className="border-t border-bg3 px-7 py-5 max-w-[1060px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
      <p className="text-[0.72rem] text-ink3">
        &copy; 2025 Salman Rahman &middot; Senior Frontend Engineer &middot;
        Dhaka, Bangladesh
      </p>
      <ul className="flex gap-4 list-none">
        <li>
          <a
            href="mailto:salman.bd100@gmail.com"
            className="text-[0.72rem] text-ink3 no-underline transition-colors duration-150 hover:text-ink"
          >
            Email
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/salmanbd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.72rem] text-ink3 no-underline transition-colors duration-150 hover:text-ink"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/salmanbd100"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.72rem] text-ink3 no-underline transition-colors duration-150 hover:text-ink"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="/Salman_Rahman_Resume.pdf"
            download
            className="text-[0.72rem] text-ink3 no-underline transition-colors duration-150 hover:text-ink"
          >
            Resume PDF
          </a>
        </li>
      </ul>
    </footer>
  );
}
