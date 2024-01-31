import { useState, useEffect } from 'react';
import * as API from './Pixabay/PixabayApi';
import { ToastContainer, toast, Slide } from 'react-toastify';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    async function addImages() {
      try {
        setIsLoading(true);
        const data = await API.getImages(searchName, currentPage);

        if (data.hits.length === 0) {
          return toast.info('Sorry images was not founded', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        const normalizedImages = API.normalazedImages(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch {
        toast.error('Something went wrong, please try again!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchName, currentPage]);

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSubmit = query => {
    setSearchName(query);
    setImages([]);
    setCurrentPage(1);
  };

  return (
    <div>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p style={{ padding: 100, textAlign: 'center', fontSize: 30 }}>
          Image gallery is empty...
        </p>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
};

export default App;
