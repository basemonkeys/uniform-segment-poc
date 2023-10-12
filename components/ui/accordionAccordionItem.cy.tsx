import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

describe("<AccordionItem />", () => {
  it("renders", () => {
    cy.mount(
      <Accordion type="multiple">
        <AccordionItem value="item 1">Item 1</AccordionItem>
      </Accordion>,
    );
  });
  // accordion opens when clicked
  it("opens when clicked", () => {
    cy.mount(
      <Accordion type="single" className="w-full">
        <AccordionItem value="item 1">
          <AccordionTrigger className="z-10 flex justify-between text-base font-normal text-link">
            Item #1
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
            egestas pretium aenean pharetra. Orci eu lobortis elementum nibh
            tellus molestie. Vulputate dignissim suspendisse in est. Vel
            pharetra vel turpis nunc. Malesuada nunc vel risus commodo. Nisi
            vitae suscipit tellus mauris. Posuere morbi leo urna molestie at
            elementum eu. Urna duis convallis convallis tellus. Urna molestie at
            elementum eu. Nunc sed blandit libero volutpat.
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    cy.get("button").click();
    cy.get("button").should("have.attr", "aria-expanded", "true");
  });
});
