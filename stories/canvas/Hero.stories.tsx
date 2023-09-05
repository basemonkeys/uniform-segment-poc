import type { Meta, StoryObj } from "@storybook/react";

import Hero, { HeroVariant } from "../../components/canvas/Hero";

const meta: Meta<typeof Hero> = {
  title: "Components/Uniform/Heros",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: ["heading", "primarycta", "secondarycta"],
    },
  },
  args: {
    component: {
      type: "hero",
      variant: HeroVariant.LeftDark,
    },
    image:
      "https://images.ctfassets.net/td2wy1ruze5q/2Wnlu249GGyPJWs1P08S3j/61993c470bcff7e7d05ffd6066e42738/homepage-live-classes.png" as any,
    heading: "LIVE online classes and workshops",
    description: {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value:
                "Get moving with thousands of other members from the comfort of your own home with our LIVE online classes and workshops.",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
    primarycta: "Learn More",
    secondarycta: "Check Elegibility",
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

/**
 * Image aligned to the left with a dark background. This is the default Hero.
 */
export const LeftDark: Story = {};

/**
 * Image aligned to the right with a dark background.
 */
export const RightDark: Story = {
  args: {
    component: {
      type: "hero",
      variant: HeroVariant.RightDark,
    },
  },
};

/**
 * Image aligned to the left with a light background.
 */
export const LeftLight: Story = {
  args: {
    component: {
      type: "hero",
      variant: HeroVariant.LeftLight,
    },
  },
};

/**
 * Image aligned to the right with a light background.
 */
export const RightLight: Story = {
  args: {
    component: {
      type: "hero",
      variant: HeroVariant.RightLight,
    },
  },
};

/**
 * The Featured Hero has a background image.
 */
export const Featured: Story = {
  args: {
    component: {
      type: "hero",
      variant: HeroVariant.BackgroundImage,
    },
    image:
      "https://tools.silversneakers.com/Content/images/live/headphones-exercise-ball-2000.jpg" as any,
    heading: "Take online classes from home or visit us at the gym",
    description: {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value:
                "With SilverSneakers, you're free to move. Available at no cost for adults 65+ through select Medicare plans.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value:
                "These online classes are designed for nearly every interest and skill level. So whether you’re an elite athlete or new to fitness Burnalong has you covered.",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
    primarycta: "Check My Eligibility",
    secondarycta: "",
  },
};

/**
 * The Partner Hero is a feautured hero with a featured logo.
 */
export const Partner: Story = {
  args: {
    component: {
      type: "hero",
      variant: HeroVariant.BackgroundImage,
    },
    logo: "https://tools.silversneakers.com/Content/images/burnalong/wordmark.png" as any,
    image:
      "https://tools.silversneakers.com/Content/images/burnalong/hero.jpg" as any,
    heading: "Online fitness classes and so much more",
    description: {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value:
                "SilverSneakers has teamed up with Burnalong to give you access to this incredible online fitness platform. Burnalong puts thousands of online fitness classes at your fingertips at no additional cost to you.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph",
          data: {},
          content: [
            {
              nodeType: "text",
              value:
                "These online classes are designed for nearly every interest and skill level. So whether you’re an elite athlete or new to fitness Burnalong has you covered.",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
    primarycta: "Log In",
    secondarycta: "Check Elegibility",
  },
};
