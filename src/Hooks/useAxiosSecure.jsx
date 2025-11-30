import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})



const useAxiosSecure = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        
        const reqInterseptors = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = (`Bearer ${user?.accessToken}`)
            return config;
        })

        // Responce intersepteor

        const resInterseptors = axiosSecure.interceptors.response.use(
            
        (response) => {
            return response
        },
            
        (err) => {
            console.log(err);

            const statusCode = err.status;

            if (statusCode === 401 || statusCode === 403) {
                logoutUser()
                    .then(() => {
                    navigate('/login')
                })
            }

            return Promise.reject(err);
        })
        
        

        return () => {
            axiosSecure.interceptors.request.eject(reqInterseptors);
            axiosSecure.interceptors.response.eject(resInterseptors);

        }

    },[user, logoutUser, navigate])

    return axiosSecure;
};

export default useAxiosSecure;