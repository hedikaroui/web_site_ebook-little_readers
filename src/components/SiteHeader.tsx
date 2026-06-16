import { Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useUI } from "@/lib/ui";

type NavKey = "books" | "community" | "about" | "contact" | "faq" | "";

interface SiteHeaderProps {
  active?: NavKey;
}

const NAV = [
  { label: "Books",      to: "/catalogue",  key: "books"     },
  { label: "Community",  to: "/community",  key: "community" },
  { label: "About",      to: "/about",      key: "about"     },
  { label: "Contact",    to: "/contact",    key: "contact"   },
  { label: "FAQ",        to: "/faq",        key: "faq"       },
] as const;

export function SiteHeader({ active = "" }: SiteHeaderProps) {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const { openDrawer } = useUI();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-[#e6e2da] shadow-sm sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-4 flex items-center justify-between gap-4">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            className="md:hidden p-1.5 text-[#001d36] hover:text-[#0055c7] transition-colors rounded-lg hover:bg-[#f2ede5]"
            aria-label="Open menu"
            onClick={openDrawer}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <Link
            to="/"
            preload="intent"
            className="flex items-center gap-2 group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#17324d] text-white shrink-0 group-hover:bg-[#0055c7] transition-colors">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>book</span>
            </div>
            <span className="font-['Fredoka',sans-serif] text-xl font-bold text-[#001d36] group-hover:text-[#0055c7] transition-colors">
              Little Readers
            </span>
          </Link>
        </div>

        {/* Centre: desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {NAV.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              preload="intent"
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all whitespace-nowrap ${
                active === item.key
                  ? "bg-[#001d36] text-white shadow-sm"
                  : "text-[#43474d] hover:bg-[#f2ede5] hover:text-[#001d36]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: action icons */}
        <div className="flex items-center gap-1 shrink-0 text-[#001d36]">
          <button
            aria-label="Search books"
            title="Search books"
            onClick={() => navigate({ to: "/catalogue" })}
            className="p-2 rounded-full hover:bg-[#f2ede5] hover:text-[#0055c7] transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <Link
            to="/wishlist"
            preload="intent"
            aria-label={wishCount > 0 ? `Wishlist (${wishCount} saved)` : "Wishlist"}
            title="My Wishlist"
            className="relative p-2 rounded-full hover:bg-[#f2ede5] hover:text-[#FF786F] transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            {wishCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] rounded-full bg-[#FF786F] text-white text-[10px] font-bold flex items-center justify-center px-0.5 shadow-sm">
                {wishCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            preload="intent"
            aria-label={count > 0 ? `Cart (${count} items)` : "Cart"}
            title="My Cart"
            className="relative p-2 rounded-full hover:bg-[#f2ede5] hover:text-[#0055c7] transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
            {count > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] rounded-full bg-[#FF786F] text-white text-[10px] font-bold flex items-center justify-center px-0.5 shadow-sm">
                {count}
              </span>
            )}
          </Link>

          <Link
            to="/parent-space"
            preload="intent"
            aria-label="My account"
            title="Parent Space"
            className="p-2 rounded-full hover:bg-[#f2ede5] hover:text-[#0055c7] transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
