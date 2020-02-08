import React, { useState, useCallback, useContext } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from 'react-photo-gallery';
import ImageHeader from '../imageheader';
import BackToTop from '../backtotop';
import { ModalContext } from '../../contexts/ModalContext';

export default function ProfileImageGallery(props) {
  const { photos } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const { modalToggle, setModalToggle } = useContext(ModalContext);

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
  };

  const columns = containerWidth => {
    let columns = 1;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    return columns;
  };

  if (photos.length !== 0) {
    return (
      <div>
        <Gallery
          photos={photos}
          onClick={openLightbox}
          direction={'column'}
          columns={columns}
        />
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
                frameProps={{ autoSize: 'true' }}
                components={{ Header: ImageHeader }}
                currentIndex={currentImage}
                views={photos.map(x => ({
                  ...x,
                  srcset: x.src,
                  caption: x.brand + ' ' + x.season
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
        <BackToTop />
      </div>
    );
  } else {
    return null;
  }
}
