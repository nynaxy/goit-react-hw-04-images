import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal/Modal";
import Loader from "./Loader";
import Button from "./Button";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchGallery = async () => {
      setIsLoading(true);
      const apiKey = "43680485-d2c13a63d690cef752ef6eeaf";

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
        );
        const data = response.data.hits;
        setImages((prevImages) =>
          page === 1 ? data : [...prevImages, ...data],
        );
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, [query, page]);

  const handleSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setLargeImageURL("");
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
}