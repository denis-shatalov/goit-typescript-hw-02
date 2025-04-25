import Modal from "react-modal";
import styles from "./ImageModal.module.css";
import { UnsplashImage } from "../../types/unsplash";

Modal.setAppElement("#root");

interface ImageModalProps {
  image: UnsplashImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      
      {image && (
        <>
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Зображення"}
            className={styles.image}
          />
          <p>Автор: {image.user?.name}</p>
          <p>Лайки: {image.likes || 0}</p>
          <button onClick={onClose} className={styles.closeButton}>Закрити</button>
        </>
      )}
    </Modal>
  );
};

export default ImageModal;