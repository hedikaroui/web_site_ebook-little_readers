import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import html from "@/screens/home.html?raw";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — Little Readers" }] }),
  component: () => <Screen html={html} />,
});
