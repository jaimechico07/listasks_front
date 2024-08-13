import axios from "axios";

const instance = axios.create({
    baseURL: 'https://listasks-front.vercel.app/api',
    withCredentials: true,
})

export default instance