import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Picture } from '../Picture';
import { PictureProps } from '../interfaces/index';

export default {
  title: 'Picture',
  component: Picture,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template: ComponentStory<typeof Picture> = (
  args: JSX.IntrinsicAttributes & PictureProps
) => <Picture {...args} />;

export const PictureIcon = Template.bind({});
PictureIcon.args = {
  url: 'https://pbs.twimg.com/profile_images/484240588099702784/QTTQt20q_x96.jpeg',
  loaderUrl: 'https://i.gifer.com/ZZ5H.gif',
  isBorderRadius: true,
  className: 'picture--icon',
  width: 50,
  height: 50,
};

export const PictureLarge = Template.bind({});
PictureLarge.args = {
  url: 'https://fondosmil.com/fondo/29845.jpg',
  loaderUrl: 'https://c.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif',
};
