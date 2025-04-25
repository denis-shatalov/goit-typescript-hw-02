import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErorrMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { fetchImages } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { UnsplashImage } from "../../types/unsplash";


const App: React.FC= () => {
  const [query, setQuery] = useState<string>(""); 
  const [images, setImages] = useState<UnsplashImage[]>([]); 
  const [page, setPage] = useState<number>(1); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null); 
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleSearch = (searchQuery: string): void => {
    const trimmedQuery = searchQuery.trim(); 

    if (trimmedQuery === query) {
      toast("Цей запит вже виконано!");
      return;
    }

    setQuery(trimmedQuery);
    setImages([]); 
    setPage(1);
    setError(null);
  };

  useEffect(() => {
    if (!query) return;

    const getImages = async ():Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);

        if (!data.results.length) {  
          setError("Зображень не знайдено!");
          setImages([]);  
          setTotalPages(1); 
          return;
        }

        setImages((prev) => [...prev, ...data.results]);
        setTotalPages(Math.ceil(data.total / 20)); 
      } catch {
        setError("Помилка завантаження зображень.");
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      
      {error && <ErrorMessage message={error} />}

      <ImageGallery images={images} onImageClick={setSelectedImage} />

      {loading && <Loader />}

      {images.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}

      <ImageModal 
        image={selectedImage} 
        isOpen={Boolean(selectedImage)} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};

export default App;