import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us — Little Readers" }] }),
  component: ContactPage,
});

const CHANNELS = [
  { icon: "mail", title: "Email us", detail: "hello@littlereaders.co.uk", sub: "We reply within 24 hours" },
  { icon: "chat_bubble", title: "Live chat", detail: "Ask Lumi", sub: "Available 9am–6pm Mon–Fri", link: "/chat" },
  { icon: "phone", title: "Phone", detail: "0800 123 4567", sub: "Mon–Fri, 9am–5pm" },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#fef9f1] min-h-screen flex flex-col font-['Inter',sans-serif]">
      <SiteHeader active="contact" />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-12 py-16">
        {/* Hero */}
        <div className="text-center mb-14">
          <p className="text-[#0055c7] text-sm font-semibold uppercase tracking-widest mb-3">Get in touch</p>
          <h1 className="font-['Fredoka',sans-serif] text-4xl md:text-5xl font-bold text-[#001d36] mb-4">We'd love to hear from you</h1>
          <p className="text-[#43474d] text-lg max-w-xl mx-auto leading-relaxed">
            Whether you have a question about an order, a book recommendation, or just want to say hello — we're here.
          </p>
        </div>

        {/* Contact channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {CHANNELS.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl border border-[#e6e2da] p-6 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#d1e4ff] flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#0055c7] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{c.icon}</span>
              </div>
              <h3 className="font-['Fredoka',sans-serif] text-[17px] font-semibold text-[#001d36] mb-1">{c.title}</h3>
              {c.link ? (
                <Link to={c.link as "/chat"} preload="intent" className="text-[#0055c7] font-semibold text-sm hover:underline">{c.detail}</Link>
              ) : (
                <p className="text-[#0055c7] font-semibold text-sm">{c.detail}</p>
              )}
              <p className="text-xs text-[#74777e] mt-1">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-[640px] mx-auto">
          <div className="bg-white rounded-3xl border border-[#e6e2da] shadow-sm p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#d9f0e4] flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[#2e7d32] text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h2 className="font-['Fredoka',sans-serif] text-2xl font-bold text-[#001d36] mb-2">Message sent!</h2>
                <p className="text-[#43474d] mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="text-sm text-[#0055c7] font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-['Fredoka',sans-serif] text-2xl font-bold text-[#001d36] mb-6">Send a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#43474d] mb-1.5">Full name</label>
                      <input
                        id="name" type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full bg-[#f8f3eb] border border-[#e6e2da] rounded-xl px-4 py-3 text-sm text-[#1d1c17] placeholder:text-[#74777e] focus:outline-none focus:border-[#0055c7] focus:ring-1 focus:ring-[#0055c7] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#43474d] mb-1.5">Email address</label>
                      <input
                        id="email" type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full bg-[#f8f3eb] border border-[#e6e2da] rounded-xl px-4 py-3 text-sm text-[#1d1c17] placeholder:text-[#74777e] focus:outline-none focus:border-[#0055c7] focus:ring-1 focus:ring-[#0055c7] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#43474d] mb-1.5">Subject</label>
                    <select
                      id="subject" required value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#f8f3eb] border border-[#e6e2da] rounded-xl px-4 py-3 text-sm text-[#1d1c17] focus:outline-none focus:border-[#0055c7] focus:ring-1 focus:ring-[#0055c7] transition-all"
                    >
                      <option value="">Select a subject…</option>
                      <option value="order">Order enquiry</option>
                      <option value="books">Book recommendations</option>
                      <option value="account">Account help</option>
                      <option value="school">School / bulk orders</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#43474d] mb-1.5">Message</label>
                    <textarea
                      id="message" required rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help…"
                      className="w-full bg-[#f8f3eb] border border-[#e6e2da] rounded-xl px-4 py-3 text-sm text-[#1d1c17] placeholder:text-[#74777e] focus:outline-none focus:border-[#0055c7] focus:ring-1 focus:ring-[#0055c7] transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0055c7] hover:bg-[#004bb0] text-white font-semibold py-3.5 rounded-full transition-all shadow-md shadow-[#0055c7]/30 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
