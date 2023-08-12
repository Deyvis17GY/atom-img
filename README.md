# @deyvis17gy/atom-img

> image preloading for slow or large connections

[![NPM](https://img.shields.io/npm/v/@deyvis17gy/atom-img.svg)](https://www.npmjs.com/package/@deyvis17gy/atom-img) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @deyvis17gy/atom-img
```

```bash
yarn install @deyvis17gy/atom-img
```

Live Demo: [Storybook](https://static-picture-storybook.netlify.app/?path=/story/picture--picture-icon)

## Usage

```jsx
import React from 'react'

import { Picture } from '@deyvis17gy/atom-img'
import '@deyvis17gy/atom-img/dist/index.css'

const App = () => {
  return (
    <>
      <Picture
        className='picture'
        alt='image'
        url='example.png'
        loaderUrl='loaderExample.png'
        isBorderRadius={true}
        isLazy={true}
        onClick={() => console.log('click)}
      />
    </>
  )
}
```

## License

MIT © [Deyvis17GY](https://github.com/Deyvis17GY)
