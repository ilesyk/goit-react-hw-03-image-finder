import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"

export const ImageGallery = ({ images, onClick }) => {
    return (
      <ul className="ImageGallery">
        {images.map(image => {
          return <ImageGalleryItem key={image.id} image={image} />;
        })}
      </ul>
    );
}