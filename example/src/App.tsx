import React, { ChangeEvent, useState } from 'react';

import { Picture } from '@deyvis17gy/atom-img';
import '@deyvis17gy/atom-img/dist/index.css';
import loader from './assets/img/Spinning.gif';
import './picture.scss';

const App = () => {
  const defaultUrl = 'https://picsum.photos/600/400';
  const [valuesProps, setValuesProps] = useState({
    url: 'https://fondosmil.com/fondo/29845.jpg',
    isBorderRadius: false,
    alt: 'image test',
    classPicture: '',
    loaderUrl:
      'https://pa1.narvii.com/6609/503da208215e257aa228c672c027844d28fea4b7_hq.gif',
  });
  const changeValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValuesProps({ ...valuesProps, [name]: value });
  };

  const changeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValuesProps({ ...valuesProps, [name]: checked });
  };

  console.debug('valuesProps', valuesProps);
  return (
    <main className='container'>
      <Picture
        className='picture'
        url={valuesProps.url || defaultUrl}
        alt={valuesProps.alt}
        loaderUrl={valuesProps.loaderUrl || loader}
        isBorderRadius={valuesProps.isBorderRadius}
        onClick={() => console.log('click')}
        width={40}
        height={370}
      />
      <form className='container__form'>
        <section className='container__group'>
          <label htmlFor='loaderUrl' className='container__label'>
            Loader Url
          </label>
          <input
            className='container__input'
            type='text'
            id='loaderUrl'
            placeholder='https://c.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif'
            name='loaderUrl'
            defaultValue='https://pa1.narvii.com/6609/503da208215e257aa228c672c027844d28fea4b7_hq.gif'
            onChange={(e) => changeValues(e)}
          />
        </section>
        <section className='container__group'>
          <label htmlFor='url' className='container__label'>
            Url
          </label>
          <input
            className='container__input'
            type='text'
            id='url'
            placeholder='https://images5.alphacoders.com/958/thumb-1920-958580.jpg'
            name='url'
            onChange={(e) => changeValues(e)}
          />
        </section>
        <section className='container__group'>
          <label htmlFor='borderRadius' className='container__label'>
            Border Radius
          </label>
          <input
            className='container__checkbox'
            type='checkbox'
            id='borderRadius'
            name='isBorderRadius'
            onChange={(e) => changeCheckbox(e)}
          />
        </section>
      </form>
    </main>
  );
};

export default App;
