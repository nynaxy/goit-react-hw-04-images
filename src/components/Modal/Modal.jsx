import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.scss";

export default class Modal extends Component {
  handleEsc = (event) => {
    if (event.key === "Escape") {
      this.props.onClose();
    }
  };

  backdropClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEsc);
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.backdropClick}>
        <div className={css.modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};