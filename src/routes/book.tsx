// === FILE: src/routes/book.tsx ===
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useUI } from "@/lib/ui";

// ── Image constants ───────────────────────────────────────────────────────────
const BOOK_COVER =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC0tadGR7qnwXg-OO9qCyKwqKhaoG1O1WEZMSwlnHD7YlJqV-CpPdOOZh2_Wn2HtYB6dYX1_eOv8L9FzfSbPZd96wp8aOpBkP56jgc1vp7weKb8fUNhG0MfMt-XH3Z12yU2kNsmSs5DBAVP9tET2s4xgiPO4hnlk-_7EM15XNYTPftoaeqk1Nb-KKpUDiwk2jY6kPqjtNac_8hIJBWcd-530z_n-oEPLXrFZZpNDMIJfjbaPx8djq8pY2yhQSDXVIgUPt-e-XoHASH4";

const BOOK_ITEM = {
  id: "book-1",
  title: "The Magical Forest Explorer",
  author: "Sarah Jenkins",
  price: "£14.99",
  priceNum: 14.99,
  img: BOOK_COVER,
};

export const Route = createFileRoute("/book")({
  head: () => ({ meta: [{ title: "The Magical Forest Explorer — Little Readers" }] }),
  component: BookPage,
});

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span
            key={star}
            className="material-symbols-outlined text-[18px] text-[#f4bf40]"
            style={{ fontVariationSettings: `'FILL' ${filled || half ? 1 : 0}` }}
          >
            {half ? "star_half" : "star"}
          </span>
        );
      })}
      <span className="text-sm font-semibold text-[#001d36] ml-1">{rating}</span>
      <span className="text-sm text-[#74777e]">/ 5</span>
    </div>
  );
}

function BookPage() {
  const cart = useCart();
  const wishlist = useWishlist();
  const { openLumi } = useUI();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const saved = wishlist.has(BOOK_ITEM.id);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const handleAddToCart = useCallback(() => {
    for (let i = 0; i < qty; i++) {
      cart.add(BOOK_ITEM);
    }
    showToast("Added to cart!");
  }, [cart, qty, showToast]);

  const handleToggleWishlist = useCallback(() => {
    const nowSaved = wishlist.toggle({
      id: BOOK_ITEM.id, title: BOOK_ITEM.title, author: BOOK_ITEM.author,
      price: BOOK_ITEM.price, priceNum: BOOK_ITEM.priceNum, img: BOOK_ITEM.img,
    });
    showToast(nowSaved ? "Saved to wishlist ♥" : "Removed from wishlist");
  }, [wishlist, showToast]);

  const handleBuyNow = useCallback(() => {
    for (let i = 0; i < qty; i++) {
      cart.add(BOOK_ITEM);
    }
    navigate({ to: "/cart" });
  }, [cart, qty, navigate]);

  return (
    <div className="bg-[#fef9f1] min-h-screen flex flex-col font-['Inter',sans-serif]">
      <SiteHeader />

      {/* ── Breadcrumb ── */}
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-12 pt-5 pb-1">
        <nav className="flex items-center gap-2 text-sm text-[#74777e]">
          <Link to="/" preload="intent" className="hover:text-[#0055c7] transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/catalogue" preload="intent" className="hover:text-[#0055c7] transition-colors">Catalogue</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#001d36] font-medium truncate max-w-[180px]">The Magical Forest Explorer</span>
        </nav>
      </div>

      {/* ── Main ── */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Left: Cover + Thumbnails ── */}
          <div className="flex flex-col gap-4">
            {/* Main cover */}
            <div className="relative bg-[#f2ede5] rounded-3xl overflow-hidden aspect-[3/4] max-h-[520px] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
              <span className="absolute top-4 left-4 bg-[#ffdf9e] text-[#261a00] text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                Bestseller
              </span>
              <img
                alt="The Magical Forest Explorer"
                src={BOOK_COVER}
                className="h-full w-auto object-contain p-6 drop-shadow-xl"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {[BOOK_COVER, BOOK_COVER, BOOK_COVER].map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    activeThumb === i ? "border-[#0055c7] shadow-md" : "border-[#e6e2da] hover:border-[#c3c6ce]"
                  }`}
                >
                  <img src={src} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Details ── */}
          <div className="flex flex-col gap-5">
            {/* Title & author */}
            <div>
              <h1 className="font-['Fredoka',sans-serif] text-3xl md:text-4xl font-bold text-[#001d36] leading-tight mb-2">
                The Magical Forest Explorer
              </h1>
              <p className="text-[#43474d] text-[15px]">
                By <span className="font-semibold text-[#001d36]">Sarah Jenkins</span>
                {" · "}Illustrated by <span className="font-semibold text-[#001d36]">Mark Tom</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={4.8} />
              <span className="text-sm text-[#74777e]">(124 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-['Fredoka',sans-serif] text-4xl font-bold text-[#001d36]">£14.99</span>
              <span className="text-sm text-[#74777e] line-through">£18.99</span>
              <span className="text-xs font-semibold text-white bg-[#FF786F] px-2 py-0.5 rounded-full">Save 21%</span>
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "child_care", label: "Age Range", value: "5–7 years" },
                { icon: "school", label: "Key Stage", value: "KS1" },
                { icon: "forest", label: "Topic", value: "Nature & Science" },
                { icon: "book", label: "Format", value: "Hardcover · 48p" },
              ].map((meta) => (
                <div key={meta.label} className="bg-[#f8f3eb] rounded-xl p-3 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0055c7] text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {meta.icon}
                  </span>
                  <div>
                    <p className="text-[11px] text-[#74777e] uppercase tracking-wide font-medium">{meta.label}</p>
                    <p className="text-[13px] font-semibold text-[#001d36]">{meta.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery note */}
            <div className="flex items-center gap-2 bg-[#d9f0e4] rounded-xl px-4 py-3 text-sm text-[#001d36]">
              <span className="material-symbols-outlined text-[#2e7d32] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_shipping
              </span>
              <span>
                <strong>Free delivery</strong> on orders over £40 · Usually dispatched within 1–2 days
              </span>
            </div>

            {/* Quantity stepper */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-[#43474d]">Quantity</span>
              <div className="flex items-center border border-[#e6e2da] rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#001d36] hover:bg-[#f2ede5] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="w-10 text-center text-[15px] font-semibold text-[#001d36]">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#001d36] hover:bg-[#f2ede5] transition-colors"
                  aria-label="Increase quantity"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 flex-col sm:flex-row">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-[#0055c7] text-[#0055c7] font-semibold py-3.5 px-6 rounded-full hover:bg-[#0055c7] hover:text-white transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-[#0055c7] hover:bg-[#004bb0] text-white font-semibold py-3.5 px-6 rounded-full transition-all shadow-md shadow-[#0055c7]/30 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                Buy Now
              </button>
              <button
                onClick={handleToggleWishlist}
                aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                aria-pressed={saved}
                title={saved ? "Remove from wishlist" : "Save to wishlist"}
                className={`flex items-center justify-center gap-2 border-2 font-semibold py-3.5 px-5 rounded-full transition-all active:scale-95 ${
                  saved
                    ? "border-[#FF786F] bg-[#FF786F]/10 text-[#FF786F]"
                    : "border-[#e6e2da] text-[#43474d] hover:border-[#FF786F] hover:text-[#FF786F]"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: `'FILL' ${saved ? 1 : 0}` }}
                >
                  favorite
                </span>
                <span className="sm:hidden">{saved ? "Saved to Wishlist" : "Save to Wishlist"}</span>
              </button>
            </div>

            {/* Ask Lumi box */}
            <div className="bg-[#001d36] rounded-2xl p-5 flex items-center justify-between gap-4 mt-2">
              <div>
                <p className="font-['Fredoka',sans-serif] text-white font-semibold text-[16px] mb-0.5">
                  Not sure this is the right book?
                </p>
                <p className="text-[#afc9ea] text-sm">Ask Lumi — our reading guide — for personalised picks.</p>
              </div>
              <button
                onClick={openLumi}
                className="shrink-0 bg-white text-[#001d36] font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-[#d1e4ff] transition-colors whitespace-nowrap"
              >
                Ask Lumi
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── Toast ── */}
      <div
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#001d36] text-white px-4 py-3 rounded-2xl shadow-xl text-sm font-medium transition-all duration-300 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <span
          className="material-symbols-outlined text-[#72D6B2] text-[18px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        {toast ?? ""}
      </div>
    </div>
  );
}
