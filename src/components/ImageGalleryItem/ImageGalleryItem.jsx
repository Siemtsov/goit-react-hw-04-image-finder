import React, { Component } from 'react';
import { Img } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

class ImageItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { image } = this.props;

    return (
      <>
        <Img
          src={image.webformatURL}
          alt={image.tags}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onCloseModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}

export default ImageItem;
