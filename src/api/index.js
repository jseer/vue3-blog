import request from '@/util/axios';

// index
export const register = (payload) => {
    return request.post('/api/user/register', payload)
}

export const login = (payload) => {
    return request.post('/api/user/login', payload)
}

export const logout = () => {
    return request.post('/api/user/logout')
}

export const getUser = (payload) => {
    return request.get('/api/user/get', payload)
}

// account
export const queryUser = (payload) => {
    return request.post('/api/admin/user/query', payload)
}

export const updateUser = (payload) => {
    return request.post('/api/admin/user/update', payload)
}
export const deleteUser = (payload) => {
    return request.post('/api/admin/user/delete', payload)
}

// 文章api
export const createPost = (payload) => {
    return request.post('/api/post/create', payload)
}
export const queryPost = (payload) => {
    return request.post('/api/post/query', payload)
}
export const getPost = (payload) => {
    return request.get('/api/post/get', {
        params: payload,
    })
}
export const updatePost = (payload) => {
    return request.post('/api/post/update', payload)
}

export const publishPost = (payload) => {
    return request.post('/api/post/publish', payload)
}
export const deletePost = (payload) => {
    return request.post('/api/post/delete', payload)
}