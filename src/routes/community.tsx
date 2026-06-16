import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Join Our Community — Little Readers" }] }),
  component: CommunityPage,
});

const CLASSES = [
  "Reception (Age 4–5)",
  "Year 1 (Age 5–6)",
  "Year 2 (Age 6–7)",
  "Year 3 (Age 7–8)",
  "Year 4 (Age 8–9)",
  "Year 5 (Age 9–10)",
  "Year 6 (Age 10–11)",
];

const INTERESTS = [
  "Adventure & Fantasy",
  "Animals & Nature",
  "Science & Discovery",
  "Funny & Silly",
  "Friendship & Emotions",
  "History & Facts",
  "Maths & Problem-Solving",
  "Arts & Creativity",
];

type FormData = {
  parentName: string;
  facebookName: string;
  childName: string;
  childClass: string;
  childAge: string;
  interests: string[];
  note: string;
};

const EMPTY: FormData = {
  parentName: "",
  facebookName: "",
  childName: "",
  childClass: "",
  childAge: "",
  interests: [],
  note: "",
};

function CommunityPage() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (k: keyof FormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleInterest = (interest: string) =>
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((i) => i !== interest)
        : [...f.interests, interest],
    }));

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.parentName.trim()) e.parentName = "Please enter your name.";
    if (!form.facebookName.trim()) e.facebookName = "Please enter your Facebook name.";
    if (!form.childName.trim()) e.childName = "Please enter your child's name.";
    if (!form.childClass) e.childClass = "Please select a class.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const BENEFITS = [
    { icon: "forum", title: "Share book tips", body: "Swap recommendations with parents whose children are at the same reading level." },
    { icon: "event", title: "Monthly reading challenges", body: "Join fun challenges and win book vouchers for your little reader." },
    { icon: "lightbulb", title: "Expert Q&As", body: "Ask our teacher advisors and reading specialists live in the group." },
    { icon: "favorite", title: "Exclusive deals", body: "Members get early access to sales and community-only discount codes." },
  ];

  return (
    <div className="bg-[#fef9f1] min-h-screen flex flex-col font-['Inter',sans-serif]">
      <SiteHeader active="community" />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#001d36] py-20 px-4 md:px-12 text-center">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#0055c7]/25 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#f4bf40]/15 blur-3xl" />
          </div>
          <div className="relative max-w-[680px] mx-auto">
            {/* Facebook badge */}
            <div className="inline-flex items-center gap-2 bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#d1e4ff] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
              Private Facebook Group
            </div>
            <h1 className="font-['Fredoka',sans-serif] text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Join the Little Readers<br />Parent Community
            </h1>
            <p className="text-[#afc9ea] text-[17px] leading-relaxed max-w-xl mx-auto">
              Connect with hundreds of parents, share reading wins, get expert advice, and discover books your child will love — all in one warm, friendly group.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-[1100px] mx-auto px-4 md:px-12 py-16">
          <h2 className="font-['Fredoka',sans-serif] text-2xl font-bold text-[#001d36] text-center mb-10">
            What you'll get as a member
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl border border-[#e6e2da] p-5 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 rounded-xl bg-[#d1e4ff] flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-[#0055c7] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{b.icon}</span>
                </div>
                <h3 className="font-['Fredoka',sans-serif] text-[16px] font-semibold text-[#001d36] mb-1">{b.title}</h3>
                <p className="text-xs text-[#74777e] leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="max-w-[680px] mx-auto">
            {submitted ? (
              /* ── Success state ── */
              <div className="bg-white rounded-3xl border border-[#e6e2da] shadow-sm p-10 md:p-14 text-center">
                <div className="w-20 h-20 rounded-full bg-[#d9f0e4] flex items-center justify-center mx-auto mb-5">
                  <span className="material-symbols-outlined text-[#2e7d32] text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h2 className="font-['Fredoka',sans-serif] text-3xl font-bold text-[#001d36] mb-2">
                  You're almost in! 🎉
                </h2>
                <p className="text-[#43474d] text-[15px] mb-2">
                  Thanks, <strong>{form.parentName}</strong>! We've got {form.childName}'s details.
                </p>
                <p className="text-[#74777e] text-[14px] mb-8 max-w-sm mx-auto">
                  Click the button below to join the group on Facebook — search for <strong>{form.facebookName}</strong> to find you when you request to join.
                </p>
                <a
                  href="https://www.facebook.com/groups"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-[#1877F2]/30 active:scale-95 text-[15px]"
                >
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                  Join on Facebook
                </a>
                <div className="mt-8 border-t border-[#e6e2da] pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => { setSubmitted(false); setForm(EMPTY); }}
                    className="text-sm text-[#74777e] hover:text-[#001d36] hover:underline underline-offset-4 transition-colors"
                  >
                    Add another child profile
                  </button>
                  <Link
                    to="/catalogue"
                    preload="intent"
                    className="flex items-center gap-1.5 text-sm font-semibold text-[#0055c7] hover:underline underline-offset-4 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    Browse books
                  </Link>
                </div>
              </div>
            ) : (
              /* ── Join form ── */
              <div className="bg-white rounded-3xl border border-[#e6e2da] shadow-sm p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#1877F2] flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                  </div>
                  <div>
                    <h2 className="font-['Fredoka',sans-serif] text-xl font-bold text-[#001d36] leading-tight">Request to join</h2>
                    <p className="text-xs text-[#74777e]">We review requests within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Parent section */}
                  <div className="bg-[#f8f3eb] rounded-2xl p-5 space-y-4">
                    <p className="text-xs font-semibold text-[#74777e] uppercase tracking-widest">About you</p>

                    <div>
                      <label htmlFor="parentName" className="block text-sm font-medium text-[#43474d] mb-1.5">
                        Your full name <span className="text-[#FF786F]">*</span>
                      </label>
                      <input
                        id="parentName" type="text" value={form.parentName}
                        onChange={(e) => set("parentName", e.target.value)}
                        placeholder="e.g. Sarah Jones"
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#1d1c17] placeholder:text-[#74777e] focus:outline-none focus:ring-2 focus:ring-[#0055c7] transition-all ${errors.parentName ? "border-[#FF786F]" : "border-[#e6e2da]"}`}
                      />
                      {errors.parentName && <p className="mt-1.5 text-xs text-[#FF786F]">{errors.parentName}</p>}
                    </div>

                    <div>
                      <label htmlFor="facebookName" className="block text-sm font-medium text-[#43474d] mb-1.5">
                        Your Facebook name <span className="text-[#FF786F]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#74777e] text-sm font-medium select-none">fb /</span>
                        <input
                          id="facebookName" type="text" value={form.facebookName}
                          onChange={(e) => set("facebookName", e.target.value)}
                          placeholder="as it appears on Facebook"
                          className={`w-full bg-white border rounded-xl pl-12 pr-4 py-3 text-sm text-[#1d1c17] placeholder:text-[#74777e] focus:outline-none focus:ring-2 focus:ring-[#0055c7] transition-all ${errors.facebookName ? "border-[#FF786F]" : "border-[#e6e2da]"}`}
                        />
                      </div>
                      {errors.facebookName && <p className="mt-1.5 text-xs text-[#FF786F]">{errors.facebookName}</p>}
                      <p className="mt-1.5 text-xs text-[#74777e]">We use this to approve your join request on Facebook.</p>
                    </div>
                  </div>

                  {/* Child section */}
                  <div className="bg-[#f8f3eb] rounded-2xl p-5 space-y-4">
                    <p className="text-xs font-semibold text-[#74777e] uppercase tracking-widest">About your child</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="childName" className="block text-sm font-medium text-[#43474d] mb-1.5">
                          Child's name <span className="text-[#FF786F]">*</span>
                        </label>
                        <input
                          id="childName" type="text" value={form.childName}
                          onChange={(e) => set("childName", e.target.value)}
                          placeholder="e.g. Mia"
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#1d1c17] placeholder:text-[#74777e] focus:outline-none focus:ring-2 focus:ring-[#0055c7] transition-all ${errors.childName ? "border-[#FF786F]" : "border-[#e6e2da]"}`}
                        />
                        {errors.childName && <p className="mt-1.5 text-xs text-[#FF786F]">{errors.childName}</p>}
                      </div>

                      <div>
                        <label htmlFor="childAge" className="block text-sm font-medium text-[#43474d] mb-1.5">
                          Child's age
                        </label>
                        <input
                          id="childAge" type="number" min="4" max="12" value={form.childAge}
                          onChange={(e) => set("childAge", e.target.value)}
                          placeholder="e.g. 7"
                          className="w-full bg-white border border-[#e6e2da] rounded-xl px-4 py-3 text-sm text-[#1d1c17] placeholder:text-[#74777e] focus:outline-none focus:ring-2 focus:ring-[#0055c7] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="childClass" className="block text-sm font-medium text-[#43474d] mb-1.5">
                        School year / class <span className="text-[#FF786F]">*</span>
                      </label>
                      <select
                        id="childClass" value={form.childClass}
                        onChange={(e) => set("childClass", e.target.value)}
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#1d1c17] focus:outline-none focus:ring-2 focus:ring-[#0055c7] transition-all ${errors.childClass ? "border-[#FF786F]" : "border-[#e6e2da]"}`}
                      >
                        <option value="">Select year group…</option>
                        {CLASSES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.childClass && <p className="mt-1.5 text-xs text-[#FF786F]">{errors.childClass}</p>}
                    </div>
                  </div>

                  {/* Reading interests */}
                  <div>
                    <label className="block text-sm font-medium text-[#43474d] mb-3">
                      What does your child enjoy reading? <span className="text-[#74777e] font-normal">(pick all that apply)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((interest) => {
                        const checked = form.interests.includes(interest);
                        return (
                          <button
                            type="button"
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${
                              checked
                                ? "bg-[#001d36] text-white border-[#001d36] shadow-sm"
                                : "bg-white text-[#43474d] border-[#e6e2da] hover:border-[#001d36] hover:text-[#001d36]"
                            }`}
                          >
                            {checked && <span className="mr-1">✓</span>}
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label htmlFor="note" className="block text-sm font-medium text-[#43474d] mb-1.5">
                      Anything else you'd like us to know? <span className="text-[#74777e] font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="note" rows={3} value={form.note}
                      onChange={(e) => set("note", e.target.value)}
                      placeholder="e.g. My daughter is a reluctant reader and we're looking for tips…"
                      className="w-full bg-[#f8f3eb] border border-[#e6e2da] rounded-xl px-4 py-3 text-sm text-[#1d1c17] placeholder:text-[#74777e] focus:outline-none focus:ring-2 focus:ring-[#0055c7] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-4 rounded-full transition-all shadow-md shadow-[#1877F2]/30 active:scale-95 text-[15px]"
                  >
                    <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                    Request to Join the Community
                  </button>

                  <p className="text-center text-xs text-[#74777e]">
                    By submitting, you agree that your name will appear in our Facebook group request. We'll never share your details with third parties.
                  </p>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        {!submitted && (
          <section className="bg-[#f2ede5] py-16 px-4 md:px-12">
            <div className="max-w-[1100px] mx-auto">
              <h2 className="font-['Fredoka',sans-serif] text-2xl font-bold text-[#001d36] text-center mb-8">
                What parents are saying
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { name: "Emma P.", child: "Year 3 mum", quote: "I found the best book series for my son through this group. He went from refusing to read to asking for more chapters!" },
                  { name: "Aisha M.", child: "Year 1 mum", quote: "The reading challenge in January was so motivating. My daughter earned her first badge and was so proud." },
                  { name: "James T.", child: "Year 5 dad", quote: "Great community — no judgment, just parents helping parents. Lumi's recommendations from the group are spot on too." },
                ].map((t) => (
                  <div key={t.name} className="bg-white rounded-2xl border border-[#e6e2da] p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className="material-symbols-outlined text-[#f4bf40] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <p className="text-[14px] text-[#43474d] leading-relaxed mb-4 italic">"{t.quote}"</p>
                    <div>
                      <p className="text-sm font-semibold text-[#001d36]">{t.name}</p>
                      <p className="text-xs text-[#74777e]">{t.child}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
