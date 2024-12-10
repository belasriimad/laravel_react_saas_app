import axios from "axios"

export const axiosRequest = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const getConfig = (token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    return config
}