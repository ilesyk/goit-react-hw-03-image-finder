import axios from 'axios';

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=38386406-5744ae5dca70e3cf5c44041b1&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
