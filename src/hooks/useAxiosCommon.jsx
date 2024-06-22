import axios from "axios";

const axiosCommon = axios.create({
    baseURL: 'https://b9a12-server-side-anik98-bh.vercel.app'
})

const useAxiosCommon = () => {
    return axiosCommon;
};

export default useAxiosCommon;