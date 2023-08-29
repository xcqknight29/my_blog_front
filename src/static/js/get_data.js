import { send } from './send_request'
export async function getClassification() {
    const method = 'get';
    const url = '/writer/classification';
    const [error,result] = await send(method, url);
    if (error) {
        this.$message({type: 'error', message: error});
    } else {
        return result.data;
    }
}
// export async function getAuthor() {
//     const method = 'get';
//     const url = '/writer/author';
//     const [error,result] = await send(method, url);
//     if (error) {
//         this.$message({type: 'error', message: error});
//     } else {
//         return result.data;
//     }
// }