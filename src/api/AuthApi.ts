import { defaultResponseType } from '../types/types'
import { instance } from './api'

// TYPES

export interface IAuthAPI {
    me: () => Promise<IMeResponseType>
    exit: () => Promise<IExitResponseType>
    login: (
        email: string,
        password: string,
        saveMe: boolean
    ) => Promise<ILoginResponseType>
}

export interface IMeResponseType extends defaultResponseType {
    readonly data: {
        id: number
        login: string
        email: string
    }
}

export interface IExitResponseType {
    readonly status: number
}

export interface ILoginResponseType {
    readonly status: number
}

// API

export const AuthAPI: IAuthAPI = {
    me: () => {
        return instance.get('/auth/me').then((response) => response.data)
    },
    exit: () => {
        return instance.delete('/auth/login')
    },
    login: (email, password, saveMe) => {
        return instance.post('/auth/login', {
            email: email,
            password: password,
            rememberMe: saveMe,
        })
    },
}
