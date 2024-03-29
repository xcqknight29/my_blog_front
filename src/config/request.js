import axios from 'axios'
import router from '../router/index'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'
axios.defaults.withCredentials = true

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.error(error)
        if(
            error.response.status === 401 
                && error.response.data === 'to_login'
        ) {
            router.push({name: 'writer-login'})
        } else {
            this.$message({type: 'error', message: error})
            return error.response
        }
    },
)

export default axios;