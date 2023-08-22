import type { Meta, StoryObj } from '@storybook/react';

import { SSButton } from '../components/SSButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: SSButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    // backgrounds: {
    //   default: 'brand',
    //   values: [
    //     {
    //       name: 'white',
    //       value: '#fff',
    //     },
    //     {
    //       name: 'brand',
    //       value: '#3375B8',
    //     },
    //   ],
    // },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      table: {
        disable: true,
      }
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'radio'},
    },
    radius: {
      options: ['md', 'full'],
      control: { type: 'radio'},
    },
  },
} satisfies Meta<typeof SSButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Button Text',
    color: 'primary',
    size: 'lg',
    radius: 'md',
  },
};

export const PrimaryWhite: Story = {
  args: {
    children: 'Button Text',
    color: 'primaryWhite',
    size: 'lg',
    radius: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button Text',
    color: 'secondary',
    size: 'lg',
    radius: 'md',
  },
};

export const SecondaryWhite: Story = {
  args: {
    children: 'Button Text',
    color: 'secondaryWhite',
    size: 'lg',
    radius: 'md',
  },
};