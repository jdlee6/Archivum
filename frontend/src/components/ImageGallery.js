import React, { useState, useCallback, useEffect, useContext } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { debounce } from '../utils';
import { ModalContext } from '../contexts/ModalContext';
import BackToTop from './BackToTop';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles({
  bottom: {
    color: '#b8caff',
    animationDuration: '550ms',
    marginTop: '10px'
  }
});

export default function ImageGallery(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const { modalToggle, setModalToggle } = useContext(ModalContext);
  const [images, setImages] = useState(props.lookbook.pictures.slice(0, 6));
  const [pageNum, setPageNum] = useState(1);
  const [loadedAll, setLoadedAll] = useState(false);
  const TOTAL_PAGES = 3;
  const { history } = props;
  const classes = styles();

  const openLightbox = useCallback(
    (event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
      setModalToggle(!modalToggle);
    },
    [modalToggle, setModalToggle]
  );

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
    setModalToggle(!modalToggle);
    // when exit out of modal - reset url
    history.push('/' + props.brand + '/' + props.season);
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

  // link for specific picture
  const handleViewChange = index => {
    const newPath =
      '/' + props.brand + '/' + props.season + '/' + index.toString();
    history.push(newPath);
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
              trackProps={{
                onViewChange: handleViewChange
              }}
              styles={{
                view: base => ({
                  ...base,
                  height: 'auto',
                  width: 'auto'
                }),
                headerClose: base => ({
                  ...base,
                  color: 'white',
                  ':hover': { color: '#DE350B' }
                })
              }}
              currentIndex={currentImage}
              views={props.lookbook.pictures.map(x => ({
                ...x,
                srcset: x.src,
                caption: ''
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      ;
      <BackToTop />
    </div>
  );
}
