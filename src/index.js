import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Fragment
} from 'react'
import './picture.scss'

export const Picture = ({
  url,
  classPicture,
  isBorderRadius,
  alt,
  loaderUrl,
  clickProfile,
  children
}) => {
  const [loaded, setLoaded] = useState(false)
  const [className, setClassName] = useState('hidden')
  const refImg = useRef()
  const loadImg = useCallback(() => {
    setLoaded(true)
    setClassName('a-picture__img')
  }, [])

  const styleImg = {
    borderRadius: isBorderRadius ? '50%' : ''
  }
  useEffect(() => {
    if (refImg.current && refImg.current.complete) {
      loadImg()
    }
    return () => {
      setLoaded(false)
      setClassName('hidden')
    }
  }, [refImg, loaded, loadImg, className])

  return (
    <>
      <figure className={classPicture} onClick={() => clickProfile?.()}>
        {url ? (
          <img
            style={styleImg}
            ref={refImg}
            onLoad={loadImg}
            loading='lazy'
            className={className}
            src={url}
            alt={alt}
          />
        ) : (
          <article>{children}</article>
        )}
        {!loaded && url && (
          <div className='a-picture__loaded'>
            <img src={loaderUrl} alt={alt} />
          </div>
        )}
      </figure>
    </>
  )
}
