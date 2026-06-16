import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/rate")({
  head: () => ({ meta: [{ title: "Rate Book — Little Readers" }] }),
  component: RatePage,
});

const LUMI_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBGjlWE3TayJRf-QwZ8MPMtS0nzkbLoJNugdkT0hZMQf1ucW40DAzdmnDcykMlv254sFcIh3lyJwTaEb44JiwY4EM93Pz1IbUXahkIn8Y6Fopa5E3_fZKSdDmiI-9vNI99x3PTbW3Z4_llEh_9UYx_A2Y1GbDpYO4fbK7kytpwaYJBAIng3nClp8wKlvijsrXkF7ouFbXWhT72wOZcnXDeiaQRhlQhQOgY4FWpFPW_fySasocGWY41aua0wgPgsoh05R3UqJ7hFJQn5";

const CATEGORIES = [
  { key: "overall", label: "Overall Experience", hint: "How would you rate this book overall?" },
  { key: "suitability", label: "School Suitability", hint: "Is the content appropriate for the target age?" },
  { key: "clarity", label: "Clarity", hint: "Is the language and story easy to follow?" },
  { key: "enjoyment", label: "Enjoyment", hint: "Did your child have fun reading this?" },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

function StarRow({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = display >= star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <span
              className={`material-symbols-outlined text-[30px] ${filled ? "text-[#f4bf40]" : "text-[#c3c6ce]"}`}
              style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}
            >
              star
            </span>
          </button>
        );
      })}
    </div>
  );
}

function RatePage() {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<Record<CategoryKey, number>>({
    overall: 0,
    suitability: 0,
    clarity: 0,
    enjoyment: 0,
  });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [displayName, setDisplayName] = useState("Sarah M.");
  const [verified, setVerified] = useState(true);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setRating = useCallback((key: CategoryKey, v: number) => {
    setRatings((prev) => ({ ...prev, [key]: v }));
    setError(false);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (ratings.overall === 0) {
        setError(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [ratings.overall]
  );

  if (submitted) {
    return (
      <div className="bg-[#fef9f1] min-h-screen flex flex-col font-['Inter',sans-serif]">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md text-center bg-white rounded-3xl border border-[#e6e2da] shadow-sm p-8 md:p-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#d9f0e4] mx-auto mb-6">
              <span className="material-symbols-outlined text-[44px] text-[#2e7d32]" style={{ fontVariationSettings: "'FILL' 1" }}>
                task_alt
              </span>
            </div>
            <h1 className="font-['Fredoka',sans-serif] text-2xl font-bold text-[#001d36] mb-2">
              Thank you for your review!
            </h1>
            <p className="text-[#43474d] mb-8">
              Your feedback helps other parents and educators find the perfect books.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/catalogue"
                preload="intent"
                className="inline-flex items-center justify-center gap-2 bg-[#0055c7] hover:bg-[#004bb0] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                Back to Catalogue
              </Link>
              <Link
                to="/orders"
                preload="intent"
                className="inline-flex items-center justify-center gap-2 border border-[#c3c6ce] text-[#001d36] text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#f8f3eb] transition-colors"
              >
                My Orders
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#fef9f1] min-h-screen flex flex-col font-['Inter',sans-serif]">
      <SiteHeader />

      <main className="flex-1 max-w-[900px] mx-auto w-full px-4 md:px-12 py-8 md:py-12">
        {/* Back link */}
        <Link
          to="/book"
          preload="intent"
          className="inline-flex items-center gap-2 text-sm text-[#74777e] hover:text-[#0055c7] transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Book Details
        </Link>

        <h1 className="font-['Fredoka',sans-serif] text-3xl md:text-4xl font-bold text-[#001d36] mb-2">
          Review 'The Magical Forest Explorer'
        </h1>
        <p className="text-[#43474d] text-[15px] mb-8">
          Share your thoughts to help other parents and educators find the perfect books.
        </p>

        {/* Lumi note */}
        <div className="flex items-start gap-3 bg-[#001d36] rounded-2xl p-4 mb-8">
          <img src={LUMI_AVATAR} alt="Lumi" className="w-10 h-10 rounded-full object-cover border-2 border-white/20 shrink-0" />
          <p className="text-[#afc9ea] text-sm leading-relaxed">
            Your honest feedback helps our community grow! Tell us what your child enjoyed most. 🦉
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Ratings */}
          <section className="bg-white rounded-3xl border border-[#e6e2da] shadow-sm p-6 md:p-8">
            <h2 className="font-['Fredoka',sans-serif] text-lg font-semibold text-[#001d36] border-b border-[#e6e2da] pb-4 mb-6">
              Ratings
            </h2>

            {error && (
              <div className="flex items-center gap-2 bg-[#ffdad6] text-[#93000a] text-sm font-medium rounded-xl px-4 py-3 mb-6">
                <span className="material-symbols-outlined text-[18px]">error</span>
                Please give an overall rating before submitting.
              </div>
            )}

            <div className="space-y-6">
              {CATEGORIES.map((cat) => (
                <div key={cat.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#001d36] flex items-center gap-1">
                      {cat.label}
                      {cat.key === "overall" && <span className="text-[#FF786F]">*</span>}
                    </h3>
                    <p className="text-xs text-[#74777e]">{cat.hint}</p>
                  </div>
                  <StarRow value={ratings[cat.key]} onChange={(v) => setRating(cat.key, v)} />
                </div>
              ))}
            </div>
          </section>

          {/* Written review */}
          <section className="bg-white rounded-3xl border border-[#e6e2da] shadow-sm p-6 md:p-8">
            <h2 className="font-['Fredoka',sans-serif] text-lg font-semibold text-[#001d36] border-b border-[#e6e2da] pb-4 mb-6">
              Written Review
            </h2>
            <div className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="review-title" className="text-xs font-semibold text-[#43474d]">Review Title</label>
                <input
                  id="review-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summarize your experience (e.g. 'Great for learning phonics!')"
                  className="w-full rounded-2xl border border-[#c3c6ce] bg-white px-4 py-3 text-[15px] text-[#1d1c17] outline-none transition-colors placeholder:text-[#74777e] focus:border-[#0055c7] focus:ring-2 focus:ring-[#0055c7]/30"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="review-body" className="text-xs font-semibold text-[#43474d]">Detailed Review</label>
                <textarea
                  id="review-body"
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What did you and your child like or dislike? How did it help with their reading journey?"
                  className="w-full rounded-2xl border border-[#c3c6ce] bg-white px-4 py-3 text-[15px] text-[#1d1c17] outline-none transition-colors placeholder:text-[#74777e] focus:border-[#0055c7] focus:ring-2 focus:ring-[#0055c7]/30 resize-y"
                />
              </div>
            </div>
          </section>

          {/* Display settings */}
          <section className="bg-[#f8f3eb] rounded-3xl border border-[#e6e2da] p-6 md:p-8">
            <h2 className="font-['Fredoka',sans-serif] text-lg font-semibold text-[#001d36] mb-5">
              Display Settings
            </h2>
            <div className="flex flex-col gap-1.5 mb-5">
              <label htmlFor="display-name" className="text-xs font-semibold text-[#43474d]">Display Name</label>
              <input
                id="display-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full max-w-sm rounded-2xl border border-[#c3c6ce] bg-white px-4 py-3 text-[15px] text-[#1d1c17] outline-none transition-colors focus:border-[#0055c7] focus:ring-2 focus:ring-[#0055c7]/30"
              />
              <p className="text-xs text-[#74777e] mt-1">This name will appear publicly with your review.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={verified}
              onClick={() => setVerified((v) => !v)}
              className="flex items-center gap-3"
            >
              <span
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors ${verified ? "bg-[#0055c7]" : "bg-[#c3c6ce]"}`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${verified ? "translate-x-5" : "translate-x-0"}`}
                />
              </span>
              <span className="text-sm text-[#1d1c17]">Show my verified purchaser badge</span>
            </button>
          </section>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 h-12 px-8 bg-[#0055c7] hover:bg-[#004bb0] text-white text-sm font-bold rounded-full transition-colors shadow-sm active:scale-95"
            >
              Submit Review
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/book" })}
              className="h-12 px-8 text-[#0055c7] text-sm font-bold rounded-full hover:bg-[#f2ede5] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
