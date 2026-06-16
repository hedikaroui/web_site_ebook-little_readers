import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/children")({
  beforeLoad: () => {
    throw redirect({ to: "/parent-space", replace: true });
  },
  component: () => null,
});
