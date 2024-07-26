import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ImageGalleryItem extends Component {
  handleClick = () => {
    console.log("ImageGalleryItem clicked"); // Debug log
    this.props.onClick(this.props.image.largeImageURL);
  };

  render() {
    const { image } = this.props;
    return (
      <li className="ImageGalleryItem" onClick={this.handleClick}>
        <img
          src={image.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};