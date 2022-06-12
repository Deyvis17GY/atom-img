import React from 'react'

import { Picture } from '@deyvis17gy/atom-img'
import '@deyvis17gy/atom-img/dist/index.css'
import loader from './assets/img/Spinning.gif'

const App = () => {
  return (
    <main style={{ width: '200px', height: '200px' }}>
      <Picture classPicture="picture" url="https://images5.alphacoders.com/958/thumb-1920-958580.jpg" alt="image" loaderUrl={loader} />
    </main>
  )
}

export default App
