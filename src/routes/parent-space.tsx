import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/parent-space")({
  head: () => ({
    meta: [
      { title: "Parent Space — Little Readers" },
      {
        name: "description",
        content:
          "Your family hub: children, reading progress, orders, and recommendations.",
      },
    ],
  }),
  component: ParentSpacePage,
});

type Child = {
  name: string;
  age: number;
  level: string;
  progress: number;
  book: string;
  color: string;
};

const INITIAL_CHILDREN: Child[] = [
  { name: "Mia", age: 7, level: "Year 2", progress: 72, book: "The Whispering Woods", color: "#FF786F" },
  { name: "Leo", age: 5, level: "Early Years", progress: 41, book: "Numbers in the Garden", color: "#72D6B2" },
];

const YEAR_LEVELS = ["Early Years", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"];
const COLORS = [
  { hex: "#FF786F", label: "Coral" },
  { hex: "#72D6B2", label: "Mint" },
  { hex: "#0055c7", label: "Blue" },
  { hex: "#f4bf40", label: "Gold" },
  { hex: "#9575cd", label: "Violet" },
];

const PLACEHOLDER_BOOKS = [
  "Starting their reading journey",
  "First pages ahead",
  "Ready to explore",
  "A new adventure awaits",
];

const shortcuts: { to: "/catalogue" | "/orders" | "/dashboard" | "/chat"; icon: string; label: string; sub: string }[] = [
  { to: "/catalogue", icon: "menu_book", label: "Browse books", sub: "Curated by teachers" },
  { to: "/orders", icon: "receipt_long", label: "My orders", sub: "Track & re-order" },
  { to: "/dashboard", icon: "insights", label: "Reading insights", sub: "Weekly progress" },
  { to: "/chat", icon: "support_agent", label: "Ask Lumi", sub: "Personalised picks" },
];

const recommendations = [
  { title: "Brave Little Boats", tag: "Storybook · Age 5-7", price: "£8.50" },
  { title: "Counting with Critters", tag: "Maths · Early Years", price: "£7.20" },
  { title: "Phonics Adventures 2", tag: "Phonics · Year 1", price: "£9.00" },
];

function ParentSpacePage() {
  const [childList, setChildList] = useState<Child[]>(INITIAL_CHILDREN);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("5");
  const [level, setLevel] = useState("Year 1");
  const [color, setColor] = useState(COLORS[2].hex);
  const [nameError, setNameError] = useState(false);
  const [added, setAdded] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showForm) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        nameRef.current?.focus();
      }, 80);
    }
  }, [showForm]);

  function openForm() {
    setName("");
    setAge("5");
    setLevel("Year 1");
    setColor(COLORS[2].hex);
    setNameError(false);
    setShowForm(true);
  }

  function cancel() {
    setShowForm(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setNameError(true); nameRef.current?.focus(); return; }
    const newChild: Child = {
      name: name.trim(),
      age: parseInt(age, 10),
      level,
      progress: 0,
      book: PLACEHOLDER_BOOKS[childList.length % PLACEHOLDER_BOOKS.length],
      color,
    };
    setChildList((prev) => [...prev, newChild]);
    setAdded(newChild.name);
    setShowForm(false);
    setTimeout(() => setAdded(null), 3000);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fef9f1] font-['Inter',sans-serif] text-[#1d1c17]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-[#afc9ea]/25 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[5%] h-[45%] w-[45%] rounded-full bg-[#ffdf9e]/30 blur-3xl" />
      </div>

      <SiteHeader />

      {/* Added toast */}
      {added && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2 rounded-full bg-[#001d36] px-5 py-3 text-sm font-semibold text-white shadow-xl">
          <span className="material-symbols-outlined text-[#72D6B2] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          {added}'s profile added!
        </div>
      )}

      <main className="mx-auto max-w-[1200px] px-4 py-10 md:px-12 md:py-14">
        {/* Greeting */}
        <section className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0055c7]">
            Parent space
          </p>
          <h1 className="mt-2 font-['Fredoka',sans-serif] text-4xl font-bold leading-tight text-[#001d36] md:text-5xl">
            Welcome back, Alex.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#43474d]">
            Your family has read 4 books this week. Lumi has a few new picks
            for Mia and Leo based on their progress.
          </p>
        </section>

        {/* Children */}
        <section id="children" className="mb-12">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-['Fredoka',sans-serif] text-xl font-semibold text-[#001d36]">
              Your children
            </h2>
            <span className="text-xs text-[#74777e]">{childList.length} profile{childList.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {childList.map((c) => (
              <Link
                key={c.name + c.age}
                to="/dashboard"
                preload="intent"
                className="group rounded-3xl border border-[#e6e2da] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white shrink-0"
                    style={{ background: c.color }}
                  >
                    {c.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-['Fredoka',sans-serif] text-lg font-semibold text-[#001d36]">
                      {c.name}
                    </div>
                    <div className="text-xs text-[#74777e]">
                      Age {c.age} · {c.level}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#74777e] transition-transform group-hover:translate-x-1 shrink-0">
                    arrow_forward
                  </span>
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs font-medium text-[#43474d]">
                    <span className="truncate mr-2">{c.progress === 0 ? "No book started yet" : `Now reading · ${c.book}`}</span>
                    <span className="shrink-0">{c.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f2ede5]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${c.progress}%`, background: c.color }}
                    />
                  </div>
                </div>
              </Link>
            ))}

            {/* Add child button */}
            {!showForm && (
              <button
                onClick={openForm}
                className="flex items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-[#c3c6ce] bg-white/40 p-6 text-sm font-semibold text-[#43474d] transition-colors hover:border-[#0055c7] hover:text-[#0055c7] sm:col-span-2 w-full"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                Add another child
              </button>
            )}
          </div>

          {/* Inline add-child form */}
          {showForm && (
            <div
              ref={formRef}
              className="mt-4 rounded-3xl border border-[#0055c7]/30 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-['Fredoka',sans-serif] text-lg font-semibold text-[#001d36]">
                  Add a child profile
                </h3>
                <button onClick={cancel} aria-label="Cancel" className="flex h-8 w-8 items-center justify-center rounded-full text-[#74777e] hover:bg-[#f2ede5] hover:text-[#001d36] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={submit} noValidate className="space-y-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#43474d]">Child's name <span className="text-[#FF786F]">*</span></label>
                  <input
                    ref={nameRef}
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setNameError(false); }}
                    placeholder="e.g. Sophie"
                    className={`w-full rounded-2xl border px-4 py-3 text-base text-[#1d1c17] outline-none transition-colors placeholder:text-[#74777e] focus:ring-2 ${nameError ? "border-[#FF786F] focus:border-[#FF786F] focus:ring-[#FF786F]/30" : "border-[#c3c6ce] focus:border-[#0055c7] focus:ring-[#0055c7]/30"}`}
                  />
                  {nameError && <p className="text-xs text-[#FF786F]">Please enter a name.</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Age */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#43474d]">Age</label>
                    <select
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full rounded-2xl border border-[#c3c6ce] bg-white px-4 py-3 text-base text-[#1d1c17] outline-none focus:border-[#0055c7] focus:ring-2 focus:ring-[#0055c7]/30"
                    >
                      {Array.from({ length: 11 }, (_, i) => i + 3).map((a) => (
                        <option key={a} value={a}>{a} years old</option>
                      ))}
                    </select>
                  </div>

                  {/* Year group */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#43474d]">Year group</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full rounded-2xl border border-[#c3c6ce] bg-white px-4 py-3 text-base text-[#1d1c17] outline-none focus:border-[#0055c7] focus:ring-2 focus:ring-[#0055c7]/30"
                    >
                      {YEAR_LEVELS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Colour */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#43474d]">Profile colour</label>
                  <div className="flex gap-3">
                    {COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        title={c.label}
                        onClick={() => setColor(c.hex)}
                        className="h-9 w-9 rounded-full transition-transform hover:scale-110 focus:outline-none"
                        style={{
                          background: c.hex,
                          boxShadow: color === c.hex ? `0 0 0 3px white, 0 0 0 5px ${c.hex}` : "none",
                          transform: color === c.hex ? "scale(1.15)" : undefined,
                        }}
                        aria-pressed={color === c.hex}
                        aria-label={c.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                {name.trim() && (
                  <div className="flex items-center gap-4 rounded-2xl border border-[#e6e2da] bg-[#fef9f1] px-4 py-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold text-white shrink-0"
                      style={{ background: color }}
                    >
                      {name.trim()[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-[#001d36] text-sm">{name.trim()}</div>
                      <div className="text-xs text-[#74777e]">Age {age} · {level}</div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={cancel}
                    className="flex-1 rounded-full border border-[#c3c6ce] py-3 text-sm font-semibold text-[#43474d] transition-colors hover:bg-[#f8f3eb]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#0055c7] py-3 text-sm font-semibold text-white transition-all hover:bg-[#004bb0] hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    Add {name.trim() || "child"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>

        {/* Shortcuts */}
        <section className="mb-12">
          <h2 className="mb-4 font-['Fredoka',sans-serif] text-xl font-semibold text-[#001d36]">
            Quick actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {shortcuts.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                preload="intent"
                className="group rounded-2xl border border-[#e6e2da] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0055c7] hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d1e4ff] text-[#0055c7]">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <div className="font-semibold text-[#001d36]">{s.label}</div>
                <div className="mt-1 text-xs text-[#74777e]">{s.sub}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-4">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-['Fredoka',sans-serif] text-xl font-semibold text-[#001d36]">
              Lumi's picks this week
            </h2>
            <Link
              to="/catalogue"
              preload="intent"
              className="text-sm font-semibold text-[#0055c7] hover:underline"
            >
              See all →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.map((r) => (
              <Link
                key={r.title}
                to="/book"
                preload="intent"
                className="group flex items-center gap-4 rounded-2xl border border-[#e6e2da] bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#afc9ea] to-[#d1e4ff] text-[#001d36]">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[#001d36]">{r.title}</div>
                  <div className="text-xs text-[#74777e]">{r.tag}</div>
                </div>
                <div className="text-sm font-bold text-[#0055c7]">
                  {r.price}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
