import axios from '../../config/request'
export async function send(method, url, params, data) {
    const config = {method: method, url: url, params: params?params:undefined, data: data?data:undefined}
    return await axios(config)
    .then(result=>[null,result])
    .catch(error=>[error,undefined]);
}