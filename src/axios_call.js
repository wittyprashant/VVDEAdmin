// import axios from 'axios';
// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// const instance = axios.create({
//     baseURL: "http://18.233.5.112/api"
//     // baseURL: "http://localhost/data_entry_software/public/api"
// })

// const AxiosInterceptor = ({ children }) => {

//     const navigate = useNavigate();

//     useEffect(() => {

//         const resInterceptor = response => {
//             return response;
//         }

//         const errInterceptor = error => {

//             if (error.response.status === 401) {
//                 localStorage.clear();
//                 navigate('/login');
//                 console.log("login redirect")
//             }

//             return Promise.reject(error);
//         }


//         const interceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);

//         return () => instance.interceptors.response.eject(interceptor);

//     }, [navigate])

//     return children;
// }
// instance.interceptors.request.use(function (config) {
//     const userDetail = localStorage.getItem('userDetail');
//     const token = userDetail ? JSON.parse(userDetail).token : '';
//     config.headers.Authorization =  token ? `Bearer ${token}` : '';
//     return config;
//   });


// export default instance;
// export {AxiosInterceptor}


import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const instance = axios.create({
    // baseURL: "http://18.233.5.112/api"
    baseURL: "http://192.168.1.34/data_entry_software/public/api"
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