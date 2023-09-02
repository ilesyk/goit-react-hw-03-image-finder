export const Searchbar = ({ onSubmit }) => {
  return (
    <header className="Searchbar">
      <form className="Searchbar" onClick={evt => onSubmit(evt)}>
        <button type="submit" className="SearchForm-button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
