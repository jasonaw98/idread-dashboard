import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "Is this accessible?",
    answer:
      "Yes. Just click on the Whatsapp button and start your conversation via Whatsapp.",
  },
  {
    question: "Does this support Multiple languages?",
    answer: "Yes it currently supports the main four languages in Malaysia. Which are Malay, Tamil, Mandarin and English.",
  },
  {
    question: "Can I book or make an appointment through AIDA?",
    answer:
      "Not at the moment. But we do plan to integrate this in the near future and it's already in development.",
  },
  {
    question:
      "Am I able to reach out to a government official or representative through AIDA?",
    answer:
      "Not at the moment. We are still in a stage where we want to focus on digitization.",
  },
];

const Faq = () => {
  return (
    <div className="flex flex-col w-full items-center px-6 md:p-24">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-bold py-4 max-w-5xl">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="text-white w-full max-w-5xl mt-16 md:mt-32">
        <span className="bg-white w-full h-px flex" />
        <Accordion type="single" collapsible className="space-y-4">
          {faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="md:text-lg font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="md:text-lg font-semibold text-neutral-300 text-start">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
