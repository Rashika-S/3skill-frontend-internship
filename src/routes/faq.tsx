import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data/misc";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — EventNest" },
      { name: "description", content: "Answers to the most common questions about booking, cancellations, refunds and hosting events on EventNest." },
      { property: "og:title", content: "FAQ — EventNest" },
      { property: "og:description", content: "Everything you need to know." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 md:px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">Support</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold">Frequently asked <span className="gradient-text">questions</span></h1>
      <div className="mt-10 glass rounded-3xl p-4 md:p-6">
        <Accordion type="single" collapsible>
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={"f" + i} className="border-white/10">
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-white/70">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  ),
});
