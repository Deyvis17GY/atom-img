import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { PictureProps } from './interfaces/index';

// The stylesheet ships as dist/index.css, compiled by the `build:css` script and
// imported by consumers on their own, so it is not pulled into the JS bundle.

export const Picture = ({
  url,
  className,
  loaderUrl,
  onClick,
  children,
  isLazy = true,
  isBorderRadius = false,
  alt = 'atom picture',
  onLoad,
  onError,
  ...props
}: PictureProps) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading'
  );
  const refImg = useRef<HTMLImageElement | null>(null);
  const loaded = status !== 'loading';

  // `onLoad`/`onError` are part of the public prop type, and `{...props}` is spread
  // onto the image, so a consumer's handler would otherwise replace these and the
  // loader would never settle. Compose instead of overwrite.
  const handleLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setStatus('loaded');
      onLoad?.(event);
    },
    [onLoad]
  );

  // A broken image never fires `onLoad`, so without this the loader spins forever.
  // Tracked apart from success so a failure is not presented as a loaded image.
  const handleError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setStatus('error');
      onError?.(event);
    },
    [onError]
  );

  const styleImg = {
    borderRadius: isBorderRadius ? '50%' : '',
  };

  // A cached image can already be complete before React attaches `onLoad`, so the
  // first paint has to ask the element directly. `complete` alone is not enough:
  // right after `src` changes it can still describe the previous image, so it only
  // counts once the element has actually settled on this source. The previous
  // version cleared the state from an effect cleanup, which runs on every
  // dependency change and kept undoing the load it had just registered.
  useEffect(() => {
    const image = refImg.current;

    const isAlreadyComplete = Boolean(
      image?.complete && image.currentSrc === image.src
    );

    setStatus(isAlreadyComplete ? 'loaded' : 'loading');
  }, [url]);

  const classState = loaded
    ? [
        'a-picture__img',
        props?.width ? '' : 'a-picture__img--size',
        status === 'error' ? 'a-picture__img--error' : '',
      ]
        .filter(Boolean)
        .join(' ')
    : 'hidden';

  return (
    <figure className={className} onClick={() => onClick?.()}>
      {url ? (
        <img
          style={styleImg}
          ref={refImg}
          onLoad={handleLoad}
          onError={handleError}
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
          {/* Decorative placeholder: repeating `alt` here made screen readers
              announce the same image twice. */}
          <img className='a-picture__loaded--img' src={loaderUrl} alt='' />
        </div>
      )}
    </figure>
  );
};
