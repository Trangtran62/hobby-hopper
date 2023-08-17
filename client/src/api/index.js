import axios from 'axios';

const API = axios.create({ baseURL: 'https://hobby-hopper-api.onrender.com' })
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        const token = JSON.parse(localStorage.getItem('profile')).token;
        req.headers.authorization = `Bearer ${token}`;
    }

    return req;
});


export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost); 
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id, userId) => API.patch(`posts/${id}/likePost`, userId);
export const postComment = (comment, id) => API.post(`/posts/${id}/postComment`, { comment });
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('user/signup', formData);