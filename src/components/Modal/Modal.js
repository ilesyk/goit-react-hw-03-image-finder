import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '57%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '550px',
    width: '800px',
    padding: '0',
    zIndex: '1300',
  },
};

Modal.setAppElement('#root');
export const ModalWindow = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      preventScroll={true}
      contentLabel="Example Modal"
    >
      <img src={image.largeImageURL} alt={image.tags} />
    </Modal>
  );
};
