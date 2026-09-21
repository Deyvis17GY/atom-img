import type { Meta, StoryObj } from '@storybook/react-vite';
import { Picture } from '../Picture';

const meta: Meta<typeof Picture> = {
  title: 'Picture',
  component: Picture,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof Picture>;

export const Icon: Story = {
  args: {
    url: 'https://pbs.twimg.com/profile_images/484240588099702784/QTTQt20q_x96.jpeg',
    loaderUrl: 'https://i.gifer.com/ZZ5H.gif',
    isBorderRadius: true,
    className: 'picture--icon',
    width: 50,
    height: 50,
  },
};

export const Large: Story = {
  args: {
    url: 'https://fondosmil.com/fondo/29845.jpg',
    loaderUrl: 'https://c.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif',
  },
};

export const Broken: Story = {
  args: {
    url: 'https://example.invalid/this-image-does-not-exist.jpg',
    loaderUrl: 'https://i.gifer.com/ZZ5H.gif',
  },
};
