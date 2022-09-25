import { ThunkAction } from "redux-thunk"
import { appStateType } from "../redux/store"
import { AnyAction } from "redux"

export type profileImagesType = {
    small: string
    large: string
}

export type trackType = {
    title: string
    images: {
        coverart: string
    }
    url: string
}

export type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, AnyAction>

export type contactsTypes = {
    [github: string]: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type defaultResponseType = {
    readonly resultCode: number
    readonly messages: Array<string>
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: profileImagesType
    followed: boolean
}