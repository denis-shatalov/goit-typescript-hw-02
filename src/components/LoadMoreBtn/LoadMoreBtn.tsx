import css from "./LoadMoreBtn.module.css"

interface Props {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <button type="button" className={css.btn} onClick={onClick}>
      Ще фото
    </button>
  );
};

export default LoadMoreBtn;
