import { HTMLProps, ReactNode } from 'react';

export interface PictureProps extends HTMLProps<HTMLImageElement> {
  url?: string;
  className?: string;
  isLazy?: boolean;
  isBorderRadius?: boolean;
  alt?: string;
  loaderUrl?: string;
  onClick?: () => void;
  children?: ReactNode;
}
