import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import html from "@/screens/dashboard.html?raw";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Parent Dashboard — Little Readers" }] }),
  component: () => <Screen html={html} />,
});
