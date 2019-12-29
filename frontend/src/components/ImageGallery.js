import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';

export default function ImageGallery(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  function columns(containerWidth) {
    let columns = 2;
    if (containerWidth >= 900) columns = 4;
    return columns;
  }

  return (
    <div>
      <Gallery
        photos={props.lookbook.pictures}
        onClick={openLightbox}
        direction={'column'}
        columns={columns}
      />

      <ModalGateway>
        {viewerIsOpen ? (
          <Modal
            styles={{
              blanket: base => ({
                ...base,
                backgroundColor: 'rgba(255,255,255,0.85)'
              }),
              dialog: base => ({
                ...base,
                maxWidth: 640
              })
            }}
            onClose={closeLightbox}
          >
            <Carousel
              frameProps={{ autoSize: 'height' }}
              styles={{
                view: base => ({
                  ...base,
                  display: 'wrap',
                  height: 'calc(100vh-20px)',
                  paddingBottom: '5%'
                }),
                header: base => ({
                  ...base,
                  background: 'none !important',
                  position: 'static'
                }),
                headerClose: base => ({
                  ...base,
                  color: 'black',
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
    </div>
  );
}
