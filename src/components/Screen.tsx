import { useCallback, useEffect, useRef } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useUI } from "@/lib/ui";
import { SiteHeader } from "./SiteHeader";

// Linear prototype flow — every screen advances to the next on button/placeholder-link click
const flow: { path: string; label: string }[] = [
  { path: "/",             label: "Welcome" },
  { path: "/signup",       label: "Sign Up" },
  { path: "/login",        label: "Log In" },
  { path: "/parent-space", label: "Parent Space" },
  { path: "/catalogue",    label: "Catalogue" },
  { path: "/book",         label: "Book" },
  { path: "/cart",         label: "Cart" },
  { path: "/delivery",     label: "Delivery" },
  { path: "/payment",      label: "Payment" },
  { path: "/confirmation", label: "Confirmation" },
  { path: "/orders",       label: "Orders" },
  { path: "/track",        label: "Track" },
  { path: "/dashboard",    label: "Dashboard" },
  { path: "/rate",         label: "Rate" },
  { path: "/chat",         label: "Chat" },
  { path: "/community",    label: "Community" },
  { path: "/about",        label: "About" },
  { path: "/contact",      label: "Contact" },
  { path: "/faq",          label: "FAQ" },
];

// Named link text → real route (header nav, footer, sidebar)
const NAMED_ROUTES: Record<string, string> = {
  "about": "/about",
  "contact": "/contact",
  "faq": "/faq",
  "community": "/community",
  "join community": "/community",
  "join the community": "/community",
  "parent community": "/community",
  "books": "/catalogue",
  "browse books": "/catalogue",
  "teachers' choice": "/catalogue",
  "school years": "/catalogue",
  "sale": "/catalogue",
  "my orders": "/orders",
  "orders": "/orders",
  "my children": "/parent-space",
  "children": "/parent-space",
  "parent space": "/parent-space",
  "reading insights": "/dashboard",
  "ask lumi": "/chat",
  "chat with lumi": "/chat",
  "little readers": "/",
};

export function Screen({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { openDrawer, openLumi } = useUI();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const idx = flow.findIndex((s) => s.path === pathname);
  const next = idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : null;

  const handler = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // Never intercept real form inputs
      if (target.closest("select, input, textarea, label")) return;

      // ── Anchor clicks ───────────────────────────────────────────────
      const a = target.closest("a") as HTMLAnchorElement | null;
      if (a) {
        const href = a.getAttribute("href") ?? "";
        const text = (a.textContent ?? "").trim().toLowerCase();

        // Real external link → let browser handle it
        if (href.startsWith("http") || href.startsWith("mailto")) return;

        // Real internal route already set → let TanStack Router handle normally
        if (href.startsWith("/") && href !== "/") {
          e.preventDefault();
          navigate({ to: href as "/" });
          return;
        }

        // Named route map (footer, sidebar, header nav)
        const mapped = NAMED_ROUTES[text];
        if (mapped) {
          e.preventDefault();
          navigate({ to: mapped as "/" });
          return;
        }

        // Socials → open new tab
        if (text === "socials") {
          e.preventDefault();
          window.open("https://instagram.com", "_blank", "noopener");
          return;
        }

        // Placeholder href="#" → advance flow
        if ((!href || href === "#") && next) {
          e.preventDefault();
          navigate({ to: next.path });
        }
        return;
      }

      // ── Button clicks ───────────────────────────────────────────────
      const btn = target.closest("button") as HTMLButtonElement | null;
      if (!btn || btn.getAttribute("type") === "submit") return;

      const icon = btn.querySelector(".material-symbols-outlined")?.textContent?.trim();
      const text  = btn.textContent?.trim().toLowerCase() ?? "";

      // Hamburger / menu icon → open mobile drawer
      if (icon === "menu" || text === "menu" || btn.getAttribute("aria-label")?.toLowerCase() === "menu") {
        e.preventDefault();
        openDrawer();
        return;
      }

      // "Chat with Lumi" / "Ask Lumi" button → open mini widget
      if (text.includes("chat with lumi") || text.includes("ask lumi")) {
        e.preventDefault();
        openLumi();
        return;
      }

      // Named route buttons
      const mapped = NAMED_ROUTES[text];
      if (mapped) {
        e.preventDefault();
        navigate({ to: mapped as "/" });
        return;
      }

      // Default: advance flow
      if (next) {
        e.preventDefault();
        navigate({ to: next.path });
      }
    },
    [next, navigate, openDrawer, openLumi]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [handler]);

  return (
    <>
      {/* Unified site header on every legacy HTML screen */}
      <SiteHeader />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
      <FlowNav />
    </>
  );
}

export function FlowNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const idx = flow.findIndex((s) => s.path === pathname);
  if (idx < 0) return null;
  const prev = idx > 0 ? flow[idx - 1] : null;
  const next = idx < flow.length - 1 ? flow[idx + 1] : null;
  const current = flow[idx];

  const base: React.CSSProperties = {
    background: "#001d36",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 72,
        right: 16,
        zIndex: 1000,
        display: "flex",
        gap: 8,
        alignItems: "center",
      }}
    >
      {prev && <Link to={prev.path} preload="intent" style={base}>← {prev.label}</Link>}
      <span style={{ ...base, background: "rgba(0,29,54,0.7)" }}>{current.label}</span>
      {next && <Link to={next.path} preload="intent" style={{ ...base, background: "#0055c7" }}>{next.label} →</Link>}
    </div>
  );
}
