import { Modal } from 'components/Modal/Modal';
import { GalleryImg, GalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGalleryItem = ({largeImageURL, webformatURL, tags}) => {
const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

    return (
      <>
        <GalleryItem onClick={toggleModal}>
          <GalleryImg src={webformatURL} alt={tags} />
        </GalleryItem>
        {isOpen && (
          <Modal
            toggleModal={toggleModal}
            largeImage={largeImageURL}
            tags={tags}
          />
        )}
      </>
    );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
