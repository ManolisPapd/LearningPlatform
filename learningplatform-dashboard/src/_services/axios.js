import axios from 'axios';

const instance = axios.create({
    baseURL: 'localhost:8080'
});

instance.interceptors.request.use(request => {
    console.log(request);
    return request;
}, error => {
    console.log(error); 
    return Promise.reject(error);
})

export default instance;