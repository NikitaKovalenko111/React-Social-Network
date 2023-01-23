import axios, { AxiosInstance } from "axios";
import { defaultResponseType } from "../types/types";
import { instance } from "./api";

// TYPES

export interface authAPI {
    me: () => Promise<meResponseType>
    exit: () => Promise<exitResponseType>
    login: (email: string, password: string, saveMe: boolean) => Promise<loginResponseType>
}

export interface meResponseType extends defaultResponseType {
    readonly data: {
        id: number
        login: string
        email: string
    }
}

export interface exitResponseType {
    readonly status: number
}

export interface loginResponseType {
    readonly status: number
}

// API

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