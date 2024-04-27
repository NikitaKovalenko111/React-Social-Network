import axios, { AxiosInstance } from 'axios'

//////////// INSTANCES //////////////////////////

export const instance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': 'f950e3ee-d68a-4f0a-80f8-de1b25cd02f6',
    },
})

export const instanceMusic: AxiosInstance = axios.create({
    baseURL: 'https://shazam.p.rapidapi.com',
    params: { key: '484129036' },
    headers: {
        'X-RapidAPI-Key': '8f8b8fb471mshf2c66cd841807d8p140e52jsnf575e9f24c7b',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
    },
})
