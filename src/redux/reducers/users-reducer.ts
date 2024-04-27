import { AnyAction } from 'redux'
import { usersAPI } from '../../api/UsersApi'
import { ThunkType, UserType } from '../../types/types'
import { setIsLoadingAC } from './profile-reducer'

//////////// TYPES ///////////////////

enum ActionCreatorsTypes {
    GET_USERS = 'users/GET_USERS',
    SET_FOLLOW_STATUS = 'users/SET_FOLLOW_STATUS',
    SET_IS_FOLLOWING = 'users/SET_IS_FOLLOWING',
    SET_FOLLOWED_STATUS = 'users/SET_FOLLOWED_STATUS',
}

type getUsersACType = {
    type: typeof ActionCreatorsTypes.GET_USERS
    users: Array<UserType>
    totalCount: number
    error: string
}

type setIsFollowingACType = {
    type: typeof ActionCreatorsTypes.SET_IS_FOLLOWING
    isFollowing: boolean
    id: number
}

type setFollowedStatusACType = {
    type: typeof ActionCreatorsTypes.SET_FOLLOWED_STATUS
    status: boolean
    userId: number
}

type initialStateType = {
    users: Array<UserType>
    readonly totalCount: number
    readonly error: string
    readonly isFollowing: Array<number>
}

/////////// REDUCERS ////////////////

const InitialState: initialStateType = {
    users: [],
    totalCount: 0,
    error: '',
    isFollowing: [],
}

const usersReducer = (
    state: initialStateType = InitialState,
    action: AnyAction
) => {
    switch (action.type) {
        case ActionCreatorsTypes.GET_USERS: {
            return {
                ...state,
                users: [...action.users],
                totalCount: action.totalCount,
                error: action.error,
            }
        }
        case ActionCreatorsTypes.SET_FOLLOWED_STATUS: {
            const copyState = state
            copyState.users = state.users
            copyState.users.filter(
                (el) => el.id === action.userId
            )[0].followed = action.status
            return copyState
        }
        case ActionCreatorsTypes.SET_IS_FOLLOWING: {
            return {
                ...state,
                isFollowing: action.isFollowing
                    ? [...state.isFollowing, action.id]
                    : [...state.isFollowing.filter((el) => el !== action.id)],
            }
        }
        default:
            return state
    }
}

////////// THUNKS //////////////////

export const getUsersThunk =
    (
        count: number = 10,
        page: number = 1,
        term: string = '',
        friend?: boolean | undefined
    ): ThunkType =>
    async (dispatch, getState) => {
        dispatch(setIsLoadingAC(true))
        const response = await usersAPI.getUsers(count, page, term, friend)

        if (response.status === 200) {
            dispatch(
                getUsersAC(
                    response.data.items,
                    response.data.totalCount,
                    response.data.error
                )
            )
            dispatch(setIsLoadingAC(false))
        }
    }

export const getFollowStatusThunk =
    (userId: number): ThunkType =>
    async (dispatch) => {
        const response = await usersAPI.getFollowStatus(userId)

        if (response.status === 200) {
            //dispatch(getFollowAC(response.data.items, response.data.totalCount, response.data.error))
        }
    }

export const followToUserThunk =
    (userId: number): ThunkType =>
    async (dispatch) => {
        dispatch(setIsFollowingAC(userId, true))
        const response = await usersAPI.followToUser(userId)

        if (response.status === 200) dispatch(setIsFollowingAC(userId, false))
        dispatch(setFollowedStatusAC(userId, true))
    }

export const unfollowToUserThunk =
    (userId: number): ThunkType =>
    async (dispatch) => {
        dispatch(setIsFollowingAC(userId, true))
        const response = await usersAPI.unfollowToUser(userId)

        if (response.status === 200) dispatch(setIsFollowingAC(userId, false))
        dispatch(setFollowedStatusAC(userId, false))
    }

////////// ACTION CREATORS ////////

export const getUsersAC = (
    users: Array<UserType>,
    totalCount: number,
    error: string
): getUsersACType => {
    return {
        type: ActionCreatorsTypes.GET_USERS,
        users: users,
        totalCount: totalCount,
        error: error,
    }
}

export const setFollowedStatusAC = (
    userId: number,
    status: boolean
): setFollowedStatusACType => {
    return {
        type: ActionCreatorsTypes.SET_FOLLOWED_STATUS,
        userId: userId,
        status: status,
    }
}

export const setIsFollowingAC = (
    id: number,
    isFollowing: boolean
): setIsFollowingACType => {
    return {
        type: ActionCreatorsTypes.SET_IS_FOLLOWING,
        isFollowing: isFollowing,
        id: id,
    }
}

export default usersReducer
