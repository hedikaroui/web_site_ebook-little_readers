import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import html from "@/screens/confirmation.html?raw";

export const Route = createFileRoute("/confirmation")({
  head: () => ({ meta: [{ title: "Order Confirmation — Little Readers" }] }),
  component: () => <Screen html={html} />,
});
