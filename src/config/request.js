import axios from 'axios';
import router from '../router/index';

axios.defaults.baseURL = 'http://localhost:8000/';

axios.interceptors.response.use(
    function(response) {
        if(response.data) {
            router.push('/login')
        }
    }
);

export default axios;