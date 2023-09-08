import type { Preview } from "@storybook/react";

import "../app/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ["Intro", "Design System", "Pages", "Components", ["Uniform"]],
      },
    },
    backgrounds: {
      default: "white",
      values: [
        {
          name: "white",
          value: "#FFFFFF",
        },
        {
          name: "darkGray",
          value: "#6B7280",
        },
      ],
    },
    // backgrounds: { disable: true },
  },
};

export default preview;
