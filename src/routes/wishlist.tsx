import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";
import { useWishlist, type WishlistItem } from "@/lib/wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — Little Readers" },
      { name: "description", content: "Books you've saved to read or buy later." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items, remove, clear } = useWishlist();
  const cart = useCart();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const moveToCart = useCallback(
    (item: WishlistItem) => {
      cart.add({
        id: item.id, title: item.title, author: item.author,
        price: item.price, priceNum: item.priceNum, img: item.img,
      });
      remove(item.id);
      showToast("Moved to cart!");
    },
    [cart, remove, showToast]
  );

  return (
    <div className="bg-[#fef9f1] min-h-screen flex flex-col font-['Inter',sans-serif]">
      <SiteHeader />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-12 py-8">
        {/* Heading */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-['Fredoka',sans-serif] text-2xl md:text-3xl font-bold text-[#001d36] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FF786F] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              My Wishlist
            </h1>
            <p className="text-sm text-[#74777e] mt-1">
              {items.length === 0
                ? "Save books to read or buy later."
                : `${items.length} saved book${items.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="text-sm font-medium text-[#74777e] hover:text-[#FF786F] transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#fce4d6] mb-5">
              <span className="material-symbols-outlined text-[40px] text-[#FF786F]">favorite</span>
            </div>
            <h2 className="font-['Fredoka',sans-serif] text-xl font-semibold text-[#001d36] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-[#43474d] max-w-sm mb-6">
              Tap the heart on any book to save it here for later.
            </p>
            <Link
              to="/catalogue"
              preload="intent"
              className="inline-flex items-center gap-2 bg-[#0055c7] hover:bg-[#004bb0] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#e6e2da] shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col group"
              >
                {/* Cover */}
                <Link to="/book" preload="intent" className="block">
                  <div
                    className="h-48 flex items-center justify-center relative overflow-hidden"
                    style={
                      item.img
                        ? { background: "#f8f3eb" }
                        : { background: `linear-gradient(135deg, ${item.gradient?.[0] ?? "#d1e4ff"}, ${item.gradient?.[1] ?? "#afc9ea"})` }
                    }
                  >
                    {item.img ? (
                      <img
                        alt={item.title}
                        src={item.img}
                        className="h-full w-auto object-contain p-4 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-[56px] text-white/40" style={{ fontVariationSettings: "'FILL' 1" }}>
                        menu_book
                      </span>
                    )}
                  </div>
                </Link>

                {/* Details */}
                <div className="p-4 flex flex-col flex-1">
                  <Link to="/book" preload="intent">
                    <h3 className="text-[14px] font-semibold text-[#001d36] line-clamp-2 mb-0.5 leading-snug hover:text-[#0055c7] transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-[12px] text-[#74777e] mb-4">{item.author}</p>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <span className="text-lg font-bold text-[#001d36]">{item.price}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => remove(item.id)}
                        aria-label="Remove from wishlist"
                        title="Remove"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e6e2da] text-[#74777e] hover:border-[#FF786F] hover:text-[#FF786F] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                      <button
                        onClick={() => moveToCart(item)}
                        className="flex items-center gap-1.5 bg-[#0055c7] hover:bg-[#004bb0] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors shadow-sm active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Toast */}
      <div
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#001d36] text-white px-4 py-3 rounded-2xl shadow-xl text-sm font-medium transition-all duration-300 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <span className="material-symbols-outlined text-[#72D6B2] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          check_circle
        </span>
        {toast ?? ""}
      </div>
    </div>
  );
}
