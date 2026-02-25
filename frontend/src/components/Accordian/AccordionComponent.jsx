import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { accordionData } from "../../Data/accordion";

export default function AccordionComponent() {
  return (
    <div className="w-full max-w-[90%] mx-auto p-4 rounded-lg shadow-md">
      <h2 className="text-5xl font-bold mb-4 p-4">FAQ</h2>

      <Accordion className="space-y-4">
        {accordionData.map(({ key, title, content }) => (
          <AccordionItem
            key={key}
            aria-label={`FAQ ${key}`}
            title={<span className="text-xl font-semibold">{title}</span>}
            className="p-4 rounded-lg shadow-sm text-xl"
          >
            <p className="text-gray-400">{content}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}