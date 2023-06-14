import axios from 'axios';

// export const fetchImages = (value, page = 1) => {
//   const BASE_URL = 'https://pixabay.com/api';
//   const API_KEY = '35736305-5d79b99fc6e7e7bd6a57f0349';
//   return axios.get(
//     `${BASE_URL}/?key=${API_KEY}&q=${value}&page=${page}&per_page=12`
//   );
// };


axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.common['Authorization'] = '35736305-5d79b99fc6e7e7bd6a57f0349';
axios.defaults.params = {
  orientation: 'horizontal',
  image_type: 'photo',
  per_page: 12,
};
export const fetchImages = (value, page = 1) => {
  return axios.get(
    `?q=${value}&page=${page}`
  );
};
