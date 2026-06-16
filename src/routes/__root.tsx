import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "../lib/cart";
import { WishlistProvider } from "../lib/wishlist";
import { UIProvider } from "../lib/ui";
import { LumiWidget } from "../components/LumiWidget";
import { MobileDrawer } from "../components/MobileDrawer";
import { BottomBar } from "../components/BottomBar";

const tailwindConfigScript = `
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "surface-container-lowest": "#ffffff",
          "outline": "#74777e",
          "primary-container": "#17324d",
          "error": "#ba1a1a",
          "accent-coral": "#FF786F",
          "on-tertiary-fixed": "#261a00",
          "on-secondary": "#ffffff",
          "tertiary-container": "#402e00",
          "on-surface-variant": "#43474d",
          "on-surface": "#1d1c17",
          "on-tertiary-fixed-variant": "#5b4300",
          "on-secondary-container": "#fefcff",
          "success-mint": "#72D6B2",
          "surface-variant": "#e6e2da",
          "on-tertiary": "#ffffff",
          "primary": "#001d36",
          "tertiary": "#261a00",
          "background": "#fef9f1",
          "on-tertiary-container": "#c1910c",
          "on-background": "#1d1c17",
          "inverse-surface": "#32302b",
          "surface-container-highest": "#e6e2da",
          "on-error": "#ffffff",
          "secondary-container": "#316fe2",
          "on-primary-fixed-variant": "#2f4865",
          "tertiary-fixed": "#ffdf9e",
          "surface": "#FFFFFF",
          "surface-tint": "#47607e",
          "on-error-container": "#93000a",
          "surface-bright": "#fef9f1",
          "secondary-fixed": "#d9e2ff",
          "on-primary-container": "#819aba",
          "surface-container-high": "#ece8e0",
          "outline-variant": "#c3c6ce",
          "primary-fixed": "#d1e4ff",
          "on-primary-fixed": "#001d36",
          "secondary-fixed-dim": "#b0c6ff",
          "on-primary": "#ffffff",
          "secondary": "#0055c7",
          "inverse-on-surface": "#f5f0e8",
          "surface-dim": "#ded9d2",
          "error-container": "#ffdad6",
          "surface-container-low": "#f8f3eb",
          "on-secondary-fixed": "#001945",
          "tertiary-fixed-dim": "#f4bf40",
          "on-secondary-fixed-variant": "#00429c",
          "primary-fixed-dim": "#afc9ea",
          "inverse-primary": "#afc9ea",
          "surface-container": "#f2ede5"
        },
        borderRadius: {
          DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px", "2xl": "1.375rem"
        },
        spacing: {
          "margin-desktop": "48px", "margin-mobile": "16px", gutter: "24px",
          unit: "8px", "container-max": "1200px"
        },
        fontFamily: {
          "label-md": ["Inter"], "label-sm": ["Inter"],
          "display-lg": ["Fredoka", "Plus Jakarta Sans"],
          "headline-lg": ["Fredoka", "Plus Jakarta Sans"],
          "body-lg": ["Inter"], "headline-lg-mobile": ["Fredoka", "Plus Jakarta Sans"],
          "headline-sm": ["Fredoka", "Plus Jakarta Sans"],
          "headline-md": ["Fredoka", "Plus Jakarta Sans"], "body-md": ["Inter"]
        },
        fontSize: {
          "label-md":  ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }],
          "label-sm":  ["12px", { lineHeight: "16px", fontWeight: "500" }],
          "display-lg":["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
          "headline-lg":["32px", { lineHeight: "40px", fontWeight: "700" }],
          "body-lg":   ["18px", { lineHeight: "28px", fontWeight: "400" }],
          "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "700" }],
          "headline-sm":["20px", { lineHeight: "28px", fontWeight: "600" }],
          "headline-md":["24px", { lineHeight: "32px", fontWeight: "600" }],
          "body-md":   ["16px", { lineHeight: "24px", fontWeight: "400" }]
        }
      }
    }
  };
`;

const globalCss = `
  body { background-color: #fef9f1; color: #1d1c17; font-family: Inter, sans-serif; }
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
    font-weight: normal; font-style: normal; line-height: 1; display: inline-block;
    text-transform: none; letter-spacing: normal; white-space: nowrap; word-wrap: normal;
    direction: ltr; -webkit-font-feature-settings: 'liga'; -webkit-font-smoothing: antialiased;
  }
  .material-symbols-outlined[data-weight="fill"],
  .material-symbols-outlined.fill,
  .material-symbols-outlined.filled,
  .material-symbols-outlined.icon-fill { font-variation-settings: 'FILL' 1; }

  /* Hide inline footers on HTML screens — replaced by BottomBar */
  [data-screen] footer { display: none !important; }

  /* ── Legacy HTML-screen normalisation ──────────────────────────────
     Every screen now gets the shared <SiteHeader/>. Hide each screen's
     own top nav-bar and fixed side-drawer, and drop the left offset that
     only existed to clear that drawer, so all screens match the React
     pages' top-header layout. (Content <header> tags nested inside
     <main> — e.g. page titles — are left untouched.) */
  [data-screen] > header,
  [data-screen] header[class~="md:hidden"] { display: none !important; }
  [data-screen] > nav.fixed,
  [data-screen] aside.fixed,
  [data-screen] nav.fixed { display: none !important; }
  [data-screen] main { margin-left: 0 !important; }

  /* Ensure page content clears the fixed BottomBar */
  body { padding-bottom: 60px; }
  @media (min-width: 768px) { body { padding-bottom: 44px; } }

  /* Bounce animation for Lumi typing dots (used in both widget and chat page) */
  @keyframes lumi-bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
    40%            { transform: translateY(-7px); opacity: 1; }
  }
`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Page not found</p>
        <a href="/" className="mt-6 inline-block rounded-full bg-[#0055c7] px-4 py-2 text-sm font-medium text-white">Go home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm">Something went wrong.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-[#0055c7] px-4 py-2 text-sm font-medium text-white"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Little Readers" },
      { name: "description", content: "Curated educational books for young learners." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" },
    ],
    scripts: [
      { src: "https://cdn.tailwindcss.com?plugins=forms,container-queries" },
      { children: tailwindConfigScript },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: globalCss }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <UIProvider>
            <Outlet />
            {/* Global overlays — rendered on every page */}
            <BottomBar />
            <LumiWidget />
            <MobileDrawer />
          </UIProvider>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
