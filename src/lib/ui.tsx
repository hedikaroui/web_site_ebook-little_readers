import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type UICtx = {
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  lumiOpen: boolean;
  openLumi: () => void;
  closeLumi: () => void;
};

const UIContext = createContext<UICtx | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lumiOpen, setLumiOpen] = useState(false);

  const openDrawer  = useCallback(() => setDrawerOpen(true),  []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openLumi    = useCallback(() => setLumiOpen(true),    []);
  const closeLumi   = useCallback(() => setLumiOpen(false),   []);

  return (
    <UIContext.Provider value={{ drawerOpen, openDrawer, closeDrawer, lumiOpen, openLumi, closeLumi }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be inside UIProvider");
  return ctx;
}
