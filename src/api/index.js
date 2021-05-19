import request from '@/util/axios';

export const register = (payload) => {
    return request.post('/api/user/register', payload)
}

export const login = (payload) => {
    return request.post('/api/user/login', payload)
}
