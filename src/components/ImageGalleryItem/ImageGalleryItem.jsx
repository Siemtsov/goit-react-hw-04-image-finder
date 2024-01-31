import { useState } from 'react';
import { Img } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevModal => !prevModal);
  };

  return (
    <>
      <Img
        src={image.webformatURL}
        alt={image.tags}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          onCloseModal={toggleModal}
        />
      )}
    </>
  );
};

export default ImageGalleryItem;
