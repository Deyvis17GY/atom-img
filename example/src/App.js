import React from 'react'

import { Picture } from '@deyvis/atom-img'
import '@deyvis/atom-img/dist/index.css'

const App = () => {
  return (
    <main style={{ width: '200px', height: '200px' }}>
      <Picture classPicture="picture" alt="image" url="https://images5.alphacoders.com/958/thumb-1920-958580.jpg" />
    </main>
  )
}

export default App
