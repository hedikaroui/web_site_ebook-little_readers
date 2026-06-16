import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type WishlistItem = {
  id: string;
  title: string;
  author: string;
  price: string;
  priceNum: number;
  img?: string;
  gradient?: [string, string];
};

type WishlistCtx = {
  items: WishlistItem[];
  count: number;
  has: (id: string) => boolean;
  toggle: (item: WishlistItem) => boolean; // returns true if now saved
  remove: (id: string) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const has = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  const toggle = useCallback((item: WishlistItem) => {
    let nowSaved = false;
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      nowSaved = true;
      return [...prev, item];
    });
    return nowSaved;
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.length;

  return (
    <WishlistContext.Provider value={{ items, count, has, toggle, remove, clear }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
