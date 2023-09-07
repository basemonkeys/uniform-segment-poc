import type { Meta, StoryObj } from "@storybook/react";

import Banner, { BannerVariant } from "../../components/canvas/Banner";

const meta: Meta<typeof Banner> = {
  title: "Components/Uniform/Banners",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: [
        "message",
        "callToAction",
        "callToActionLink",
        "variant",
        "dismissable",
      ],
    },
  },
  args: {
    message: "This is a Default banner",
    callToAction: "Click here",
    callToActionLink: {
      path: "/",
    },
    dismissable: false,
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    component: {
      type: "banner",
      variant: "",
    },
  },
};

export const Primary: Story = {
  args: {
    component: {
      type: "banner",
      variant: BannerVariant.Primary,
    },
    message: "This is a Primary banner",
  },
};

export const Success: Story = {
  args: {
    component: {
      type: "banner",
      variant: BannerVariant.Success,
    },
    message: "This is a Success banner",
  },
};

export const Error: Story = {
  args: {
    component: {
      type: "banner",
      variant: BannerVariant.Error,
    },
    message: "This is a Error banner",
  },
};

export const Warning: Story = {
  args: {
    component: {
      type: "banner",
      variant: BannerVariant.Warning,
    },
    message: "This is a Warning banner",
  },
};

export const Info: Story = {
  args: {
    component: {
      type: "banner",
      variant: BannerVariant.Info,
    },
    message: "This is a Info banner",
  },
};
