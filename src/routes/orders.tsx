import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import html from "@/screens/orders.html?raw";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "My Orders — Little Readers" }] }),
  component: () => <Screen html={html} />,
});
