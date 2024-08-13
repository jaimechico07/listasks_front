import axios from "axios";

const instance = axios.create({
    baseURL: 'https://listasks-back.vercel.app/api',
    withCredentials: true,
})

export default instance