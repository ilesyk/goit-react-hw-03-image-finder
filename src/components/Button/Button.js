export const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className="Button-load" onClick={() => onLoadMore()}>
      Load more
    </button>
  );
};
