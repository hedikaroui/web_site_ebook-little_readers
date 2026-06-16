import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import html from "@/screens/delivery.html?raw";

export const Route = createFileRoute("/delivery")({
  head: () => ({ meta: [{ title: "Delivery — Little Readers" }] }),
  component: () => <Screen html={html} />,
});
