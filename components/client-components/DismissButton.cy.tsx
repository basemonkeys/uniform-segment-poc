import React from "react";

import { DismissButton } from "./DismissButton";

describe("<DismissButton />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DismissButton />);
  });
});
