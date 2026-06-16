import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Welcome — Little Readers" },
      {
        name: "description",
        content:
          "Find the right book for your child. A curated selection to build reading confidence and spark imagination.",
      },
      { property: "og:title", content: "Welcome — Little Readers" },
      {
        property: "og:description",
        content: "Curated educational books for young learners.",
      },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fef9f1] font-['Inter',sans-serif] text-[#1d1c17]">
      {/* Decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-[#afc9ea]/30 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[5%] h-[50%] w-[50%] rounded-full bg-[#f4bf40]/20 blur-3xl" />
      </div>

      <main className="mx-auto flex min-h-screen max-w-[1200px] items-center justify-center p-4 md:p-12">
        <div className="flex w-full min-h-[600px] flex-col overflow-hidden rounded-3xl border border-[#e6e2da] bg-white shadow-sm md:flex-row">
          {/* Left: actions */}
          <section className="relative z-10 flex w-full flex-col justify-center p-8 md:w-[60%] md:p-16">
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#17324d] text-white">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  book
                </span>
              </div>
              <span className="font-['Fredoka',sans-serif] text-2xl font-semibold tracking-tight text-[#001d36]">
                Little Readers
              </span>
            </div>

            <div className="max-w-md">
              <h1 className="mb-6 font-['Fredoka',sans-serif] text-4xl font-bold leading-tight text-[#001d36] md:text-5xl">
                Find the right book for your child.
              </h1>
              <p className="mb-10 text-lg leading-relaxed text-[#43474d]">
                A curated selection to build reading confidence and spark
                imagination.
              </p>

              <div className="mb-10 flex w-full max-w-sm flex-col gap-4">
                <Link
                  to="/signup"
                  preload="intent"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0055c7] px-6 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-[#004bb0] active:scale-[0.98]"
                >
                  Create Account
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  to="/login"
                  preload="intent"
                  className="w-full rounded-full border-2 border-[#001d36] bg-white px-6 py-3.5 text-center text-sm font-semibold text-[#001d36] transition-all hover:scale-[1.02] hover:bg-[#f8f3eb] active:scale-[0.98]"
                >
                  Log In
                </Link>
                <Link
                  to="/catalogue"
                  preload="intent"
                  className="mt-2 text-center text-sm font-medium text-[#74777e] underline-offset-4 transition-colors hover:text-[#001d36] hover:underline"
                >
                  Browse as Guest
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#e6e2da] pt-6">
                {[
                  { icon: "check_circle", label: "Teacher-selected books" },
                  { icon: "visibility", label: "Clear previews" },
                  { icon: "favorite", label: "Parent support" },
                ].map((t, i) => (
                  <div
                    key={t.icon}
                    className="flex items-center gap-3 text-xs text-[#43474d]"
                  >
                    {i > 0 && (
                      <span className="hidden h-1 w-1 rounded-full bg-[#c3c6ce] sm:block" />
                    )}
                    <span className="flex items-center gap-1.5">
                      <span
                        className="material-symbols-outlined text-[16px] text-[#72D6B2]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {t.icon}
                      </span>
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right: imagery */}
          <section className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-[#f8f3eb] p-8 md:w-[40%]">
            <div className="absolute right-10 top-10 h-24 w-24 rounded-full bg-[#ffdf9e] opacity-50 blur-xl" />
            <div className="absolute bottom-20 left-10 h-32 w-32 rounded-full bg-[#d1e4ff] opacity-60 blur-2xl" />

            <div
              className="absolute right-8 top-1/4 flex animate-pulse items-center gap-2 rounded-xl border border-white/50 bg-white/70 px-4 py-2 text-xs font-medium shadow-sm backdrop-blur-md"
              style={{ animationDuration: "3s" }}
            >
              <span className="h-3 w-3 rounded-full bg-[#72D6B2]" />
              <span className="text-[#1d1c17]">Age 6-8 added</span>
            </div>

            <div className="relative z-10 aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-sm">
              <img
                alt="Lumi the Owl beside a stack of children's books."
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh_8xu2u94hmGhPEaGiyc2BjWV6cTTEgsLbMNbX_tZrDgtgmbmEpR3vWWJuKeVDsO08oUHhzmZIu1RAdUTE0oa5zHjnmDAFq0tVp4mXMwBX5YMubtosaeHmgOdDpm1sWqQ__OaVuIjFas21QmFQLwkhzoU_AUv86BGNdExe5fdb2goPxar7auENyF-35GRciWHT51F7UAyaubVz4j1O2zExcU58GZ-xa_RRIWWBcuZkNFjSt7tKmwEFwRf2Pg6CyxqizccYiYiruIb"
                loading="eager"
              />
            </div>

            <div className="absolute -left-6 bottom-16 z-20 max-w-[200px] rounded-2xl border border-white/50 bg-white/70 p-4 shadow-md backdrop-blur-md md:-left-12">
              <div className="mb-1 text-sm font-semibold text-[#001d36]">
                Hi, I'm Lumi!
              </div>
              <div className="text-[13px] leading-snug text-[#43474d]">
                Let's find your next great adventure.
              </div>
              <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-white/50 bg-white/70" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
