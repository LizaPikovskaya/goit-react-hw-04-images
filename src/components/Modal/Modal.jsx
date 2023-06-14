import { useEffect } from 'react';
import { ModalDiv, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

export const Modal = ({ largeImage, tags, toggleModal }) => {
  useEffect(() => {
    const handlerCloseModalByEsc = evt => {
      if (evt.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handlerCloseModalByEsc);
    disableBodyScroll(document);
    return () => {
      window.removeEventListener('keydown', handlerCloseModalByEsc);
      enableBodyScroll(document);
      clearAllBodyScrollLocks();
    };
  }, [toggleModal]);

  const handlerOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      toggleModal();
    }
  };
  return (
    <Overlay onClick={handlerOverlayClick}>
      <ModalDiv>
        <img src={largeImage} alt={tags} />
      </ModalDiv>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string,
  tags: PropTypes.string,
  toggleModal: PropTypes.func,
};
