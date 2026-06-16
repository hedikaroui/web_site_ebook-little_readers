import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — Little Readers" },
      {
        name: "description",
        content: "Create your Little Readers account to start exploring.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthShell
      title="Create your account."
      subtitle="Join Little Readers and find the right book for every learner."
      side={
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold text-[#001d36]">
            Already with us?
          </div>
          <Link
            to="/login"
            preload="intent"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0055c7] underline-offset-4 hover:underline"
          >
            Log in instead →
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
          label="Name"
          type="text"
          value={name}
          onChange={setName}
          placeholder="Alex Parent"
          required
        />
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
          placeholder="At least 8 characters"
          required
        />
        <button
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0055c7] px-6 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-[#004bb0] active:scale-[0.98]"
        >
          Create Account
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        </button>
        <p className="mt-1 text-center text-xs text-[#74777e]">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthShell>
  );
}
