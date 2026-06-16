// === FILE: src/routes/catalogue.tsx ===
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

// ── Image constants ───────────────────────────────────────────────────────────
const FOX =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBsS-Y_cdZhCkZHcoFcRYvT-7F1ve0spbH0E61w12svycwaKjic5XXR9m0Gm24MEqUEiIOFj6fQEe4XLu4T1hJtHyMAZx9hsc4ASKUAXKTnjJvZBLoycT_Agdj6SCzU_IELYhRPWBr9wWfLWY12a9vSr07t30-2_wy8O4_aDcJPi7lGIJvZYDaPM9-StHsFVbUVSJiK_0n95RlOWsvfpVKB_hqkXh-4OIuM76dK0geparteR6EBZM8XyewkmCdMcGU-eArVE43nQQ1Z";
const SHELTER =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDRIwhe8N9Csc80FMsZL0kdS3aI9HS1PI1ESJpQ_kKO1dWSU5iPqrKRmQ8Dw2vT6RO_I-3-TAgeAWO0ls-UCd-_ge5gc3JvdHZXX_h3HvDRR4OZdGPwLIcNsKNOQIIsmTwmxdXz_mu0mjJe44FN9Ji9PF9k39vbtmdaS9mfyUXTl-UFbl5Kt2TCFNqcM4L73FsG-1jSWPtEn7WXtW5fkOkk3UPSlqyWpzaaDfMHd3meNs1Z2WTXeUxQ_icA3Oq2rBGew_h96ufrN83G";

// ── Book data ─────────────────────────────────────────────────────────────────
type Book = {
  id: string;
  title: string;
  author: string;
  price: string;
  priceNum: number;
  badge?: string;
  img?: string;
  gradient?: [string, string];
  year: string;
  subject: string;
};

const ALL_BOOKS: Book[] = [
  { id: "c1", title: "The Fox's Great Forest Adventure", author: "Sarah Jenkins", price: "£8.99", priceNum: 8.99, badge: "Bestseller", img: FOX, year: "Year 2", subject: "Fiction" },
  { id: "c2", title: "Mystery at the Animal Shelter", author: "David Owusu", price: "£7.50", priceNum: 7.50, year: "Year 2", subject: "Fiction", img: SHELTER },
  { id: "c3", title: "Phonics Fun: Set 1", author: "Oxford Reading Tree", price: "£5.99", priceNum: 5.99, badge: "KS1", year: "Year 1", subject: "Phonics", gradient: ["#d9f0e4", "#72D6B2"] },
  { id: "c4", title: "Maths Makes Sense", author: "Carol Vorderman", price: "£8.99", priceNum: 8.99, badge: "Curriculum", year: "Year 3", subject: "Maths", gradient: ["#d1e4ff", "#0055c7"] },
  { id: "c5", title: "DK Find Out! Science", author: "DK", price: "£11.99", priceNum: 11.99, badge: "Reference", year: "Year 5", subject: "Science", gradient: ["#e8f5e9", "#43a047"] },
  { id: "c6", title: "Diary of a Wimpy Kid", author: "Jeff Kinney", price: "£8.50", priceNum: 8.50, badge: "Bestseller", year: "Year 3", subject: "Fiction", gradient: ["#fff9c4", "#f4bf40"] },
  { id: "c7", title: "The Gruffalo", author: "Julia Donaldson", price: "£7.50", priceNum: 7.50, badge: "Classic", year: "Year 1", subject: "Fiction", gradient: ["#ffdf9e", "#f4bf40"] },
  { id: "c8", title: "Times Tables Adventurer", author: "Various", price: "£6.99", priceNum: 6.99, year: "Year 3", subject: "Maths", gradient: ["#fff9c4", "#f4bf40"] },
  { id: "c9", title: "Horrible Science: Deadly Diseases", author: "Nick Arnold", price: "£8.50", priceNum: 8.50, year: "Year 5", subject: "Science", gradient: ["#fce4d6", "#FF786F"] },
];

const YEAR_GROUPS = ["All", "Year 1-2", "Year 3-4", "Year 5-6"];
const SUBJECTS = ["All", "Fiction", "Science", "Maths", "Phonics"];

function matchesYear(book: Book, filter: string): boolean {
  if (filter === "All") return true;
  if (filter === "Year 1-2") return book.year === "Year 1" || book.year === "Year 2";
  if (filter === "Year 3-4") return book.year === "Year 3" || book.year === "Year 4";
  if (filter === "Year 5-6") return book.year === "Year 5" || book.year === "Year 6";
  return true;
}

export const Route = createFileRoute("/catalogue")({
  head: () => ({ meta: [{ title: "Catalogue — Little Readers" }] }),
  component: CataloguePage,
});

function CataloguePage() {
  const cart = useCart();
  const wishlist = useWishlist();
  const [yearFilter, setYearFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const handleAdd = useCallback(
    (book: Book) => {
      cart.add({ id: book.id, title: book.title, author: book.author, price: book.price, priceNum: book.priceNum, img: book.img });
      showToast("Added to cart!");
    },
    [cart, showToast]
  );

  const handleToggleWishlist = useCallback(
    (book: Book) => {
      const saved = wishlist.toggle({
        id: book.id, title: book.title, author: book.author,
        price: book.price, priceNum: book.priceNum, img: book.img, gradient: book.gradient,
      });
      showToast(saved ? "Saved to wishlist ♥" : "Removed from wishlist");
    },
    [wishlist, showToast]
  );

  const clearYearFilter = () => setYearFilter("All");
  const clearSubjectFilter = () => setSubjectFilter("All");

  const filtered = ALL_BOOKS.filter(
    (b) => matchesYear(b, yearFilter) && (subjectFilter === "All" || b.subject === subjectFilter)
  );

  return (
    <div className="bg-[#fef9f1] min-h-screen flex flex-col font-['Inter',sans-serif]">
      <SiteHeader active="books" />

      {/* ── Main ── */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-12 py-8 flex gap-8">
        {/* ── Left Sidebar ── */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-[#e6e2da] p-6 sticky top-24 space-y-7">
            {/* Year Group */}
            <div>
              <h3 className="font-['Fredoka',sans-serif] text-[15px] font-semibold text-[#001d36] mb-3">
                Year Group
              </h3>
              <div className="space-y-2">
                {YEAR_GROUPS.map((yr) => (
                  <label key={yr} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="year"
                      value={yr}
                      checked={yearFilter === yr}
                      onChange={() => setYearFilter(yr)}
                      className="accent-[#0055c7] w-4 h-4"
                    />
                    <span className={`text-sm transition-colors ${yearFilter === yr ? "text-[#001d36] font-semibold" : "text-[#43474d] group-hover:text-[#001d36]"}`}>
                      {yr}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <h3 className="font-['Fredoka',sans-serif] text-[15px] font-semibold text-[#001d36] mb-3">
                Subject
              </h3>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubjectFilter(sub)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      subjectFilter === sub
                        ? "bg-[#001d36] text-white border-[#001d36]"
                        : "bg-white text-[#43474d] border-[#e6e2da] hover:border-[#001d36] hover:text-[#001d36]"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Active filters */}
            {(yearFilter !== "All" || subjectFilter !== "All") && (
              <div>
                <h3 className="font-['Fredoka',sans-serif] text-[15px] font-semibold text-[#001d36] mb-2">
                  Active Filters
                </h3>
                <div className="flex flex-wrap gap-2">
                  {yearFilter !== "All" && (
                    <span className="flex items-center gap-1 bg-[#d1e4ff] text-[#001945] text-xs font-medium px-3 py-1 rounded-full">
                      {yearFilter}
                      <button onClick={clearYearFilter} className="ml-1 hover:text-[#0055c7]">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                  )}
                  {subjectFilter !== "All" && (
                    <span className="flex items-center gap-1 bg-[#d1e4ff] text-[#001945] text-xs font-medium px-3 py-1 rounded-full">
                      {subjectFilter}
                      <button onClick={clearSubjectFilter} className="ml-1 hover:text-[#0055c7]">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ── Book Grid ── */}
        <section className="flex-1">
          {/* Mobile active filters */}
          {(yearFilter !== "All" || subjectFilter !== "All") && (
            <div className="md:hidden flex flex-wrap gap-2 mb-4">
              {yearFilter !== "All" && (
                <span className="flex items-center gap-1 bg-[#d1e4ff] text-[#001945] text-xs font-medium px-3 py-1 rounded-full">
                  {yearFilter}
                  <button onClick={clearYearFilter}>
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}
              {subjectFilter !== "All" && (
                <span className="flex items-center gap-1 bg-[#d1e4ff] text-[#001945] text-xs font-medium px-3 py-1 rounded-full">
                  {subjectFilter}
                  <button onClick={clearSubjectFilter}>
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <h1 className="font-['Fredoka',sans-serif] text-2xl md:text-3xl font-bold text-[#001d36]">
              All Books
            </h1>
            <span className="text-sm text-[#74777e]">{filtered.length} titles</span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-[64px] text-[#e6e2da] mb-4">menu_book</span>
              <p className="text-[#43474d] font-medium">No books match your filters.</p>
              <button
                onClick={() => { setYearFilter("All"); setSubjectFilter("All"); }}
                className="mt-4 text-sm text-[#0055c7] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onAdd={() => handleAdd(book)}
                  saved={wishlist.has(book.id)}
                  onToggleWishlist={() => handleToggleWishlist(book)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ── Toast ── */}
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

function BookCard({
  book,
  onAdd,
  saved,
  onToggleWishlist,
}: {
  book: Book;
  onAdd: () => void;
  saved: boolean;
  onToggleWishlist: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#e6e2da] shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col group hover:-translate-y-0.5 transition-transform duration-200">
      {/* Cover */}
      <Link to="/book" preload="intent" className="block">
        <div
          className="h-52 flex items-center justify-center relative overflow-hidden"
          style={
            book.img
              ? { background: "#f8f3eb" }
              : { background: `linear-gradient(135deg, ${book.gradient![0]}, ${book.gradient![1]})` }
          }
        >
          {book.badge && (
            <span className="absolute top-3 left-3 bg-[#ffdf9e] text-[#261a00] text-[11px] font-semibold px-2.5 py-0.5 rounded-full z-10 shadow-sm">
              {book.badge}
            </span>
          )}
          {/* Wishlist heart */}
          <button
            onClick={(e) => { e.preventDefault(); onToggleWishlist(); }}
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            aria-pressed={saved}
            title={saved ? "Remove from wishlist" : "Save to wishlist"}
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm transition-all hover:scale-110 active:scale-95"
          >
            <span
              className={`material-symbols-outlined text-[20px] transition-colors ${saved ? "text-[#FF786F]" : "text-[#74777e]"}`}
              style={{ fontVariationSettings: `'FILL' ${saved ? 1 : 0}` }}
            >
              favorite
            </span>
          </button>
          {book.img ? (
            <img
              alt={book.title}
              src={book.img}
              className="h-full w-auto object-contain p-4 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span
              className="material-symbols-outlined text-[56px] text-white/40"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              menu_book
            </span>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[10px] font-medium text-[#74777e] bg-[#f2ede5] px-2 py-0.5 rounded-full">{book.year}</span>
          <span className="text-[10px] font-medium text-[#74777e] bg-[#f2ede5] px-2 py-0.5 rounded-full">{book.subject}</span>
        </div>
        <Link to="/book" preload="intent">
          <h3 className="text-[14px] font-semibold text-[#001d36] line-clamp-2 mb-0.5 leading-snug hover:text-[#0055c7] transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-[12px] text-[#74777e] mb-4">{book.author}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-[#001d36]">{book.price}</span>
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 bg-[#0055c7] hover:bg-[#004bb0] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
