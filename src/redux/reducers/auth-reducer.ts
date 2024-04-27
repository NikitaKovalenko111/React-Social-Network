import { AnyAction } from 'redux'
import { AuthAPI } from '../../api/AuthApi'
import { ThunkType } from '../../types/types'
import { getProfileThunk } from './profile-reducer'

///////////// TYPES ////////////////////////

export enum ActionTypes {
    LOGIN = 'auth/LOGIN',
    GET_ME = 'auth/GET_ME',
    EXIT = 'auth/EXIT',
}

export type initialStateType = {
    readonly isAuthorized: boolean
    readonly login: string
    readonly email: string
    readonly userId: number | null
}

type getMeACType = {
    type: typeof ActionTypes.GET_ME
    login: string
    email: string
    id: number
}

type exitACType = {
    type: typeof ActionTypes.EXIT
}

///////////// REDUCERS /////////////////////

const initialState: initialStateType = {
    isAuthorized: false,
    login: '',
    email: '',
    userId: null,
}

const AuthReducer = (
    state: initialStateType = initialState,
    action: AnyAction
): initialStateType => {
    switch (action.type) {
        case ActionTypes.GET_ME: {
            return {
                ...state,
                login: action.login,
                email: action.email,
                userId: action.id,
                isAuthorized: true,
            }
        }
        case ActionTypes.EXIT: {
            return {
                ...state,
                login: '',
                email: '',
                userId: null,
                isAuthorized: false,
            }
        }
        default:
            return state
    }
}

////////// ACTION CREATORS ////////////////

export const getMeAC = (
    login: string,
    email: string,
    id: number
): getMeACType => {
    return {
        type: ActionTypes.GET_ME,
        login: login,
        email: email,
        id: id,
    }
}

export const exitAC = (): exitACType => {
    return {
        type: ActionTypes.EXIT,
    }
}

/////////////// THUNKS /////////////////////

export const getMeThunk = (): ThunkType => async (dispatch) => {
    const response = await AuthAPI.me()

    if (response.resultCode === 0) {
        dispatch(
            getMeAC(response.data.login, response.data.email, response.data.id)
        )
        dispatch(getProfileThunk(response.data.id, true))
    }
}

export const exitThunk = (): ThunkType => async (dispatch) => {
    const response = await AuthAPI.exit()

    if (response.status === 200) dispatch(exitAC())
}

export const loginThunk =
    (email: string, password: string, saveMe: boolean): ThunkType =>
    async (dispatch) => {
        const response = await AuthAPI.login(email, password, saveMe)

        if (response.status === 200) dispatch(getMeThunk())
    }

export default AuthReducer
