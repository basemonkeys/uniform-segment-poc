import React from "react";
import { Accordion, AccordionItem } from "./accordion";

describe("<AccordionItem />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Accordion>
        <AccordionItem value="item 1">Item 1</AccordionItem>
      </Accordion>,
    );
  });
});
