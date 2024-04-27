import { UserType } from '../types/types'
import { instance } from './api'

// TYPES

export interface IUsersAPI {
    getUsers: (
        count: number,
        page: number,
        term: string,
        friend: boolean | undefined
    ) => Promise<IGetUsersResponseType>
    getFollowStatus: (userId: number) => Promise<IGetFollowStatusResponseType>
    followToUser: (userId: number) => Promise<IFollowToUserResponseType>
    unfollowToUser: (userId: number) => Promise<IUnfollowToUserResponseType>
}

export interface IGetUsersResponseType {
    readonly status: number
    readonly data: {
        items: Array<UserType>
        totalCount: number
        error: string
    }
}

export interface IGetFollowStatusResponseType {
    readonly data: boolean
    readonly status: number
}

export interface IFollowToUserResponseType {
    readonly status: number
}

export interface IUnfollowToUserResponseType {
    readonly status: number
}

// API

export const usersAPI: IUsersAPI = {
    getUsers: (count, page, term, friend) => {
        return instance
            .get(
                `/users?count=${
                    count <= 100 ? count : 10
                }&page=${page}&term=${term}&friend=${friend}`
            )
            .then((response) => response)
    },
    getFollowStatus: (userId: number) => {
        return instance.get(`/follow/${userId}`).then((response) => response)
    },
    followToUser: (userId: number) => {
        return instance.post(`/follow/${userId}`)
    },
    unfollowToUser: (userId: number) => {
        return instance.delete(`/follow/${userId}`)
    },
}
