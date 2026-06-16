import { Link } from "@tanstack/react-router";

const SOCIALS = [
  { icon: "camera_alt", label: "Instagram", href: "https://instagram.com" },
  { icon: "facebook", label: "Facebook",  href: "https://facebook.com" },
];

export function PageFooter() {
  return (
    <footer className="bg-[#f2ede5] border-t border-[#e6e2da] mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link to="/" preload="intent" className="font-['Fredoka',sans-serif] text-xl font-bold text-[#001d36] hover:text-[#0055c7] transition-colors">
              Little Readers
            </Link>
            <span className="text-xs text-[#74777e]">© 2024 Little Readers Educational Bookshop</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-5" aria-label="Footer navigation">
            <Link to="/about" preload="intent" className="text-sm font-medium text-[#43474d] hover:text-[#0055c7] underline-offset-4 hover:underline transition-colors">About</Link>
            <Link to="/contact" preload="intent" className="text-sm font-medium text-[#43474d] hover:text-[#0055c7] underline-offset-4 hover:underline transition-colors">Contact</Link>
            <Link to="/faq" preload="intent" className="text-sm font-medium text-[#43474d] hover:text-[#0055c7] underline-offset-4 hover:underline transition-colors">FAQ</Link>
            <Link to="/community" preload="intent" className="text-sm font-medium text-[#43474d] hover:text-[#0055c7] underline-offset-4 hover:underline transition-colors">Community</Link>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-sm font-medium text-[#43474d] hover:text-[#0055c7] underline-offset-4 hover:underline transition-colors">
                {s.label}
              </a>
            ))}
          </nav>

          {/* Mini links */}
          <div className="flex gap-4 text-xs text-[#74777e]">
            <a href="#" className="hover:text-[#001d36] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#001d36] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#001d36] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
