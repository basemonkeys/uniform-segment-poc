import type { Meta, StoryObj } from '@storybook/react'
// import { UniformComposition } from '@uniformdev/canvas-next-rsc';
// import { createFakeCompositionData } from '../utils';

import Hero, { HeroProps } from '../../components/canvas/Hero'

const meta = {
    title: 'Hero',
    component: Hero,
    // parameters: {},
    tags: ['autodocs'],
    argTypes: {} 
} satisfies Meta<typeof Hero>

//   const renderStory = (args: HeroProps) => {
//     const fakeComposition = createFakeCompositionData('hero', args, {});
//     return (
//       <UniformComposition data={fakeComposition}>
//         <Hero {...args} />
//       </UniformComposition>
//     );
//   };

const BASE_PROPS: Omit<HeroProps, 'component' | 'context'> = {
    image: {
        src: 'images.ctfassets.net/td2wy1ruze5q/2Wnlu249GGyPJWs1P08S3j/61993c470bcff7e7d05ffd6066e42738/homepage-live-classes.png',
        alt: 'Alt Text'
    },
    heading: 'LIVE online classes and workshops',
    description: 'Get moving with thousands of other members from the comfort of your own home with our LIVE online classes and workshops.',
    primarycta: 'Learn More',
    secondarycta: 'Check Elegibility',
  };

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: BASE_PROPS,
  // args: {
  //   heading: 'LIVE online classes and workshops',
  //   description: 'Get moving with thousands of other members from the comfort of your own home with our LIVE online classes and workshops.',
  //   primarycta: 'Learn More',
  //   secondarycta: 'Check Elegibility',
  // }
};

