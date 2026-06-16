import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import html from "@/screens/track.html?raw";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track Order — Little Readers" }] }),
  component: () => <Screen html={html} />,
});
