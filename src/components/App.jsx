import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal/Modal";
import Loader from "./Loader";
import Button from "./Button";

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    query: "",
    showModal: false,
    largeImageURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchGallery();
    }
  }

  fetchGallery = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    const apiKey = "43731896-5811be0b712c2ad5da2549bb8";

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
      );
      const data = response.data;
      this.setState((prevState) => ({
        images: page === 1 ? data.hits : [...prevState.images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = (query) => {
    this.setState({ query, page: 1 });
  };

  handleImageClick = (largeImageURL) => {
    console.log("Image clicked:", largeImageURL); // Debug log
    this.setState({ largeImageURL, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: "" });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, largeImageURL, showModal, isLoading, error } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}