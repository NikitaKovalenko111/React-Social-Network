import axios, { AxiosInstance } from "axios";
import { contactsTypes, defaultResponseType, profileImagesType, trackType, UserType } from "../types/types";

//////////// TYPES //////////////////////////////

export interface profileAPI {
    setStatus: (status: string) => Promise<setStatusResponseType>
    setPhoto: (image: any) => Promise<setPhotoResponseType>
    getProfile: (userId: number) => Promise<getProfileResponseType>
    getStatus: (userId: number) => Promise<getStatusResponseType>
    changeProfile: (contacts: contactsTypes, fullName: string, lookingForAJob: boolean, lookingForAJobDescription: string | null, aboutMe: string, userId: number | null) => Promise<changeProfileResponseType>
}

export interface usersAPI {
    getUsers: (count: number, page: number, term: string, friend: boolean | undefined) => Promise<getUsersResponseType>
    getFollowStatus: (userId: number) => Promise<getFollowStatusResponseType>
    followToUser: (userId: number) => Promise<followToUserResponseType>
    unfollowToUser: (userId: number) => Promise<unfollowToUserResponseType>
}

export interface authAPI {
    me: () => Promise<meResponseType>
    exit: () => Promise<exitResponseType>
    login: (email: string, password: string, saveMe: boolean) => Promise<loginResponseType>
}

export interface setStatusResponseType extends defaultResponseType {
    readonly data: {}
}

export interface changeProfileResponseType extends defaultResponseType {
    readonly data: {}
}

export interface getTopTracksResponseType {
    readonly status: number
    readonly data: {
        tracks: Array<trackType>
    }
}

export interface exitResponseType {
    readonly status: number
}

export interface loginResponseType {
    readonly status: number
}

export interface getStatusResponseType {
    readonly data: string
    readonly status: number
}

export interface getFollowStatusResponseType {
    readonly data: boolean
    readonly status: number
}

export interface setPhotoResponseType extends defaultResponseType {
    readonly data: {
        photos: profileImagesType
    }
}

export interface followToUserResponseType {
    readonly status: number
}

export interface getUsersResponseType {
    readonly status: number
    readonly data: {
        items: Array<UserType>
        totalCount: number
        error: string
    }
}

export interface unfollowToUserResponseType {
    readonly status: number
}

export interface meResponseType extends defaultResponseType {
    readonly data: {
        id: number
        login: string
        email: string
    }
}

export interface getProfileResponseType {
    readonly status: number
    readonly data: {
        aboutMe: string
        userId: number
        lookingForAJob: boolean
        lookingForAJobDescription: string
        fullName: string
        contacts: contactsTypes
        photos: profileImagesType
    }
}

export interface MusicAPIType {
    getMostLovedTracks: () => Promise<getTopTracksResponseType>
}

//////////// INSTANCES //////////////////////////

const instance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": 'f950e3ee-d68a-4f0a-80f8-de1b25cd02f6'
    }
})

const instanceMusic: AxiosInstance = axios.create({
    baseURL: 'https://shazam.p.rapidapi.com',
    params: {key: '484129036'},
    headers: {
        'X-RapidAPI-Key': '8f8b8fb471mshf2c66cd841807d8p140e52jsnf575e9f24c7b',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
})

//////////////// APIs ///////////////////////////

export const profileAPI: profileAPI = {
    setStatus: (status: string) => {
        return instance.put('/profile/status', {
            status: status
        }).then(response => response.data)
    },
    changeProfile(contacts: contactsTypes, fullName: string, lookingForAJob: boolean, lookingForAJobDescription: string | null, aboutMe: string, userId: number | null) {
        return instance.put('/profile', {
            userId: userId,
            AboutMe: aboutMe,
            contacts: contacts,
            lookingForAJob: lookingForAJob,
            lookingForAJobDescription: lookingForAJobDescription,
            fullName: fullName
        }).then(response => response.data)
    },
    setPhoto: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return instance.put('/profile/photo', formData, config).then(response => response.data)
    },

    getProfile: (userId: number) => {
        return instance.get(`/profile/${userId}`).then(response => response)
    },

    getStatus: (userId: number) => {
        return instance.get(`/profile/status/${userId}`).then(response => response)
    }
}

export const usersAPI: usersAPI = {
    getUsers: (count, page, term, friend) => {
        return instance.get(`/users?count=${count <= 100 ? count : 10}&page=${page}&term=${term}&friend=${friend}`).then(response => response)
    },
    getFollowStatus: (userId: number) => {
        return instance.get(`/follow/${userId}`).then(response => response)
    },
    followToUser: (userId: number) => {
        return instance.post(`/follow/${userId}`)
    },
    unfollowToUser: (userId: number) => {
        return instance.delete(`/follow/${userId}`)
    },
}

export const AuthAPI: authAPI = {
    me: () => {
        return instance.get('/auth/me').then(response => response.data)
    },
    exit: () => {
        return instance.delete('/auth/login')
    },
    login: (email, password, saveMe) => {
        return instance.post('/auth/login', {
            email: email,
            password: password,
            rememberMe: saveMe  
        })
    }
}

export const MusicAPI: MusicAPIType  = {
    getMostLovedTracks: () => {
        return instanceMusic.get('/songs/list-recommendations').then(response => response);
    },
}
