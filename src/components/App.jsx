import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from '../api.js';
import { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';
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
export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: false,
    hits: 0,
    isOpen: false,
    imageSrc: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${Date.now()}/${evt.currentTarget.elements.query.value}`,
      images: [],
      page: 1,
      hits: 0,
    });
  };
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      images: [...prevState.images],
    }));
  };
  componentDidMount() {}
  async componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.query !== this.state.query &&
        this.state.query.split('/').pop() !== '') ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true, error: false });
        const newImages = await fetchImages(
          this.state.query.split('/').pop(),
          this.state.page
        );
        this.setState({
          images: [...this.state.images, ...newImages.hits],
          hits: newImages.totalHits,
          error: false,
        });
      } catch (error) {
        if (!this.state.error) {
          this.setState({ error: true });
        }
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  openModal = image => {
    this.setState({ imageSrc: image, isOpen: true });
  };
  closeModal = () => {
    this.setState({
      isOpen: false,
      imageSrc: '',
    });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.loading && (
          <Loader loading={this.state.loading} className="Loader" />
        )}
        {this.state.error && !this.state.loading && (
          <div>There was an error! Please try to reload the page.</div>
        )}
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} openModal={this.openModal} />
        )}
        {0 < this.state.images.length &&
          this.state.images.length < this.state.hits && (
            <Button onLoadMore={this.handleLoadMore} />
          )}
        <Toaster position="top-center" error={this.state.error} />
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <img
            src={this.state.imageSrc.largeImageURL}
            alt={this.state.imageSrc.tags}
          />
        </Modal>
      </div>
    );
  }
}
