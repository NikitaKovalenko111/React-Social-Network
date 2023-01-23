import axios, { AxiosInstance } from "axios";
import { contactsTypes, defaultResponseType, profileImagesType } from "../types/types";
import { instance } from "./api";

// TYPES

export interface profileAPI {
    setStatus: (status: string) => Promise<setStatusResponseType>
    setPhoto: (image: any) => Promise<setPhotoResponseType>
    getProfile: (userId: number) => Promise<getProfileResponseType>
    getStatus: (userId: number) => Promise<getStatusResponseType>
    changeProfile: (contacts: contactsTypes, fullName: string, lookingForAJob: boolean, lookingForAJobDescription: string | null, aboutMe: string, userId: number | null) => Promise<changeProfileResponseType>
}

export interface getStatusResponseType {
    readonly data: string
    readonly status: number
}

export interface setStatusResponseType extends defaultResponseType {
    readonly data: {}
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

export interface setPhotoResponseType extends defaultResponseType {
    readonly data: {
        photos: profileImagesType
    }
}

export interface changeProfileResponseType extends defaultResponseType {
    readonly data: {}
}

// API

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