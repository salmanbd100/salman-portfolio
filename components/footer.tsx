import { TrackedLink } from "@/components/tracked-link";

const linkClass =
  "text-[0.72rem] text-ink3 no-underline transition-colors duration-150 hover:text-ink";

export function Footer() {
  return (
    <footer className="border-t border-bg3 px-7 py-5 max-w-[1060px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
      <p className="text-[0.72rem] text-ink3">
        &copy; 2026 Salman Rahman &middot; Senior Software Engineer &middot;
        Dhaka, Bangladesh
      </p>
      <ul className="flex gap-4 list-none">
        <li>
          <TrackedLink
            href="mailto:salman.bd100@gmail.com"
            event="contact_click"
            eventProps={{ channel: "email", location: "footer" }}
            className={linkClass}
          >
            Email
          </TrackedLink>
        </li>
        <li>
          <TrackedLink
            href="https://linkedin.com/in/salmanbd"
            target="_blank"
            rel="noopener noreferrer"
            event="contact_click"
            eventProps={{ channel: "linkedin", location: "footer" }}
            className={linkClass}
          >
            LinkedIn
          </TrackedLink>
        </li>
        <li>
          <TrackedLink
            href="https://github.com/salmanbd100"
            target="_blank"
            rel="noopener noreferrer"
            event="contact_click"
            eventProps={{ channel: "github", location: "footer" }}
            className={linkClass}
          >
            GitHub
          </TrackedLink>
        </li>
        <li>
          <TrackedLink
            href="/Salman_Rahman_Resume.pdf"
            download
            event="cv_download"
            eventProps={{ location: "footer" }}
            className={linkClass}
          >
            Resume PDF
          </TrackedLink>
        </li>
      </ul>
    </footer>
  );
}
