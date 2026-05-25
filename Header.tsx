import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <rect width="24" height="24" rx="6" fill="#4f46e5" />
            <path
              d="M6 15L10 9L14 15"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-semibold text-lg text-royal-800">
            The Lookbook
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/projects"
            className="text-slate-700 hover:text-royal-600"
          >
            Projects
          </Link>
          <Link href="/about" className="text-slate-700 hover:text-royal-600">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
