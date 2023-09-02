export const Searchbar = ({ onSubmit }) => {
  const onSearch = evt => {
    evt.preventDefault();
    const value = evt.currentTarget.elements.query.value;
    if (value !== '') {
      return onSubmit(value);
    }
  };
  return (
    <header className="Searchbar">
      <form className="Searchbar" onClick={evt => onSearch(evt)}>
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
