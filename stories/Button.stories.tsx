import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof Button> = {
  title: "Components/Buttons",
  component: Button,
  parameters: {
    controls: { include: ["children", "size", "radius"] },
  },
  tags: ["autodocs"],
  args: {
    variant: "primary",
    children: "Primary",
    size: "lg",
    radius: "md",
  },
  argTypes: {
    variant: {
      options: ["primary", "primaryWhite", "success", "warning", "danger"],
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
      <div style={{ padding: "12px" }}>
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
    variant: "secondary",
  },
  argTypes: {
    variant: {
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
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: (
      <>
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="mr-2 h-4 w-4 animate-spin"
        />
        Loading
      </>
    ),
    disabled: true,
  },
  parameters: {
    controls: { include: ["size", "radius"] },
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger",
    variant: "danger",
  },
};
