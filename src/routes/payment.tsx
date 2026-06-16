import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import html from "@/screens/payment.html?raw";

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [{ title: "Payment — Little Readers" }] }),
  component: () => <Screen html={html} />,
});
