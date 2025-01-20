import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "Comment les coûts sont-ils calculés ?",
      answer: "Les coûts sont basés sur des données en temps réel collectées auprès de diverses sources fiables, incluant les prix moyens des logements, de la nourriture, des transports et des services essentiels."
    },
    {
      question: "À quelle fréquence les données sont-elles mises à jour ?",
      answer: "Les données sont mises à jour mensuellement pour assurer la précision des comparaisons."
    },
    {
      question: "Comment puis-je contribuer aux données ?",
      answer: "Vous pouvez contribuer en partageant vos propres expériences et données via notre formulaire de contribution."
    },
    {
      question: "Les prix incluent-ils les taxes ?",
      answer: "Oui, tous les prix affichés incluent les taxes locales applicables."
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQ;