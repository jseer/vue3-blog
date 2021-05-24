import axios from 'axios';
import { baseURL } from './constant';
import { ElMessage } from 'element-plus';

const instance = axios.create({
    // baseURL,
})
let msgInstance = null;
instance.interceptors.response.use((response)=> {
    const {data,code, message } = response.data;
    if(code === 200) {
        return data;
    } else {
        msgInstance && msgInstance.close();
        msgInstance = ElMessage.error(message);
        return Promise.reject(message)
    }
})

export default instance;