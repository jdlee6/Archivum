import React, { useState, useContext, useCallback, useEffect } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from 'react-photo-gallery';
import { CircularProgress } from '@material-ui/core';
import { styles } from './ImageGallery';
import BackToTop from './BackToTop';
import ImageHeader from './ImageHeader';
import { debounce } from '../utils';
import { ModalContext } from '../contexts/ModalContext';

export default function ImageModal(props) {
  const { handleViewChange, index, lookbook, season, brand, history } = props;
  const [currentImage, setCurrentImage] = useState(index);
  const [viewerIsOpen, setViewerIsOpen] = useState(true);
  const { modalToggle, setModalToggle } = useContext(ModalContext);
  const [images, setImages] = useState(lookbook.pictures.slice(0, 6));
  const [pageNum, setPageNum] = useState(1);
  const [loadedAll, setLoadedAll] = useState(false);
  const TOTAL_PAGES = 3;
  const classes = styles();

  const openLightbox = useCallback(
    (event, { photo, index }) => {
      const newPath =
        '/' + props.brand + '/' + props.season + '/' + index.toString();
      setCurrentImage(index);
      setViewerIsOpen(true);
      setModalToggle(!modalToggle);
      window.history.pushState('object or string', 'title', newPath);
    },
    [modalToggle, setModalToggle, props.brand, props.season]
  );
  // on close should bring back to lookbook page
  const closeLightbox = () => {
    setViewerIsOpen(false);
    setModalToggle(!modalToggle);
    history.push('/' + brand + '/' + season);
  };

  const columns = containerWidth => {
    let columns = 1;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    return columns;
  };

  // lazy loading
  const loadMorePhotos = debounce(() => {
    if (pageNum > TOTAL_PAGES) {
      setLoadedAll(true);
      return;
    }
    setImages(
      images.concat(
        props.lookbook.pictures.slice(images.length, images.length + 6)
      )
    );
    setPageNum(pageNum + 1);
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    let scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
      loadMorePhotos();
    }
  };

  return (
    <div>
      <Gallery
        photos={images}
        onClick={openLightbox}
        direction={'column'}
        columns={columns}
      />
      {!loadedAll && (
        <div className="loading-msg" id="msg-loading-more">
          <CircularProgress
            disableShrink
            className={classes.bottom}
            size={15}
            thickness={4}
          />
        </div>
      )}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal
            allowFullScreen={false}
            closeOnBackdropClick={true}
            styles={{
              blanket: base => ({
                ...base,
                backgroundColor: 'rgba(0,0,0,0.9)'
              })
            }}
            onClose={closeLightbox}
          >
            <Carousel
              frameProps={{ autoSize: 'height' }}
              components={{ Header: ImageHeader }}
              trackProps={{
                onViewChange: handleViewChange
              }}
              currentIndex={currentImage}
              views={lookbook.pictures.map(x => ({
                ...x,
                srcset: x.src
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      <BackToTop />
    </div>
  );
}
