import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from '../api.js';
import { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';
import { ModalWindow } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    queryId: null,
    images: [],
    page: 1,
    loading: false,
    error: false,
    hits: 0,
    isOpen: false,
    imageSrc: '',
  };

  handleSubmit = value => {
    this.setState({
      query: value,
      queryId: Date.now(),
      images: [],
      page: 1,
      hits: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page ||
      prevState.queryId !== this.state.queryId
    ) {
      try {
        this.setState({ loading: true, error: false });
        const newImages = await fetchImages(this.state.query, this.state.page);
        this.setState({
          images: [...this.state.images, ...newImages.hits],
          hits: newImages.totalHits,
          error: false,
        });
      } catch (error) {
        this.setState({ error: true });
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
        {this.state.images.length > 0 &&
          this.state.images.length < this.state.hits && (
            <Button onLoadMore={this.handleLoadMore} />
          )}
        <Toaster position="top-center" error={this.state.error} />
        <ModalWindow
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          image={this.state.imageSrc}
        />
      </div>
    );
  }
}
