import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us — Little Readers" }] }),
  component: AboutPage,
});

const TEAM = [
  { name: "Amara Osei", role: "Co-founder & Head of Curation", initial: "A", color: "#0055c7" },
  { name: "Daniel Wright", role: "Co-founder & Technology", initial: "D", color: "#FF786F" },
  { name: "Priya Nair", role: "Children's Literature Expert", initial: "P", color: "#72D6B2" },
];

const VALUES = [
  { icon: "auto_stories", title: "Curated with care", body: "Every book is hand-picked by teachers, librarians, and reading specialists to match curriculum goals and children's joy." },
  { icon: "school", title: "Curriculum-aligned", body: "Our catalogue maps to KS1 and KS2 objectives so parents and teachers can shop with confidence." },
  { icon: "volunteer_activism", title: "Inclusive & diverse", body: "We champion books that represent every child — different cultures, abilities, and family structures." },
  { icon: "support_agent", title: "Guided by Lumi", body: "Our AI reading guide learns each child's interests and level to recommend the perfect next book." },
];

function AboutPage() {
  return (
    <div className="bg-[#fef9f1] min-h-screen flex flex-col font-['Inter',sans-serif]">
      <SiteHeader active="about" />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#001d36] text-white py-24 px-4 md:px-12 text-center">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#0055c7]/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#f4bf40]/20 blur-3xl" />
          </div>
          <div className="relative max-w-[720px] mx-auto">
            <p className="text-[#afc9ea] text-sm font-semibold uppercase tracking-widest mb-4">Our story</p>
            <h1 className="font-['Fredoka',sans-serif] text-5xl md:text-6xl font-bold leading-tight mb-6">
              Books that open worlds.
            </h1>
            <p className="text-[#d1e4ff] text-lg leading-relaxed">
              Little Readers was founded by parents who couldn't find a bookshop that understood what their children actually needed — not just age-appropriate books, but books that match exactly where a child is in their reading journey.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-12 py-20">
          <h2 className="font-['Fredoka',sans-serif] text-3xl md:text-4xl font-bold text-[#001d36] text-center mb-12">
            What we believe in
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-[#e6e2da] p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#d1e4ff] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#0055c7] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{v.icon}</span>
                </div>
                <h3 className="font-['Fredoka',sans-serif] text-[17px] font-semibold text-[#001d36] mb-2">{v.title}</h3>
                <p className="text-sm text-[#43474d] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="bg-[#f2ede5] py-20 px-4 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-['Fredoka',sans-serif] text-3xl md:text-4xl font-bold text-[#001d36] text-center mb-12">
              Meet the team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {TEAM.map((member) => (
                <div key={member.name} className="flex flex-col items-center text-center bg-white rounded-2xl border border-[#e6e2da] p-8 shadow-sm">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold font-['Fredoka',sans-serif] mb-4 shadow-md"
                    style={{ background: member.color }}
                  >
                    {member.initial}
                  </div>
                  <h3 className="font-['Fredoka',sans-serif] text-[18px] font-semibold text-[#001d36] mb-1">{member.name}</h3>
                  <p className="text-sm text-[#74777e]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[720px] mx-auto px-4 py-20 text-center">
          <h2 className="font-['Fredoka',sans-serif] text-3xl font-bold text-[#001d36] mb-4">Ready to start the adventure?</h2>
          <p className="text-[#43474d] mb-8 text-[15px]">Browse our curated catalogue and let Lumi guide you to the perfect next read.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/catalogue"
              preload="intent"
              className="bg-[#0055c7] hover:bg-[#004bb0] text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md"
            >
              Browse Books
            </Link>
            <Link
              to="/contact"
              preload="intent"
              className="border-2 border-[#001d36] text-[#001d36] font-semibold px-8 py-3.5 rounded-full hover:bg-[#f8f3eb] transition-all"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
