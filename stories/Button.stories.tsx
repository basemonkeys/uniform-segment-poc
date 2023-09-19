import type { Meta, StoryObj } from "@storybook/react";

import { SSButton } from "../components/custom/SSButton";

const meta: Meta<typeof SSButton> = {
  title: "Components/Buttons",
  component: SSButton,
  parameters: {
    controls: { include: ["children", "color", "size", "radius"] },
  },
  tags: ["autodocs"],
  args: {
    color: "primary",
    children: "Primary",
    size: "lg",
    radius: "md",
  },
  argTypes: {
    color: {
      options: ["primary", "primaryWhite", "success", "warning", "error"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    radius: {
      control: { type: "select" },
      options: ["md", "full"],
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    color: "secondary",
  },
  argTypes: {
    color: {
      options: ["secondary", "secondaryWhite"],
    },
  },
  parameters: {
    backgrounds: {
      default: "darkGray",
    },
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    isDisabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading",
    isLoading: true,
  },
};
