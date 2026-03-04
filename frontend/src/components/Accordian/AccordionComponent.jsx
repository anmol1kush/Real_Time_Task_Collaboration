import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { accordionData } from "../../Data/accordion";

export default function AccordionComponent() {
  return (
    <div className="w-full max-w-[90%] mx-auto p-4 font-mono">
      <h2 className="text-5xl font-bold mb-8 text-white">FAQ</h2>

      <Accordion
        className="divide-y divide-zinc-800"
        itemClasses={{
          base: "py-2",
          title: "text-white text-base font-mono font-medium",
          trigger: "py-5 px-0 data-[hover=true]:bg-transparent",
          indicator: "text-zinc-500",
          content: "text-gray-400 pb-4 font-mono text-sm",
        }}
        variant="light"
      >
        {accordionData.map(({ key, title, content }) => (
          <AccordionItem
            key={key}
            aria-label={`FAQ ${key}`}
            title={title}
          >
            {content}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}