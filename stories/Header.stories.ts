import type { Meta, StoryObj } from "@storybook/react";
import Header from "../components/canvas/navigation/Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    user: {
      name: "User Name",
    },
  },
  argTypes: {
    user: {
      description: "User object",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
