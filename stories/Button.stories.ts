import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
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
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    type: 'info',
    label: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    primary: true,
    type: 'info',
    label: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    primary: true,
    label: 'Small Button',
  },
};

export const Warning: Story = {
  args: {
    primary: true,
    type: 'warning',
    label: 'Delete Now',
  }
}
