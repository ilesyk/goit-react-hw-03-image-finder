import ReactModal from "react-modal";

export const Modal = ({image}) => {
    return (
      <ReactModal>
        <img src={image.largeImageURL} alt="" />
      </ReactModal>
    );
}
