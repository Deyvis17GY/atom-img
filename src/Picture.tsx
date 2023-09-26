import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PictureProps } from './interfaces/index';
import './picture.scss';

export const Picture = ({
  url,
  className,
  loaderUrl,
  onClick,
  children,
  isLazy = true,
  isBorderRadius = false,
  alt = 'atom picture',
  ...props
}: PictureProps) => {
  const [loaded, setLoaded] = useState(false);
  const [classState, setClassState] = useState('hidden');
  const refImg = useRef<HTMLImageElement | null>(null);
  const loadImg = useCallback(() => {
    setLoaded(true);
    setClassState(
      `a-picture__img ${!props?.width ? 'a-picture__img--size' : ''}`
    );
  }, [props]);

  const styleImg = {
    borderRadius: isBorderRadius ? '50%' : '',
  };
  useEffect(() => {
    if (refImg?.current && refImg?.current?.complete) {
      loadImg();
    }
    return () => {
      setLoaded(false);
      setClassState('hidden');
    };
  }, [refImg, loaded, loadImg, classState]);

  return (
    <figure className={className} onClick={() => onClick?.()}>
      {url ? (
        <img
          style={styleImg}
          ref={refImg}
          onLoad={loadImg}
          loading={isLazy ? 'lazy' : 'eager'}
          className={classState}
          src={url}
          alt={alt}
          {...props}
        />
      ) : (
        <article className='a-picture__icon'>{children}</article>
      )}
      {!loaded && url && (
        <div className='a-picture__loaded'>
          <img className='a-picture__loaded--img' src={loaderUrl} alt={alt} />
        </div>
      )}
    </figure>
  );
};
