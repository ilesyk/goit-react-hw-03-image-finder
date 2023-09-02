export const ImageGalleryItem = ({ image }) => {
    return (
      <li className="ImageGalleryItem">
        <img
          src={image.webformatURL}
          alt={image.tags}
          width={image.webformatWidth}
                className="ImageGalleryItem-image"
        />
      </li>
    );
}