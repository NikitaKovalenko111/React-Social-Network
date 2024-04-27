import {
    contactsTypes,
    defaultResponseType,
    profileImagesType,
} from '../types/types'
import { instance } from './api'

// TYPES

export interface IProfileAPI {
    setStatus: (status: string) => Promise<ISetStatusResponseType>
    setPhoto: (image: any) => Promise<ISetPhotoResponseType>
    getProfile: (userId: number) => Promise<IGetProfileResponseType>
    getStatus: (userId: number) => Promise<IGetStatusResponseType>
    changeProfile: (
        contacts: contactsTypes,
        fullName: string,
        lookingForAJob: boolean,
        lookingForAJobDescription: string | null,
        aboutMe: string,
        userId: number | null
    ) => Promise<IChangeProfileResponseType>
}

export interface IGetStatusResponseType {
    readonly data: string
    readonly status: number
}

export interface ISetStatusResponseType extends defaultResponseType {
    readonly data: {}
}

export interface IGetProfileResponseType {
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

export interface ISetPhotoResponseType extends defaultResponseType {
    readonly data: {
        photos: profileImagesType
    }
}

export interface IChangeProfileResponseType extends defaultResponseType {
    readonly data: {}
}

// API

export const profileAPI: IProfileAPI = {
    setStatus: (status: string) => {
        return instance
            .put('/profile/status', {
                status: status,
            })
            .then((response) => response.data)
    },
    changeProfile(
        contacts: contactsTypes,
        fullName: string,
        lookingForAJob: boolean,
        lookingForAJobDescription: string | null,
        aboutMe: string,
        userId: number | null
    ) {
        return instance
            .put('/profile', {
                userId: userId,
                AboutMe: aboutMe,
                contacts: contacts,
                lookingForAJob: lookingForAJob,
                lookingForAJobDescription: lookingForAJobDescription,
                fullName: fullName,
            })
            .then((response) => response.data)
    },
    setPhoto: (file) => {
        const formData = new FormData()
        formData.append('image', file)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        return instance
            .put('/profile/photo', formData, config)
            .then((response) => response.data)
    },

    getProfile: (userId: number) => {
        return instance.get(`/profile/${userId}`).then((response) => response)
    },

    getStatus: (userId: number) => {
        return instance
            .get(`/profile/status/${userId}`)
            .then((response) => response)
    },
}
