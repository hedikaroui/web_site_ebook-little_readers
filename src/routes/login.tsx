import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In — Little Readers" },
      { name: "description", content: "Log in to your Little Readers account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetSent, setResetSent] = useState(false);

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Log in to pick up where you left off."
      side={
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold text-[#001d36]">
            New here?
          </div>
          <Link
            to="/signup"
            preload="intent"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0055c7] underline-offset-4 hover:underline"
          >
            Create an account →
          </Link>
        </div>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/parent-space" });
        }}
        className="flex flex-col gap-4"
      >
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          required
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          required
        />
        <div className="flex justify-end">
          {resetSent ? (
            <span className="text-xs font-medium text-[#72D6B2]">✓ Reset link sent — check your email</span>
          ) : (
            <button
              type="button"
              onClick={() => setResetSent(true)}
              className="text-xs font-medium text-[#0055c7] underline-offset-4 hover:underline"
            >
              Forgot password?
            </button>
          )}
        </div>
        <button
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0055c7] px-6 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-[#004bb0] active:scale-[0.98]"
        >
          Log In
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        </button>
        <Link
          to="/catalogue"
          preload="intent"
          className="mt-1 text-center text-sm font-medium text-[#74777e] underline-offset-4 hover:text-[#001d36] hover:underline"
        >
          Browse as Guest
        </Link>
      </form>
    </AuthShell>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
  side,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  side: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fef9f1] font-['Inter',sans-serif] text-[#1d1c17]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-[#afc9ea]/30 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[5%] h-[50%] w-[50%] rounded-full bg-[#f4bf40]/20 blur-3xl" />
      </div>

      <main className="mx-auto flex min-h-screen max-w-[1100px] items-center justify-center p-4 md:p-12">
        <div className="flex w-full min-h-[560px] flex-col overflow-hidden rounded-3xl border border-[#e6e2da] bg-white shadow-sm md:flex-row">
          <section className="flex w-full flex-col justify-center p-8 md:w-[60%] md:p-14">
            <Link
              to="/"
              preload="intent"
              className="mb-10 flex items-center gap-3"
            >
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
            </Link>

            <div className="max-w-sm">
              <h1 className="mb-3 font-['Fredoka',sans-serif] text-3xl font-bold leading-tight text-[#001d36] md:text-4xl">
                {title}
              </h1>
              <p className="mb-8 text-base text-[#43474d]">{subtitle}</p>
              {children}
            </div>
          </section>

          <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#f8f3eb] p-8 md:w-[40%]">
            <div className="absolute right-10 top-10 h-24 w-24 rounded-full bg-[#ffdf9e] opacity-50 blur-xl" />
            <div className="absolute bottom-16 left-10 h-32 w-32 rounded-full bg-[#d1e4ff] opacity-60 blur-2xl" />
            <div className="relative z-10 aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-sm">
              <img
                alt="Lumi the Owl."
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh_8xu2u94hmGhPEaGiyc2BjWV6cTTEgsLbMNbX_tZrDgtgmbmEpR3vWWJuKeVDsO08oUHhzmZIu1RAdUTE0oa5zHjnmDAFq0tVp4mXMwBX5YMubtosaeHmgOdDpm1sWqQ__OaVuIjFas21QmFQLwkhzoU_AUv86BGNdExe5fdb2goPxar7auENyF-35GRciWHT51F7UAyaubVz4j1O2zExcU58GZ-xa_RRIWWBcuZkNFjSt7tKmwEFwRf2Pg6CyxqizccYiYiruIb"
                loading="eager"
              />
            </div>
            <div className="relative z-10 mt-6">{side}</div>
          </section>
        </div>
      </main>
    </div>
  );
}

export function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-[#43474d]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-[#c3c6ce] bg-white px-4 py-3 text-base text-[#1d1c17] outline-none transition-colors placeholder:text-[#74777e] focus:border-[#0055c7] focus:ring-2 focus:ring-[#0055c7]/30"
      />
    </label>
  );
}
