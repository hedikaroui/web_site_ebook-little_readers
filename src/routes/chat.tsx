import { createFileRoute } from "@tanstack/react-router";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

// ── Avatar URLs (reused from design assets) ──────────────────────────────────
const AVATAR_SM =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ8OLAuApkS_KIEIlptLiFQzGKCqm-AISNyoJC2tWULXbsA-K96x9ngMC3_lVqmDr8H8oQAvL3GenKXqJX7RNm1bl4cLLhGkcUc7fGfm7eau6qRn51KaFDA4aJMzv2PADX-Hrdq0AnWtKrcXfEDv5doetB6D_t1GyJq7yds8DoCm7TplK0CZ9EMO5pQNMmMNMkGQ3s1YygQpMhfiLLZP_RWENPQSLTaXeQ8hN-CNHfFxgeEqFu4p_On9UBUMDCmh9mCvhpu-i84ZpF";
const AVATAR_MD =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDi0DwXIrJTpmQ26xH9MZfVEI3XiAvrUNb8r9qHUg0psS6VrvM0bT28vu2Ju-i_G_-FnX1aAn7RxTMlM0NNVbp0EaeKV1iF5oa30NRz5QsO6HPa3ZoK8Tgzag7NXHI9SVmWS6fjwEjeo7kPC8OlYU8skx2J3PzeXMKRYc9I-Tx4jine9Bo2CcPGSZmLt5uchWa7wJOhj-GQnchMhRKjFFToh90T4BpUVBuy8Jamr02CHk-hQSv3HdZHwZfyBbfUpMuwhdhokS5wj2UK";
const AVATAR_LG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCN8t06NSOW1WqX_HACchkGQKBpH6B9CxAfTWcRfE1pCk-9vGxWJa7O5d2LSbfV7vyJUVxLkXc-7A8295Im1gDscfvAleEQlVpma5yuZGfdBE4CXgIsxejUD45UI0MT3yZaxzJCf_N-_rx1Dml4ChyjmYL6PPY9KGS4An6BkP4YbOwjaO6RqPB7gMHxYptHVyzq_jdGYLsR22toDI3dvl60ACfPCg9lSAWEw5wDWGaUxZ_nzLBTkzamxnuVuUrMJF43pIPB4_6fAfmz";

// ── Book imagery (reused from design assets) ──────────────────────────────────
const IMG_FOX =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBsS-Y_cdZhCkZHcoFcRYvT-7F1ve0spbH0E61w12svycwaKjic5XXR9m0Gm24MEqUEiIOFj6fQEe4XLu4T1hJtHyMAZx9hsc4ASKUAXKTnjJvZBLoycT_Agdj6SCzU_IELYhRPWBr9wWfLWY12a9vSr07t30-2_wy8O4_aDcJPi7lGIJvZYDaPM9-StHsFVbUVSJiK_0n95RlOWsvfpVKB_hqkXh-4OIuM76dK0geparteR6EBZM8XyewkmCdMcGU-eArVE43nQQ1Z";
const IMG_SHELTER =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDRIwhe8N9Csc80FMsZL0kdS3aI9HS1PI1ESJpQ_kKO1dWSU5iPqrKRmQ8Dw2vT6RO_I-3-TAgeAWO0ls-UCd-_ge5gc3JvdHZXX_h3HvDRR4OZdGPwLIcNsKNOQIIsmTwmxdXz_mu0mjJe44FN9Ji9PF9k39vbtmdaS9mfyUXTl-UFbl5Kt2TCFNqcM4L73FsG-1jSWPtEn7WXtW5fkOkk3UPSlqyWpzaaDfMHd3meNs1Z2WTXeUxQ_icA3Oq2rBGew_h96ufrN83G";
const IMG_CHAPTER =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCKMWfn_roygg-mQlR4TLSCNYYrPI3LicC9fn6QevOCiAyC7MCcjSrP_IjSkfDxAU_cNJE5HLPBdtreGwlEkSaos7nGdQLvIuW2vJobLggrrCrRVhuMKpIZAIXlaTBEkpe4pk6woqYLgSDb6fRerqfO5bCuGbgsM9ZX27Rlaf7JtANMgf-Aqb9eRHPHGRuVhTgAEXZlAj6H15hRRMq4-coJ4cLEgp4WEK4vDIa0N4q8EUGnn_rEshQNLr5uNzuxJ5U57_H1xjYijghs";

// ── Types ────────────────────────────────────────────────────────────────────
type BookCard = {
  id: string;
  title: string;
  author: string;
  price: string;
  badge?: string;
  img?: string;
  gradient?: [string, string];
};

type ChatMessage = {
  id: string;
  role: "lumi" | "user";
  text: string;
  cards?: BookCard[];
  prompts?: string[];
};

// ── Book catalogue ────────────────────────────────────────────────────────────
const BOOKS: Record<string, BookCard[]> = {
  year1: [
    { id: "y1a", title: "Biff, Chip and Kipper Stories", author: "Roderick Hunt", price: "£6.99", badge: "KS1 Fav", gradient: ["#d1e4ff", "#afc9ea"] },
    { id: "y1b", title: "The Gruffalo", author: "Julia Donaldson", price: "£7.50", badge: "Classic", gradient: ["#ffdf9e", "#f4bf40"] },
    { id: "y1c", title: "Phonics Fun: Set 1", author: "Oxford Reading Tree", price: "£5.99", gradient: ["#d9f0e4", "#72D6B2"] },
  ],
  year2: [
    { id: "y2a", title: "The Fox's Great Forest Adventure", author: "Sarah Jenkins", price: "£8.99", badge: "Bestseller", img: IMG_FOX },
    { id: "y2b", title: "Magic Tree House: Dinosaurs", author: "Mary Pope Osborne", price: "£7.50", gradient: ["#fce4d6", "#FF786F"] },
    { id: "y2c", title: "Horrid Henry", author: "Francesca Simon", price: "£6.99", badge: "Staff Pick", gradient: ["#e8d5f5", "#b39ddb"] },
  ],
  year3: [
    { id: "y3a", title: "Mystery at the Animal Shelter", author: "David Owusu", price: "£7.50", img: IMG_SHELTER },
    { id: "y3b", title: "Diary of a Wimpy Kid", author: "Jeff Kinney", price: "£8.50", badge: "Bestseller", gradient: ["#fff9c4", "#f4bf40"] },
    { id: "y3c", title: "The Worst Witch", author: "Jill Murphy", price: "£7.99", gradient: ["#e3d5f5", "#9575cd"] },
  ],
  year4: [
    { id: "y4a", title: "Percy Jackson & The Lightning Thief", author: "Rick Riordan", price: "£9.99", badge: "Bestseller", img: IMG_CHAPTER },
    { id: "y4b", title: "Charlotte's Web", author: "E.B. White", price: "£8.50", badge: "Classic", gradient: ["#d1e4ff", "#afc9ea"] },
    { id: "y4c", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", price: "£9.50", gradient: ["#fff3e0", "#ffb300"] },
  ],
  animals: [
    { id: "ana", title: "The Fox's Great Forest Adventure", author: "Sarah Jenkins", price: "£8.99", badge: "Bestseller", img: IMG_FOX },
    { id: "anb", title: "Mystery at the Animal Shelter", author: "David Owusu", price: "£7.50", img: IMG_SHELTER },
    { id: "anc", title: "Charlotte's Web", author: "E.B. White", price: "£8.50", badge: "Classic", gradient: ["#d1e4ff", "#afc9ea"] },
  ],
  phonics: [
    { id: "pha", title: "Phonics Fun: Set 1", author: "Oxford Reading Tree", price: "£5.99", badge: "KS1", gradient: ["#d9f0e4", "#72D6B2"] },
    { id: "phb", title: "Biff, Chip and Kipper Stories", author: "Roderick Hunt", price: "£6.99", gradient: ["#d1e4ff", "#afc9ea"] },
    { id: "phc", title: "Alphablocks Read with Phonics", author: "Louis Fidge", price: "£6.50", badge: "TV Tie-in", gradient: ["#fce4d6", "#FF786F"] },
  ],
  maths: [
    { id: "maa", title: "Maths Makes Sense: Year 1", author: "Carol Vorderman", price: "£8.99", badge: "Curriculum", gradient: ["#d1e4ff", "#0055c7"] },
    { id: "mab", title: "Counting with Critters", author: "Elaine Haddock", price: "£7.20", gradient: ["#d9f0e4", "#72D6B2"] },
    { id: "mac", title: "Times Tables Adventurer", author: "Various", price: "£6.99", badge: "Popular", gradient: ["#fff9c4", "#f4bf40"] },
  ],
  science: [
    { id: "sca", title: "DK Find Out! Science", author: "DK", price: "£11.99", badge: "Reference", gradient: ["#e8f5e9", "#43a047"] },
    { id: "scb", title: "Horrible Science: Deadly Diseases", author: "Nick Arnold", price: "£8.50", gradient: ["#fce4d6", "#FF786F"] },
    { id: "scc", title: "How Things Work: Science for Kids", author: "Various", price: "£9.99", gradient: ["#d1e4ff", "#afc9ea"] },
  ],
  general: [
    { id: "gna", title: "The Fox's Great Forest Adventure", author: "Sarah Jenkins", price: "£8.99", badge: "Bestseller", img: IMG_FOX },
    { id: "gnb", title: "Diary of a Wimpy Kid", author: "Jeff Kinney", price: "£8.50", gradient: ["#fff9c4", "#f4bf40"] },
    { id: "gnc", title: "Magic Tree House: Dinosaurs", author: "Mary Pope Osborne", price: "£7.50", gradient: ["#fce4d6", "#FF786F"] },
  ],
};

// ── Intent detection ──────────────────────────────────────────────────────────
type Intent =
  | "greeting"
  | "year1" | "year2" | "year3" | "year4"
  | "animals" | "phonics" | "maths" | "science"
  | "reluctant" | "order" | "general";

function detectIntent(raw: string): Intent {
  const t = raw.toLowerCase();
  if (/\b(hi|hello|hey|hiya|howdy|good (morning|afternoon|evening))\b/.test(t)) return "greeting";
  if (/\b(year\s*1|age\s*[56]|reception|ks1)\b/.test(t)) return "year1";
  if (/\b(year\s*2|age\s*7)\b/.test(t)) return "year2";
  if (/\b(year\s*3|age\s*8)\b/.test(t)) return "year3";
  if (/\b(year\s*[456]|age\s*(9|10|11)|upper\s*ks2|chapter book)\b/.test(t)) return "year4";
  if (/\b(animal|nature|wildlife|dog|cat|fox|bird|horse|rabbit|dinosaur|creature)\b/.test(t)) return "animals";
  if (/\b(phonics|sound|letter|blend|segmenting|sight word|decode)\b/.test(t)) return "phonics";
  if (/\b(maths|math|number|count|addition|times table|multiply|subtract)\b/.test(t)) return "maths";
  if (/\b(science|experiment|biology|physics|chemistry|how things work|discovery)\b/.test(t)) return "science";
  if (/\b(reluctant|won'?t read|doesn'?t like|hates? reading|not interested|bored|struggle|put.*down)\b/.test(t)) return "reluctant";
  if (/\b(order|track|delivery|where is|shipping|parcel|dispatch|arrive|sent)\b/.test(t)) return "order";
  return "general";
}

// ── Response builder ──────────────────────────────────────────────────────────
function buildResponse(intent: Intent): Pick<ChatMessage, "text" | "cards" | "prompts"> {
  switch (intent) {
    case "greeting":
      return {
        text: "Hoot hoot! 👋 Great to see you! I'm Lumi, your reading guide at Little Readers. I can help you find the perfect book for your child's age and interests, track your orders, or share tips for encouraging reluctant readers.\n\nWhat would you like to explore today?",
        prompts: ["Recommend Year 2 books", "Books about animals", "Reluctant reader tips", "Where is my order?"],
      };

    case "year1":
      return {
        text: "Year 1 is such an exciting reading milestone! Here are wonderful picks for early readers aged 5–6. These build phonics confidence and spark a real love of stories:",
        cards: BOOKS.year1,
        prompts: ["More Year 1 series", "Try phonics books", "Reluctant Year 1 reader"],
      };

    case "year2":
      return {
        text: "Year 2 readers are ready for more adventure! These books balance phonics practice with rich storytelling — perfect for building fluency and confidence at age 6–7:",
        cards: BOOKS.year2,
        prompts: ["More Year 2 picks", "Animal books for Year 2", "Something funny?"],
      };

    case "year3":
      return {
        text: "Year 3 is when readers really take off! Here are engaging chapter books that keep 7–8 year olds asking for 'just one more chapter':",
        cards: BOOKS.year3,
        prompts: ["More Year 3 series", "Books about animals", "Something funny?"],
      };

    case "year4":
      return {
        text: "Upper KS2 readers are ready for bigger adventures! These books offer richer vocabulary, longer chapters, and themes that genuinely captivate 9–11 year olds:",
        cards: BOOKS.year4,
        prompts: ["More classics", "Science & nature books", "Fantasy series"],
      };

    case "animals":
      return {
        text: "Animal books are always a hit! 🦊🐶 Whether your child loves wildlife, pets, or magical creatures, these stories are guaranteed page-turners:",
        cards: BOOKS.animals,
        prompts: ["What year group?", "More animal adventures", "Wildlife non-fiction"],
      };

    case "phonics":
      return {
        text: "Phonics books are brilliant for building reading foundations. These work beautifully alongside school programmes like Letters & Sounds or Read Write Inc:",
        cards: BOOKS.phonics,
        prompts: ["Reception phonics", "Year 1 phonics sets", "Reading scheme books"],
      };

    case "maths":
      return {
        text: "Learning maths through books can be really powerful! Here are teacher-approved picks that make numbers feel like a fun adventure:",
        cards: BOOKS.maths,
        prompts: ["Curriculum-aligned workbooks", "Fun maths stories", "What year group?"],
      };

    case "science":
      return {
        text: "Science books ignite curiosity! 🔬 These are the ones teachers and parents rave about for sparking big questions and a love of discovery:",
        cards: BOOKS.science,
        prompts: ["Biology books", "Experiment books", "KS2 science"],
      };

    case "reluctant":
      return {
        text: "You're not alone — and there's a lot you can do! Here are Lumi's top tips for reluctant readers:\n\n🎮 **Start with what they love** — comics, joke books, and fact files all count as reading.\n\n📖 **Keep chapters short** — look for books under 5 pages per chapter for quick wins.\n\n🔉 **Read together** — taking turns removes pressure and keeps it fun.\n\n🐾 **Let them choose** — autonomy matters. Funny books and animal adventures often win kids over.\n\nWant me to suggest specific books for reluctant readers by age?",
        prompts: ["Reluctant readers age 5-7", "Reluctant readers age 8-9", "Short chapter books", "Funny books"],
      };

    case "order":
      return {
        text: "I can see your most recent order! Here's a quick update:\n\n📦 **Order #LR-20481** — 3 items\n📅 **Dispatched:** Today, 9:14 am\n🚚 **Estimated delivery:** Tomorrow by 6 pm\n🔍 **Carrier:** Royal Mail Tracked 24\n\nYou can track your parcel in real-time on the Orders page. Is there anything else I can help with?",
        prompts: ["View full orders", "Browse more books", "Return an item"],
      };

    default:
      return {
        text: "I'd love to help you find the perfect book! Try asking me things like:\n\n• \"Recommend books for Year 2\"\n• \"My child loves animals\"\n• \"Tips for reluctant readers\"\n• \"Where is my order?\"\n\nWhat would you like to explore? 🦉",
        prompts: ["Browse by year group", "Popular this week", "Teacher recommendations"],
      };
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
let _seq = 0;
const uid = () => `m${Date.now()}${++_seq}`;

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: uid(),
    role: "lumi",
    text: "Hello! I'm Lumi. 👋 I can help you find the perfect books for your child's reading level, track your latest orders, or suggest fun educational activities. What can I help you discover today?",
    prompts: ["Recommend Year 2 Books", "Where is my order?", "Reluctant reader tips", "Books about animals"],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex gap-4 max-w-[85%]">
      <img alt="Lumi" src={AVATAR_SM} className="w-8 h-8 rounded-full shrink-0 mt-1 object-cover" />
      <div className="bg-white border border-[#e6e2da]/50 shadow-sm p-4 rounded-2xl rounded-tl-none inline-flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-[#74777e]"
            style={{ animation: `lumi-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

function BookCards({ cards }: { cards: BookCard[] }) {
  return (
    <div
      className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#c3c6ce transparent" }}
    >
      {cards.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.07)] border border-[#e6e2da]/60 w-[190px] shrink-0 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-0.5 transition-transform duration-200"
        >
          <div
            className="h-[150px] flex items-center justify-center relative overflow-hidden"
            style={
              book.img
                ? { background: "#f8f3eb" }
                : { background: `linear-gradient(135deg, ${book.gradient![0]}, ${book.gradient![1]})` }
            }
          >
            {book.badge && (
              <span className="absolute top-2.5 left-2.5 bg-[#ffdf9e] text-[#261a00] text-[10px] font-semibold px-2 py-0.5 rounded-full z-10 shadow-sm">
                {book.badge}
              </span>
            )}
            {book.img ? (
              <img
                alt={book.title}
                src={book.img}
                className="h-full w-auto object-contain p-3 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <span
                className="material-symbols-outlined text-[44px] text-white/50"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                menu_book
              </span>
            )}
          </div>
          <div className="p-3 flex flex-col flex-1">
            <h4 className="text-[12px] font-semibold text-[#001d36] line-clamp-2 mb-0.5 leading-snug">
              {book.title}
            </h4>
            <p className="text-[11px] text-[#74777e] mb-2">{book.author}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-[14px] font-bold text-[#001d36]">{book.price}</span>
              <button
                onClick={(e) => e.stopPropagation()}
                aria-label={`Add ${book.title} to cart`}
                className="w-7 h-7 rounded-full bg-[#d9e2ff] flex items-center justify-center text-[#001945] hover:bg-[#0055c7] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">add</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RichText({ text }: { text: string }) {
  return (
    <p className="text-[15px] leading-relaxed text-[#1d1c17] whitespace-pre-wrap">
      {text.split(/(\*\*[^*]+\*\*)/).map((chunk, i) =>
        chunk.startsWith("**") && chunk.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[#001d36]">
            {chunk.slice(2, -2)}
          </strong>
        ) : (
          chunk
        )
      )}
    </p>
  );
}

function Bubble({
  msg,
  onPrompt,
}: {
  msg: ChatMessage;
  onPrompt: (text: string) => void;
}) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end w-full">
        <div className="bg-[#d1e4ff] text-[#001945] p-4 rounded-[18px] rounded-tr-none max-w-[72%] shadow-sm">
          <p className="text-[15px] leading-relaxed">{msg.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 max-w-full">
      <img
        alt="Lumi"
        src={AVATAR_SM}
        className="w-8 h-8 rounded-full shrink-0 mt-1 object-cover"
      />
      <div className="flex-1 overflow-hidden min-w-0">
        <div className="bg-white border border-[#e6e2da]/50 shadow-sm p-4 rounded-[18px] rounded-tl-none inline-block mb-2 max-w-[88%]">
          <RichText text={msg.text} />
        </div>

        {msg.cards && msg.cards.length > 0 && (
          <div className="mb-3">
            <BookCards cards={msg.cards} />
          </div>
        )}

        {msg.prompts && msg.prompts.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {msg.prompts.map((p) => (
              <button
                key={p}
                onClick={() => onPrompt(p)}
                className="px-3 py-1.5 rounded-full border border-[#c3c6ce] bg-white text-[#43474d] text-[13px] font-medium hover:bg-[#0055c7] hover:text-white hover:border-[#0055c7] transition-all shadow-sm"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Lumi Chatbot — Little Readers" }] }),
  component: ChatPage,
});

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      setMessages((prev) => [...prev, { id: uid(), role: "user", text: trimmed }]);
      setInput("");
      setIsTyping(true);

      // Lumi "thinks" for 700-1300 ms before responding
      const delay = 700 + Math.random() * 600;
      setTimeout(() => {
        const response = buildResponse(detectIntent(trimmed));
        setMessages((prev) => [...prev, { id: uid(), role: "lumi", ...response }]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send(input);
      }
    },
    [input, send]
  );

  return (
    <div className="bg-[#fef9f1] text-[#1d1c17] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* Custom scrollbar for chat window */}
      <style>{`
        .lumi-scroll::-webkit-scrollbar { width: 4px; }
        .lumi-scroll::-webkit-scrollbar-track { background: transparent; }
        .lumi-scroll::-webkit-scrollbar-thumb { background: #c3c6ce; border-radius: 8px; }
      `}</style>

      <SiteHeader active="" />

      <div className="flex flex-1 overflow-hidden max-w-[1440px] mx-auto w-full">
        {/* ── Desktop Sidebar ── */}
        <aside className="hidden md:flex flex-col bg-white border-r border-[#e6e2da] w-72 shrink-0">
          <div className="px-6 pt-8 pb-6 flex items-center gap-3 border-b border-[#e6e2da]">
            <img
              alt="Lumi the Owl"
              src={AVATAR_LG}
              className="w-12 h-12 rounded-full border border-[#e6e2da] object-cover"
            />
            <div>
              <h2 className="font-['Fredoka',sans-serif] text-[17px] font-semibold text-[#001d36]">
                Lumi the Owl
              </h2>
              <p className="text-xs text-[#74777e]">Your Reading Guide</p>
            </div>
          </div>
          <nav className="px-3 py-4 space-y-1">
            {[
              { icon: "menu_book", label: "Books", to: "/catalogue" as const },
              { icon: "star", label: "Teachers' Choice", to: "/catalogue" as const },
              { icon: "school", label: "School Years", to: "/catalogue" as const },
              { icon: "sell", label: "Sale", to: "/catalogue" as const },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                preload="intent"
                className="flex items-center gap-3 px-4 py-3 rounded-full text-[#43474d] hover:bg-[#f2ede5] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="text-[14px] font-medium">{item.label}</span>
              </Link>
            ))}
            {/* Active: Ask Lumi */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#17324d] text-white cursor-default">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                support_agent
              </span>
              <span className="text-[14px] font-medium">Ask Lumi</span>
            </div>
          </nav>
        </aside>

        {/* ── Chat Panel ── */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 max-w-[900px] w-full mx-auto px-4 py-6 md:px-8 md:py-8 flex flex-col overflow-hidden">
            {/* Page title */}
            <div className="mb-5 shrink-0">
              <h1 className="font-['Fredoka',sans-serif] text-3xl font-bold text-[#001d36]">
                Lumi Chatbot
              </h1>
              <p className="text-sm text-[#74777e] mt-1">
                Your personalised guide to the perfect reading journey.
              </p>
            </div>

            {/* Chat window */}
            <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#e6e2da]/60 overflow-hidden">

              {/* Panel header */}
              <div className="bg-[#fafafa] border-b border-[#e6e2da]/50 px-5 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      alt="Lumi"
                      src={AVATAR_MD}
                      className="w-9 h-9 rounded-full border border-[#e6e2da] object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#72D6B2] border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#001d36]">Lumi</h3>
                    <p className="text-[10px] text-[#74777e] uppercase tracking-widest">
                      Learning Assistant
                    </p>
                  </div>
                </div>
                <button
                  className="p-1.5 text-[#74777e] hover:bg-[#f2ede5] rounded-full transition-colors"
                  aria-label="Options"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>

              {/* Message list */}
              <div
                ref={listRef}
                className="flex-1 overflow-y-auto lumi-scroll px-5 py-5 space-y-5"
                style={{ background: "rgba(254,249,241,0.5)" }}
              >
                {messages.map((msg) => (
                  <Bubble key={msg.id} msg={msg} onPrompt={send} />
                ))}
                {isTyping && <TypingDots />}
              </div>

              {/* Input bar */}
              <div className="p-4 bg-white border-t border-[#e6e2da]/50 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Attach"
                    className="p-2 text-[#74777e] hover:text-[#0055c7] hover:bg-[#f2ede5] rounded-full transition-colors shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="material-symbols-outlined text-[22px]">add_circle</span>
                  </button>

                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      onClick={(e) => e.stopPropagation()}
                      disabled={isTyping}
                      placeholder="Ask Lumi anything about books…"
                      className="w-full bg-[#f8f3eb] border border-[#e6e2da] rounded-2xl pl-4 pr-12 py-3 text-[15px] text-[#1d1c17] placeholder:text-[#74777e] focus:outline-none focus:border-[#0055c7] focus:ring-1 focus:ring-[#0055c7] transition-all disabled:opacity-50"
                    />
                    <button
                      aria-label="Voice input"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#74777e] hover:text-[#0055c7] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="material-symbols-outlined text-[20px]">mic</span>
                    </button>
                  </div>

                  <button
                    aria-label="Send message"
                    onClick={(e) => { e.stopPropagation(); send(input); }}
                    disabled={!input.trim() || isTyping}
                    className="w-11 h-11 shrink-0 rounded-full bg-[#0055c7] text-white flex items-center justify-center shadow-sm hover:bg-[#004bb0] hover:scale-105 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#0055c7]"
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      send
                    </span>
                  </button>
                </div>

                <p className="text-center text-[11px] text-[#74777e] mt-2.5">
                  Lumi suggests books based on age, level & interests. Always check suitability for your child.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
