import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const instance = axios.create({
    baseURL: "http://localhost/VVDEBackend/public/api"
})

const AxiosInterceptor = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {

        const resInterceptor = response => {
            return response;
        }

        const errInterceptor = error => {

            if (error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }

            return Promise.reject(error);
        }

        const interceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);
        return () => instance.interceptors.response.eject(interceptor);

    }, [navigate])

    return children;
}
instance.interceptors.request.use(function (config) {
    const userDetail = localStorage.getItem('userDetail');
    const token = userDetail ? userDetail.token : '';
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});


export default instance;
export {AxiosInterceptor}