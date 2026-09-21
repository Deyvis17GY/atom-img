# @deyvis17gy/atom-img

> image preloading for slow or large connections

[![NPM](https://img.shields.io/npm/v/@deyvis17gy/atom-img.svg)](https://www.npmjs.com/package/@deyvis17gy/atom-img)

A single `Picture` component that shows a placeholder until the real image has
loaded, and keeps showing something sensible when it never does.

Requires React 18 or 19. No runtime dependencies.

## Install

```bash
pnpm add @deyvis17gy/atom-img
```

```bash
npm install @deyvis17gy/atom-img
```

Live Demo: [Storybook](https://static-picture-storybook.netlify.app/?path=/story/picture--picture-icon)

## Usage

The stylesheet is shipped separately, so import it once wherever your app sets
up its global styles.

```jsx
import { Picture } from '@deyvis17gy/atom-img';
import '@deyvis17gy/atom-img/dist/index.css';

const App = () => (
  <Picture
    className='picture'
    alt='image'
    url='example.png'
    loaderUrl='loaderExample.png'
    isBorderRadius
    isLazy
    onClick={() => console.log('click')}
  />
);
```

### Props

| Prop             | Type         | Default          | Description                                                                     |
| ---------------- | ------------ | ---------------- | ------------------------------------------------------------------------------- |
| `url`            | `string`     | —                | Image to show. Without it, `children` is rendered instead.                      |
| `loaderUrl`      | `string`     | —                | Placeholder shown until the image settles.                                      |
| `alt`            | `string`     | `'atom picture'` | Alt text for the image. The placeholder is decorative and carries an empty alt. |
| `className`      | `string`     | —                | Applied to the wrapping `figure`.                                               |
| `isLazy`         | `boolean`    | `true`           | Sets the image's `loading` attribute.                                           |
| `isBorderRadius` | `boolean`    | `false`          | Rounds the image.                                                               |
| `onClick`        | `() => void` | —                | Called when the figure is clicked.                                              |
| `children`       | `ReactNode`  | —                | Fallback content when there is no `url`.                                        |

Any other prop is forwarded to the underlying `img`. `onLoad` and `onError` are
composed rather than replaced, so passing your own does not stop the component
from settling its own loading state.

### States

A failed image is not presented as a loaded one: it gets the
`a-picture__img--error` class, so you can style that case yourself.

## Development

```bash
pnpm install
pnpm test          # lint, types, unit tests, build
pnpm storybook
```

Releases are automated: merging a conventional commit into `master` publishes to
npm and creates the GitHub release.

## License

MIT © [Deyvis17GY](https://github.com/Deyvis17GY)
