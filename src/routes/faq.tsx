import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — Little Readers" }] }),
  component: FaqPage,
});

type FAQItem = { q: string; a: string };
type FAQSection = { category: string; icon: string; items: FAQItem[] };

const FAQS: FAQSection[] = [
  {
    category: "Orders & Delivery",
    icon: "local_shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery takes 2–4 working days. We dispatch orders placed before 3pm the same day (Mon–Fri). You'll receive a tracking link by email once your order is on its way." },
      { q: "Do you offer free delivery?", a: "Yes! Orders over £40 qualify for free standard delivery. Orders under £40 have a flat delivery fee of £3.99." },
      { q: "Can I track my order?", a: "Absolutely. Once your order is dispatched you'll receive a tracking email with a link. You can also track your order in the My Orders section of your account." },
      { q: "What if my book arrives damaged?", a: "We're sorry to hear that! Please contact us within 14 days of delivery with a photo and we'll send a replacement or issue a full refund right away." },
    ],
  },
  {
    category: "Books & Recommendations",
    icon: "menu_book",
    items: [
      { q: "How does Lumi choose book recommendations?", a: "Lumi takes into account your child's age, year group, reading level, interests, and past purchases. The more you browse and add to lists, the better Lumi's recommendations become." },
      { q: "Are the books curriculum-aligned?", a: "Yes — every book in our catalogue is tagged with UK curriculum year groups and key stages (KS1, KS2). You can filter by year group in the catalogue." },
      { q: "Do you sell e-books or audiobooks?", a: "Currently we focus on physical books only, but we're exploring digital formats. Sign up to our newsletter to hear first when we launch new formats." },
      { q: "Can I return a book if my child doesn't like it?", a: "We offer a 30-day returns policy on all undamaged books. Just contact us and we'll arrange a free returns label." },
    ],
  },
  {
    category: "Accounts & Profiles",
    icon: "manage_accounts",
    items: [
      { q: "How do I add a child's profile?", a: "Go to Parent Space → Your Children, then click 'Add another child'. You can set their age, year group, and interests to get personalised recommendations." },
      { q: "Can I have multiple children on one account?", a: "Yes — you can add up to 6 children profiles on a single parent account, each with their own reading level and history." },
      { q: "Is my data safe?", a: "We take privacy seriously. We never sell your data to third parties. All data is stored securely and you can delete your account and all associated data at any time from your account settings." },
    ],
  },
  {
    category: "Payments",
    icon: "payments",
    items: [
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, and PayPal. All payments are processed securely via Stripe with 256-bit SSL encryption." },
      { q: "Do you offer gift cards?", a: "We do! Gift cards are available in denominations of £10, £20, £50, and £100. They never expire and can be used on any order." },
      { q: "Can I use a promo code?", a: "Yes — enter your promo code at checkout in the 'Promo Code' field in the order summary." },
    ],
  },
];

function Accordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e6e2da] last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className={`text-[15px] font-medium leading-snug transition-colors ${open ? "text-[#0055c7]" : "text-[#001d36] group-hover:text-[#0055c7]"}`}>
          {item.q}
        </span>
        <span
          className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 text-[#74777e] transition-transform duration-200 ${open ? "rotate-180 text-[#0055c7]" : ""}`}
        >
          expand_more
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-[14px] text-[#43474d] leading-relaxed">{item.a}</p>
      </div>
    </div>
  );
}

function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(FAQS[0].category);
  const section = FAQS.find((s) => s.category === activeCategory)!;

  return (
    <div className="bg-[#fef9f1] min-h-screen flex flex-col font-['Inter',sans-serif]">
      <SiteHeader active="faq" />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-12 py-16">
        {/* Hero */}
        <div className="text-center mb-14">
          <p className="text-[#0055c7] text-sm font-semibold uppercase tracking-widest mb-3">Help centre</p>
          <h1 className="font-['Fredoka',sans-serif] text-4xl md:text-5xl font-bold text-[#001d36] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-[#43474d] text-lg max-w-xl mx-auto">
            Can't find what you're looking for?{" "}
            <Link to="/contact" preload="intent" className="text-[#0055c7] font-semibold hover:underline underline-offset-4">
              Contact us
            </Link>{" "}
            or ask{" "}
            <Link to="/chat" preload="intent" className="text-[#0055c7] font-semibold hover:underline underline-offset-4">
              Lumi
            </Link>.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Category sidebar */}
          <aside className="md:w-56 shrink-0 space-y-1">
            {FAQS.map((s) => (
              <button
                key={s.category}
                onClick={() => setActiveCategory(s.category)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-left text-sm font-medium transition-all ${
                  activeCategory === s.category
                    ? "bg-[#001d36] text-white"
                    : "text-[#43474d] hover:bg-[#f2ede5] hover:text-[#001d36]"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${activeCategory === s.category ? "text-white" : "text-[#74777e]"}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {s.icon}
                </span>
                {s.category}
              </button>
            ))}
          </aside>

          {/* FAQ accordion */}
          <div className="flex-1 bg-white rounded-2xl border border-[#e6e2da] shadow-sm px-6 md:px-8">
            <div className="py-2">
              <h2 className="font-['Fredoka',sans-serif] text-xl font-bold text-[#001d36] pt-4 mb-2">
                {section.category}
              </h2>
              {section.items.map((item) => (
                <Accordion key={item.q} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Still need help? */}
        <div className="mt-16 bg-[#001d36] rounded-3xl p-10 text-center text-white">
          <h2 className="font-['Fredoka',sans-serif] text-2xl font-bold mb-3">Still need help?</h2>
          <p className="text-[#afc9ea] mb-6 text-[15px]">Our team is happy to help — or ask Lumi for instant answers.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              preload="intent"
              className="bg-white text-[#001d36] font-semibold px-6 py-3 rounded-full hover:bg-[#d1e4ff] transition-colors"
            >
              Contact Support
            </Link>
            <Link
              to="/chat"
              preload="intent"
              className="border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Ask Lumi
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
