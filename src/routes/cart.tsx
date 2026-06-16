// === FILE: src/routes/cart.tsx ===
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart, type CartItem } from "@/lib/cart";

const FREE_DELIVERY_THRESHOLD = 40;
const DELIVERY_COST = 3.99;

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Little Readers" }] }),
  component: CartPage,
});

function CartPage() {
  const cart = useCart();
  const [promoCode, setPromoCode] = useState("");

  const delivery = cart.total >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_COST;
  const grandTotal = cart.total + delivery;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cart.total);

  return (
    <div className="bg-[#fef9f1] min-h-screen flex flex-col font-['Inter',sans-serif]">
      <SiteHeader />

      {/* ── Main ── */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-12 py-8">
        <h1 className="font-['Fredoka',sans-serif] text-3xl md:text-4xl font-bold text-[#001d36] mb-8">
          Your Cart
          {cart.count > 0 && (
            <span className="ml-3 text-lg font-normal text-[#74777e]">({cart.count} item{cart.count !== 1 ? "s" : ""})</span>
          )}
        </h1>

        {/* ── Empty state ── */}
        {cart.items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-[#f2ede5] flex items-center justify-center mb-6 shadow-inner">
              <span className="material-symbols-outlined text-[48px] text-[#c3c6ce]" style={{ fontVariationSettings: "'FILL' 1" }}>
                shopping_cart
              </span>
            </div>
            <h2 className="font-['Fredoka',sans-serif] text-2xl font-bold text-[#001d36] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[#74777e] text-[15px] max-w-xs mb-8">
              Looks like you haven't added any books yet. Discover something wonderful!
            </p>
            <Link
              to="/catalogue"
              preload="intent"
              className="flex items-center gap-2 bg-[#0055c7] hover:bg-[#004bb0] text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md shadow-[#0055c7]/30 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
              Browse Books
            </Link>
          </div>
        )}

        {/* ── Cart with items ── */}
        {cart.items.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* ── Left: Items ── */}
            <div className="flex-1 lg:w-0 space-y-4 min-w-0">
              {cart.items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}

              {/* Lumi tip */}
              {amountToFreeDelivery > 0 && (
                <div className="bg-[#001d36] rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0055c7]/40 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      local_shipping
                    </span>
                  </div>
                  <p className="text-white text-[14px]">
                    You're{" "}
                    <strong className="text-[#ffdf9e]">£{amountToFreeDelivery.toFixed(2)}</strong>
                    {" "}away from{" "}
                    <strong className="text-[#72D6B2]">free delivery</strong>
                    {" "}(free over £{FREE_DELIVERY_THRESHOLD})!
                  </p>
                </div>
              )}
              {amountToFreeDelivery === 0 && (
                <div className="bg-[#d9f0e4] rounded-2xl p-5 flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#2e7d32] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <p className="text-[#1b5e20] font-medium text-[14px]">
                    Great news — you qualify for <strong>free delivery</strong>!
                  </p>
                </div>
              )}
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="w-full lg:w-[360px] shrink-0 lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl border border-[#e6e2da] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 space-y-5">
                <h2 className="font-['Fredoka',sans-serif] text-xl font-bold text-[#001d36]">
                  Order Summary
                </h2>

                {/* Line items */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[14px] text-[#43474d]">
                    <span>Subtotal ({cart.count} item{cart.count !== 1 ? "s" : ""})</span>
                    <span className="font-semibold text-[#001d36]">£{cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[14px] text-[#43474d]">
                    <span>Delivery</span>
                    {delivery === 0 ? (
                      <span className="font-semibold text-[#2e7d32]">FREE</span>
                    ) : (
                      <span className="font-semibold text-[#001d36]">£{delivery.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="border-t border-[#e6e2da] pt-3 flex justify-between">
                    <span className="text-[16px] font-bold text-[#001d36]">Total</span>
                    <span className="text-[20px] font-bold text-[#001d36]">£{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo code */}
                <div>
                  <label htmlFor="promo" className="text-[13px] font-medium text-[#43474d] mb-1.5 block">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="promo"
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. READERS10"
                      className="flex-1 bg-[#f8f3eb] border border-[#e6e2da] rounded-xl px-4 py-2.5 text-[14px] text-[#001d36] placeholder:text-[#74777e] focus:outline-none focus:border-[#0055c7] focus:ring-1 focus:ring-[#0055c7] transition-all"
                    />
                    <button
                      className="px-4 py-2.5 rounded-xl border border-[#e6e2da] text-sm font-semibold text-[#43474d] hover:bg-[#f2ede5] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  to="/delivery"
                  preload="intent"
                  className="flex items-center justify-center gap-2 w-full bg-[#0055c7] hover:bg-[#004bb0] text-white font-semibold py-4 px-6 rounded-full transition-all shadow-md shadow-[#0055c7]/30 active:scale-95 text-[15px]"
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lock
                  </span>
                  Proceed to Checkout
                </Link>

                {/* Secure note */}
                <div className="flex items-center justify-center gap-2 text-[#74777e] text-xs">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  <span>Secure checkout · SSL encrypted · 256-bit</span>
                </div>

                {/* Payment icons */}
                <div className="flex items-center justify-center gap-3 pt-1">
                  {["Visa", "MC", "Amex", "PayPal"].map((brand) => (
                    <span
                      key={brand}
                      className="bg-[#f8f3eb] border border-[#e6e2da] rounded px-2 py-1 text-[10px] font-bold text-[#43474d] tracking-wide"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function CartItemRow({ item }: { item: CartItem }) {
  const { remove, setQty } = useCart();

  const GRADIENT_COLORS: [string, string][] = [
    ["#d1e4ff", "#afc9ea"],
    ["#ffdf9e", "#f4bf40"],
    ["#d9f0e4", "#72D6B2"],
    ["#fce4d6", "#FF786F"],
  ];
  // Deterministic gradient based on item id char code
  const gradientIdx = item.id.charCodeAt(item.id.length - 1) % GRADIENT_COLORS.length;
  const [g1, g2] = GRADIENT_COLORS[gradientIdx];

  return (
    <div className="bg-white rounded-2xl border border-[#e6e2da] shadow-sm p-4 flex gap-4 items-start">
      {/* Image / Gradient placeholder */}
      <div
        className="w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
        style={
          item.img
            ? { background: "#f8f3eb" }
            : { background: `linear-gradient(135deg, ${g1}, ${g2})` }
        }
      >
        {item.img ? (
          <img
            alt={item.title}
            src={item.img}
            className="w-full h-full object-contain p-1.5"
          />
        ) : (
          <span
            className="material-symbols-outlined text-[28px] text-white/50"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            menu_book
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[14px] font-semibold text-[#001d36] leading-snug line-clamp-2 mb-0.5">
          {item.title}
        </h3>
        <p className="text-[12px] text-[#74777e] mb-3">{item.author}</p>

        {/* Qty stepper + price row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Qty stepper */}
          <div className="flex items-center border border-[#e6e2da] rounded-full overflow-hidden">
            <button
              onClick={() => setQty(item.id, item.qty - 1)}
              aria-label="Decrease"
              className="w-8 h-8 flex items-center justify-center text-[#001d36] hover:bg-[#f2ede5] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span className="w-8 text-center text-[13px] font-semibold text-[#001d36]">{item.qty}</span>
            <button
              onClick={() => setQty(item.id, item.qty + 1)}
              aria-label="Increase"
              className="w-8 h-8 flex items-center justify-center text-[#001d36] hover:bg-[#f2ede5] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>

          {/* Price */}
          <span className="text-[15px] font-bold text-[#001d36]">
            £{(item.priceNum * item.qty).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => remove(item.id)}
        aria-label={`Remove ${item.title}`}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#74777e] hover:bg-[#fce4d6] hover:text-[#FF786F] transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">delete</span>
      </button>
    </div>
  );
}
