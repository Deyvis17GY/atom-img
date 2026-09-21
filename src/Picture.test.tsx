import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Picture } from './Picture';

const IMAGE_URL = 'https://example.com/cover.jpg';
const LOADER_URL = 'https://example.com/spinner.gif';

const getImage = () => screen.getByAltText('cover');
const getLoader = () => document.querySelector('.a-picture__loaded');

describe('Picture', () => {
  it('shows the loader until the image reports it finished', () => {
    render(<Picture url={IMAGE_URL} loaderUrl={LOADER_URL} alt='cover' />);

    expect(getLoader()).not.toBeNull();
    expect(getImage()).toHaveClass('hidden');

    fireEvent.load(getImage());

    expect(getLoader()).toBeNull();
    expect(getImage()).toHaveClass('a-picture__img');
  });

  it('stops the loader on a broken image instead of spinning forever', () => {
    render(<Picture url={IMAGE_URL} loaderUrl={LOADER_URL} alt='cover' />);

    fireEvent.error(getImage());

    expect(getLoader()).toBeNull();
  });

  it('marks a failed image so it is not presented as a loaded one', () => {
    render(<Picture url={IMAGE_URL} loaderUrl={LOADER_URL} alt='cover' />);

    fireEvent.error(getImage());

    expect(getImage()).toHaveClass('a-picture__img--error');
  });

  it("keeps calling the consumer's own onLoad", () => {
    const onLoad = vi.fn();
    render(<Picture url={IMAGE_URL} alt='cover' onLoad={onLoad} />);

    fireEvent.load(getImage());

    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(getImage()).toHaveClass('a-picture__img');
  });

  it("keeps calling the consumer's own onError", () => {
    const onError = vi.fn();
    render(<Picture url={IMAGE_URL} alt='cover' onError={onError} />);

    fireEvent.error(getImage());

    expect(onError).toHaveBeenCalledTimes(1);
    expect(getLoader()).toBeNull();
  });

  it('goes back to the loader when the source changes', () => {
    const { rerender } = render(
      <Picture url={IMAGE_URL} loaderUrl={LOADER_URL} alt='cover' />
    );
    fireEvent.load(getImage());
    expect(getLoader()).toBeNull();

    rerender(
      <Picture
        url='https://example.com/another.jpg'
        loaderUrl={LOADER_URL}
        alt='cover'
      />
    );

    expect(getLoader()).not.toBeNull();
  });

  it('adds the size class only when no explicit width is given', () => {
    const { rerender } = render(<Picture url={IMAGE_URL} alt='cover' />);
    fireEvent.load(getImage());
    expect(getImage()).toHaveClass('a-picture__img--size');

    rerender(<Picture url={IMAGE_URL} alt='cover' width={120} />);
    fireEvent.load(getImage());
    expect(getImage()).not.toHaveClass('a-picture__img--size');
  });

  it('skips the loader when the image was already cached', () => {
    // jsdom never decodes images, so `complete` stays false on its own. Stubbing it
    // is the only way to exercise the cache-hit path, which is the branch the
    // loading-state fix exists for and the one most likely to regress.
    const cachedUrl = 'https://example.com/cached.jpg';
    vi.spyOn(
      window.HTMLImageElement.prototype,
      'complete',
      'get'
    ).mockReturnValue(true);
    vi.spyOn(
      window.HTMLImageElement.prototype,
      'currentSrc',
      'get'
    ).mockReturnValue(cachedUrl);

    render(<Picture url={cachedUrl} loaderUrl={LOADER_URL} alt='cover' />);

    expect(getLoader()).toBeNull();
    expect(getImage()).toHaveClass('a-picture__img');

    vi.restoreAllMocks();
  });

  it('still shows the loader when the element settled on another source', () => {
    // `complete` can still describe the previous image right after `src` changes,
    // so it only counts once the element has actually settled on this one.
    vi.spyOn(
      window.HTMLImageElement.prototype,
      'complete',
      'get'
    ).mockReturnValue(true);
    vi.spyOn(
      window.HTMLImageElement.prototype,
      'currentSrc',
      'get'
    ).mockReturnValue('https://example.com/the-previous-one.jpg');

    render(<Picture url={IMAGE_URL} loaderUrl={LOADER_URL} alt='cover' />);

    expect(getLoader()).not.toBeNull();

    vi.restoreAllMocks();
  });

  it('renders the fallback children when there is no url', () => {
    render(<Picture alt='cover'>
      <span>no image</span>
    </Picture>);

    expect(screen.getByText('no image')).toBeInTheDocument();
    expect(screen.queryByAltText('cover')).toBeNull();
  });

  it('forwards the click to the consumer', () => {
    const onClick = vi.fn();
    render(<Picture url={IMAGE_URL} alt='cover' onClick={onClick} />);

    fireEvent.click(getImage());

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
