import { Link, useRouterState } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

const ITEMS = [
  { to: "/",           icon: "home",           label: "Home"      },
  { to: "/catalogue",  icon: "menu_book",      label: "Books"     },
  { to: "/cart",       icon: "shopping_cart",  label: "Cart"      },
  { to: "/community",  icon: "group",          label: "Community" },
  { to: "/parent-space", icon: "account_circle", label: "Account" },
] as const;

const INFO = [
  { to: "/about",    label: "About"   },
  { to: "/contact",  label: "Contact" },
  { to: "/faq",      label: "FAQ"     },
] as const;

export function BottomBar() {
  const { count } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[980] font-['Inter',sans-serif]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* ── Mobile: icon nav bar ── */}
      <nav
        className="md:hidden flex items-stretch bg-white border-t border-[#e6e2da] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        aria-label="Bottom navigation"
      >
        {ITEMS.map((item) => {
          const active = isActive(item.to);
          const isCart = item.to === "/cart";
          return (
            <Link
              key={item.to}
              to={item.to}
              preload="intent"
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors ${
                active ? "text-[#0055c7]" : "text-[#74777e] hover:text-[#001d36]"
              }`}
              aria-label={item.label}
            >
              <span className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {isCart && count > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[16px] h-[16px] rounded-full bg-[#FF786F] text-white text-[9px] font-bold flex items-center justify-center px-0.5 leading-none">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </span>
              <span className={`text-[10px] font-medium leading-none ${active ? "text-[#0055c7] font-semibold" : ""}`}>
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-6 h-0.5 rounded-full bg-[#0055c7]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Desktop: slim info bar ── */}
      <div className="hidden md:flex items-center justify-between bg-[#001d36] px-8 py-3">
        <span className="font-['Fredoka',sans-serif] text-sm font-semibold text-white/80">
          Little Readers
          <span className="ml-2 text-white/40 font-normal text-xs">© 2024</span>
        </span>

        <nav className="flex items-center gap-6">
          {INFO.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              preload="intent"
              className={`text-xs font-medium transition-colors ${
                isActive(item.to)
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/community"
            preload="intent"
            className={`text-xs font-medium transition-colors ${
              isActive("/community") ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            Community
          </Link>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-white/60 hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/groups"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-white/60 hover:text-white transition-colors"
          >
            Facebook
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            preload="intent"
            className="relative text-white/70 hover:text-white transition-colors"
            aria-label="Cart"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] rounded-full bg-[#FF786F] text-white text-[9px] font-bold flex items-center justify-center px-0.5">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/parent-space"
            preload="intent"
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Account"
          >
            <span className="material-symbols-outlined text-[18px]">account_circle</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
