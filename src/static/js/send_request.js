import axios from '../../config/request'
import { ElMessage } from 'element-plus'

export async function send(method, url, params, data) {
    const config = {
        method: method,
        url: url,
        params: params ? params : undefined,
        data: data ? data : undefined
    }
    return await axios(config)
        .then(result=>[null, result])
        .catch(error=>[error, undefined]);
}

export async function sendAndThrow(method, url, params, data) {
    const [error,result] = await send(method, url, params, data)
    if(error) {
        ElMessage({type: 'error', message: error})
        return null
    }
    return result
}
