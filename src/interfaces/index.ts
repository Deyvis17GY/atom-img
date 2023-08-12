import { ReactNode } from 'react';

export interface PictureProps {
  url?: string;
  className?: string;
  isLazy?: boolean;
  isBorderRadius?: boolean;
  alt?: string;
  loaderUrl?: string;
  onClick?: () => void;
  children?: ReactNode;
}
