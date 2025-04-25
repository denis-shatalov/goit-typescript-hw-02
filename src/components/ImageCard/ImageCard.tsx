import { UnsplashImage } from "../../types/unsplash";
import css from "../ImageCard/ImageCard.module.css";

interface ImageCardProps {
    image: UnsplashImage;                                                                                                                                                                                                          
}
const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div className={css.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Unsplash Image"}
        className={css.image}
        loading="lazy"
      />
    </div>
  );
};

export default ImageCard;