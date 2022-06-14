import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Fragment
} from 'react'
import PropTypes from 'prop-types'
import './picture.scss'

export const Picture = ({
  url,
  classPicture,
  isBorderRadius,
  alt,
  loaderUrl,
  onClickProfile,
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
      <figure className={classPicture} onClick={() => onClickProfile?.()}>
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
          <article className='a-picture__icon'>{children}</article>
        )}
        {!loaded && url && (
          <div className='a-picture__loaded'>
            <img className='a-picture__loaded--img' src={loaderUrl} alt={alt} />
          </div>
        )}
      </figure>
    </>
  )
}

Picture.propTypes = {
  url: PropTypes.string,
  classPicture: PropTypes.string,
  isBorderRadius: PropTypes.bool,
  alt: PropTypes.string,
  loaderUrl: PropTypes.string,
  onClickProfile: PropTypes.func
}

Picture.defaultProps = {
  isBorderRadius: false,
  alt: 'image test'
}
