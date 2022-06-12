import React, { useState } from 'react'

import { Picture } from '@deyvis17gy/atom-img'
import '@deyvis17gy/atom-img/dist/index.css'
import loader from './assets/img/Spinning.gif'
import './picture.scss'

const App = () => {
  const [valuesProps, setValuesProps] = useState({
    url: 'https://images5.alphacoders.com/958/thumb-1920-958580.jpg',
    isBorderRadius: false,
    alt: 'image test',
    classPicture: '',
    loaderUrl: '',
  })
  const changeValues = (e) => {
    const { name, value } = e.target
    setValuesProps({ ...valuesProps, [name]: value })
  }

  const changeCheckbox = (e) => {
    const { name, checked } = e.target
    setValuesProps({ ...valuesProps, [name]: checked })
  }
  return (
    <main className='container'>
      <Picture classPicture="picture" url={valuesProps.url} alt={valuesProps.alt} loaderUrl={valuesProps.loaderUrl || loader} isBorderRadius={valuesProps.isBorderRadius} />
      <form className='container__form'>
        <section className='container__group'>
          <label htmlFor="preLoader" className='container__label'>Preloader</label>
          <input className='container__input' type="text" id="preLoader" placeholder='https://c.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif' name='preloader' onChange={(e) => changeValues(e)} />
        </section>
        <section className='container__group'>
          <label htmlFor="url" className='container__label'>Url</label>
          <input className='container__input' type="text" id="url" placeholder='https://images5.alphacoders.com/958/thumb-1920-958580.jpg' name="url" onChange={(e) => changeValues(e)} />
        </section>
        <section className='container__group'>
          <label htmlFor="borderRadius" className='container__label'>Border Radius</label>
          <input className='container__checkbox' type="checkbox" id="borderRadius" name="isBorderRadius" onChange={(e) => changeCheckbox(e)} />
        </section>
      </form>
    </main>
  )
}

export default App
