import css from "./SearchBar.module.css"
import { useState } from 'react';

interface Props {
  onSubmit: (query: string) => void;
}

const Searchbar: React.FC<Props> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.header}>
      <form  onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Пошук картинок та фото"
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit" className={css.btn}>
          Пошук
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
