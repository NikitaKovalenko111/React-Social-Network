import { AnyAction } from "redux"
import { profileAPI } from "../../api/api"
import { profileImagesType, ThunkType } from "../../types/types"
import { contactsTypes } from "../../types/types"

///////////// TYPES ////////////////////////

export enum ActionCreatorsTypes {
    SET_STATUS = 'profile/SET_STATUS',
    SET_PHOTOS = 'profile/SET_PHOTOS',
    GET_PROFILE = 'profile/GET_PROFILE',
    SET_ISOWNER = 'profile/SET_ISOWNER',
    SET_MY_PROFILE_IMAGES = 'profile/SET_MY_PROFILE_IMAGES',
    SET_IS_LOADING = 'profile/SET_IS_LOADING',
}

export type initialStateType = {
    readonly isOwner: boolean
    readonly status: string
    readonly aboutMe: string | null
    readonly profileImages: profileImagesType
    readonly myProfileImages: profileImagesType
    readonly contacts: contactsTypes
    readonly lookingForAJob: boolean | null
    readonly lookingForAJobDescription: string
    readonly fullName: string
    readonly isLoading: boolean
}

export interface setStatusACTypes {
    type: typeof ActionCreatorsTypes.SET_STATUS
    status: string
}

export interface setPhotosACTypes {
    type: typeof ActionCreatorsTypes.SET_PHOTOS
    large: string
    small: string
}

export interface setIsLoadingACTypes {
    type: typeof ActionCreatorsTypes.SET_IS_LOADING
    value: boolean
}

export interface getProfileACType {
    lookingForAJob: boolean
    aboutMe: string | null
    lookingForAJobDescription: string
    contacts: contactsTypes
    photos: profileImagesType
    fullName: string
    type: typeof ActionCreatorsTypes.GET_PROFILE
}

export interface setIsOwnerACType {
    type: typeof ActionCreatorsTypes.SET_ISOWNER
    isOwner: boolean
}

export interface setMyProfileImagesType {
    type: typeof ActionCreatorsTypes.SET_MY_PROFILE_IMAGES,
    profileImages: profileImagesType
}

///////////// REDUCERS /////////////////////

let initialState: initialStateType = {
    isOwner: false,
    myProfileImages: {
        large: '',
        small: ''
    },
    aboutMe: '',
    status: '',
    profileImages: {
        large: '',
        small: ''
    },
    contacts: {
        github: '',
        vk: '',
        website: '',
        youtube: '',
        mainLink: '',
        twitter: '',
        facebook: '',
        instagram: ''
    },
    lookingForAJob: null,
    lookingForAJobDescription: '',
    fullName: '',
    isLoading: false
}

const ProfileReducer = (state: initialStateType = initialState , action: AnyAction): initialStateType => {
    switch (action.type) {
        case ActionCreatorsTypes.SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case ActionCreatorsTypes.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.value
            }
        }
        case ActionCreatorsTypes.SET_MY_PROFILE_IMAGES: {
            return {
                ...state,
                profileImages: action.profileImages
            }
        }
        case ActionCreatorsTypes.SET_ISOWNER: {
            return {
                ...state,
                isOwner: action.isOwner
            }
        }
        case ActionCreatorsTypes.GET_PROFILE: {     
            return {
                ...state,
                profileImages: action.photos,
                fullName: action.fullName,
                lookingForAJob: action.lookingForAJob,
                lookingForAJobDescription: action.lookingForAJobDescription,
                contacts: action.contacts,
                aboutMe: action.aboutMe
            }
        }
        default:
            return state
    }

}

//////////// ACTION CREATORS ///////////////

export const setStatusAC = (status: string): setStatusACTypes => {
    return {
        type: ActionCreatorsTypes.SET_STATUS,
        status: status
    }
}

export const setIsLoadingAC = (value: boolean): setIsLoadingACTypes => {
    return {
        type: ActionCreatorsTypes.SET_IS_LOADING,
        value: value
    }
}

export const setPhotosAC = (largePhoto: string, smallPhoto: string): setPhotosACTypes => {
    return {
        type: ActionCreatorsTypes.SET_PHOTOS,
        large: largePhoto,
        small: smallPhoto
    }
}

export const setMyProfileImagesAC = (images: profileImagesType): setMyProfileImagesType => {
    return {
        type: ActionCreatorsTypes.SET_MY_PROFILE_IMAGES,
        profileImages: images
    }
}

export const getProfileAC = (lookingForAJob: boolean, lookingForAJobDescription: string, fullName: string, contacts: contactsTypes, photos: profileImagesType, aboutMe: string): getProfileACType => {
    return {
        type: ActionCreatorsTypes.GET_PROFILE,
        lookingForAJob: lookingForAJob,
        lookingForAJobDescription: lookingForAJobDescription,
        contacts: contacts,
        photos: photos,
        fullName: fullName,
        aboutMe: aboutMe
    }
}

export const setOwnerAC = (value: boolean) => {
    return {
        type: ActionCreatorsTypes.SET_ISOWNER,
        isOwner: value
    }
}

////////////// THUNKS /////////////////////

export const setStatusThunk = (status: string): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.setStatus(status)
        dispatch(setIsLoadingAC(true))
        
        if (response.resultCode === 0) {
            dispatch(setStatusAC(status))
            dispatch(setIsLoadingAC(false))
        }
    }
}

export const getStatusThunk = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setIsLoadingAC(true))
        let response = await profileAPI.getStatus(userId)
        if (response.status === 200) {
            dispatch(setStatusAC(response.data))
            dispatch(setIsLoadingAC(false))
        }
    }
}

export const setPhotosThunk = (): ThunkType => async dispatch => {
    let response = await profileAPI.setPhoto()
    if (response.resultCode === 0)
        dispatch(setPhotosAC(response.data.large, response.data.small))
}

export const getProfileThunk = (userId: number, setMyProfileImages?: boolean): ThunkType => async dispatch => {
    dispatch(setIsLoadingAC(true))
    let response = await profileAPI.getProfile(userId)
    
    if (response.status === 200) {
        dispatch(getProfileAC(response.data.lookingForAJob, response.data.lookingForAJobDescription, response.data.fullName, response.data.contacts, response.data.photos, response.data.aboutMe))
        if (setMyProfileImages) 
            dispatch(setMyProfileImagesAC(response.data.photos))
        dispatch(setIsLoadingAC(false))
    }
}

//////////////////////////////////////////

export default ProfileReducer