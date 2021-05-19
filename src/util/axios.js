import axios from 'axios';
import { baseURL } from './constant';

const instance = axios.create({
    // baseURL,
})

instance.interceptors.response.use((response)=> {
    const {data,code, message } = response.data;
    if(code === 200) {
        return data;
    } else {
        return Promise.reject(message)
    }
})

export default instance;