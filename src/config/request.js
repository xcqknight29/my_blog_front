import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';

axios.interceptors.response.use(
  function(response) {
    return response.data;
  }
);

export default axios;