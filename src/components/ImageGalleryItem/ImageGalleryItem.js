export const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        alt={image.tags}
        width={image.webformatWidth}
        className="ImageGalleryItem-image"
        onClick={() => openModal(image)}
      />
    </li>
  );
};
