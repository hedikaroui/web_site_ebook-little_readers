import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useUI } from "@/lib/ui";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/",            icon: "home",           label: "Home" },
  { to: "/catalogue",   icon: "menu_book",      label: "Browse Books" },
  { to: "/parent-space",icon: "family_restroom",label: "Parent Space" },
  { to: "/orders",      icon: "receipt_long",   label: "My Orders" },
  { to: "/dashboard",   icon: "insights",       label: "Reading Insights" },
  { to: "/community",   icon: "group",          label: "Parent Community" },
  { to: "/chat",        icon: "support_agent",  label: "Ask Lumi" },
] as const;

const FOOTER_NAV = [
  { to: "/about",     label: "About" },
  { to: "/contact",   label: "Contact" },
  { to: "/faq",       label: "FAQ" },
  { to: "/community", label: "Community" },
] as const;

export function MobileDrawer() {
  const { drawerOpen, closeDrawer } = useUI();
  const { count } = useCart();

  // Close on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [drawerOpen, closeDrawer]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[990] bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? "auto" : "none" }}
        onClick={closeDrawer}
        aria-hidden
      />

      {/* Drawer */}
      <div
        className="fixed left-0 top-0 z-[991] h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out"
        style={{ transform: drawerOpen ? "translateX(0)" : "translateX(-100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#e6e2da]">
          <Link to="/" onClick={closeDrawer} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#17324d] text-white">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>book</span>
            </div>
            <span className="font-['Fredoka',sans-serif] text-lg font-bold text-[#001d36]">Little Readers</span>
          </Link>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-full text-[#74777e] hover:bg-[#f2ede5] transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              preload="intent"
              onClick={closeDrawer}
              className="flex items-center gap-3 px-4 py-3 rounded-full text-[#43474d] hover:bg-[#f2ede5] hover:text-[#001d36] transition-colors group"
            >
              <span className="material-symbols-outlined text-[20px] text-[#74777e] group-hover:text-[#0055c7] transition-colors">
                {item.icon}
              </span>
              <span className="text-[14px] font-medium">{item.label}</span>
            </Link>
          ))}

          <div className="border-t border-[#e6e2da] pt-3 mt-3 space-y-1">
            <Link
              to="/cart"
              preload="intent"
              onClick={closeDrawer}
              className="flex items-center gap-3 px-4 py-3 rounded-full text-[#43474d] hover:bg-[#f2ede5] hover:text-[#001d36] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] text-[#74777e]">shopping_cart</span>
              <span className="text-[14px] font-medium">My Cart</span>
              {count > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#FF786F] text-white text-[11px] font-bold">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Footer links */}
        <div className="px-5 py-4 border-t border-[#e6e2da]">
          <div className="flex gap-4 flex-wrap">
            {FOOTER_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeDrawer}
                className="text-xs text-[#74777e] hover:text-[#001d36] hover:underline underline-offset-4 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#74777e] hover:text-[#001d36] hover:underline underline-offset-4 transition-colors">
              Socials
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
