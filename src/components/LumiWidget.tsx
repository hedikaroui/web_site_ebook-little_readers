import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useUI } from "@/lib/ui";

const AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ8OLAuApkS_KIEIlptLiFQzGKCqm-AISNyoJC2tWULXbsA-K96x9ngMC3_lVqmDr8H8oQAvL3GenKXqJX7RNm1bl4cLLhGkcUc7fGfm7eau6qRn51KaFDA4aJMzv2PADX-Hrdq0AnWtKrcXfEDv5doetB6D_t1GyJq7yds8DoCm7TplK0CZ9EMO5pQNMmMNMkGQ3s1YygQpMhfiLLZP_RWENPQSLTaXeQ8hN-CNHfFxgeEqFu4p_On9UBUMDCmh9mCvhpu-i84ZpF";

type Msg = { id: string; role: "lumi" | "user"; text: string };

let _n = 0;
const uid = () => `w${Date.now()}${++_n}`;

function reply(text: string): string {
  const t = text.toLowerCase();
  if (/\b(hi|hello|hey|hoot)\b/.test(t))
    return "Hoot! 👋 Great to meet you! I can help with book recommendations, order tracking, or reading tips. What do you need?";
  if (/\b(year\s*[123456]|ks1|ks2|key stage)\b/.test(t))
    return "Great — head to the Catalogue and I'll help you filter by year group! You can also tell me your child's year and I'll suggest titles. 📚";
  if (/\b(order|track|delivery|parcel|dispatch)\b/.test(t))
    return "Your last order (#LR-20481) was dispatched today — estimated delivery tomorrow by 6 pm! You can track it under My Orders. 📦";
  if (/\b(return|refund|wrong|damage|broken)\b/.test(t))
    return "So sorry to hear that! 😔 Please contact us at hello@littlereaders.co.uk with a photo and we'll sort a replacement or refund right away.";
  if (/\b(reluctant|won'?t read|hates? reading|not interested)\b/.test(t))
    return "Many parents say starting with comics, fact books, or audio stories helps! 🎧 Want me to suggest some reluctant-reader favourites?";
  if (/\b(animal|fox|dog|cat|nature|forest)\b/.test(t))
    return "Animal books are always a hit! Check out 'The Fox's Great Forest Adventure' in the Catalogue. It's a bestseller for Year 1–2. 🦊";
  if (/\b(recommend|suggest|what|best|good)\b/.test(t))
    return "I'd love to help! Tell me your child's age or year group and any topics they enjoy, and I'll find the perfect match. 📖";
  if (/\b(price|cost|cheap|expensive|discount|sale)\b/.test(t))
    return "Most of our books are £5–£12, and orders over £40 get free delivery! Check the Sale section in the Catalogue for current deals. 🏷️";
  if (/\b(community|facebook|group|join)\b/.test(t))
    return "Our parent community on Facebook is wonderful! Head to the Community page to join — parents share tips, challenges, and book discoveries every day. 💬";
  if (/\b(phonics|reading level|beginner|early)\b/.test(t))
    return "For early readers and phonics, we have a brilliant KS1 range. 'Phonics Fun: Set 1' is a great starting point — clear, fun, and curriculum-aligned! 🌟";
  return "I'd love to help! 🦉 Try asking about book recommendations, order tracking, reading tips, or joining our parent community.";
}

const INITIAL: Msg[] = [
  {
    id: uid(),
    role: "lumi",
    text: "Hoot! 🦉 I'm Lumi, your reading guide. Ask me about books, orders, or our parent community!",
  },
];

export function LumiWidget() {
  const { lumiOpen, openLumi, closeLumi } = useUI();
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t || typing) return;
      setMsgs((p) => [...p, { id: uid(), role: "user", text: t }]);
      setInput("");
      setTyping(true);
      setTimeout(() => {
        setMsgs((p) => [...p, { id: uid(), role: "lumi", text: reply(t) }]);
        setTyping(false);
      }, 700 + Math.random() * 500);
    },
    [typing]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") { e.preventDefault(); send(input); }
    },
    [input, send]
  );

  return (
    <>
      {/* ── Floating Lumi button — fixed BOTTOM-RIGHT ── */}
      <button
        onClick={lumiOpen ? closeLumi : openLumi}
        aria-label={lumiOpen ? "Close Lumi chat" : "Open Lumi chat assistant"}
        title={lumiOpen ? "Close Lumi" : "Ask Lumi"}
        className="fixed bottom-[72px] md:bottom-[52px] right-4 md:right-6 z-[9990] flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all hover:scale-110 active:scale-95"
        style={{
          background: lumiOpen ? "#001d36" : "white",
          border: "2.5px solid #e6e2da",
          boxShadow: lumiOpen ? "0 8px 24px rgba(0,29,54,0.35)" : "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        {lumiOpen ? (
          <span className="material-symbols-outlined text-white text-[24px]">close</span>
        ) : (
          <>
            <img src={AVATAR} alt="Lumi" className="h-full w-full rounded-full object-cover" />
            {/* Pulse ring when closed */}
            <span className="absolute inset-0 rounded-full animate-ping bg-[#0055c7]/20 pointer-events-none" style={{ animationDuration: "2.5s" }} />
          </>
        )}
      </button>

      {/* ── Mini chat panel — opens UPWARD from button ── */}
      <div
        className="fixed bottom-[144px] md:bottom-[116px] right-4 md:right-6 z-[9989] w-[calc(100vw-2rem)] max-w-[340px] flex flex-col rounded-2xl bg-white shadow-2xl border border-[#e6e2da] overflow-hidden transition-all duration-200"
        style={{
          opacity: lumiOpen ? 1 : 0,
          pointerEvents: lumiOpen ? "auto" : "none",
          transform: lumiOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(12px)",
          transformOrigin: "bottom right",
          maxHeight: "min(480px, calc(100vh - 140px))",
        }}
        role="dialog"
        aria-label="Lumi chat"
        aria-modal={lumiOpen}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#001d36] shrink-0">
          <div className="relative">
            <img src={AVATAR} alt="Lumi" className="w-9 h-9 rounded-full border-2 border-white/30 object-cover" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#72D6B2] rounded-full border-2 border-[#001d36]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white leading-tight">Lumi</p>
            <p className="text-[10px] text-[#72D6B2] font-medium">● Online — Reading Guide</p>
          </div>
          <Link
            to="/chat"
            preload="intent"
            onClick={closeLumi}
            className="text-[11px] font-semibold text-white/70 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Full chat →
          </Link>
        </div>

        {/* Quick prompts (shown when no user message yet) */}
        {msgs.length === 1 && (
          <div className="flex flex-wrap gap-2 px-3 pt-3 pb-1">
            {["Recommend a book", "Track my order", "Join community"].map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="px-3 py-1.5 bg-[#f2ede5] hover:bg-[#d1e4ff] text-[#001d36] text-[11px] font-medium rounded-full transition-colors border border-[#e6e2da] hover:border-[#0055c7]"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
          style={{ background: "rgba(254,249,241,0.8)" }}
        >
          {msgs.map((m) =>
            m.role === "lumi" ? (
              <div key={m.id} className="flex gap-2 max-w-[90%]">
                <img src={AVATAR} alt="Lumi" className="w-6 h-6 rounded-full shrink-0 mt-0.5 object-cover" />
                <div className="bg-white border border-[#e6e2da]/60 rounded-2xl rounded-tl-none px-3 py-2 text-[13px] leading-relaxed text-[#1d1c17] shadow-sm">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-end">
                <div className="bg-[#0055c7] rounded-2xl rounded-tr-none px-3 py-2 text-[13px] text-white max-w-[85%] shadow-sm">
                  {m.text}
                </div>
              </div>
            )
          )}
          {typing && (
            <div className="flex gap-2">
              <img src={AVATAR} alt="Lumi" className="w-6 h-6 rounded-full shrink-0 mt-0.5 object-cover" />
              <div className="bg-white border border-[#e6e2da]/60 rounded-2xl rounded-tl-none px-3 py-2.5 inline-flex gap-1 shadow-sm">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#74777e]"
                    style={{ animation: `lumi-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2 px-3 py-2.5 border-t border-[#e6e2da]/60 bg-white shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask Lumi…"
            disabled={typing}
            aria-label="Message Lumi"
            className="flex-1 rounded-full bg-[#f8f3eb] border border-[#e6e2da] px-3 py-2 text-[13px] text-[#1d1c17] placeholder:text-[#74777e] focus:outline-none focus:border-[#0055c7] focus:ring-1 focus:ring-[#0055c7] disabled:opacity-50 transition-all"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || typing}
            aria-label="Send message"
            className="w-9 h-9 rounded-full bg-[#0055c7] text-white flex items-center justify-center hover:bg-[#004bb0] transition-colors disabled:opacity-40 shadow-sm shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>
      </div>
    </>
  );
}
