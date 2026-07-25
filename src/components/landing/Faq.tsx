import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/ridecheck";

export function Faq() {
  return (
    <section className="border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="label-caps text-signal">FAQ</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Straight answers</h2>

        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
