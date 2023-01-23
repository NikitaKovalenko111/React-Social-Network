import axios, { AxiosInstance } from "axios";
import { defaultResponseType, UserType } from "../types/types";
import { instance } from "./api";

// TYPES

export interface usersAPI {
    getUsers: (count: number, page: number, term: string, friend: boolean | undefined) => Promise<getUsersResponseType>
    getFollowStatus: (userId: number) => Promise<getFollowStatusResponseType>
    followToUser: (userId: number) => Promise<followToUserResponseType>
    unfollowToUser: (userId: number) => Promise<unfollowToUserResponseType>
}

export interface getUsersResponseType {
    readonly status: number
    readonly data: {
        items: Array<UserType>
        totalCount: number
        error: string
    }
}

export interface getFollowStatusResponseType {
    readonly data: boolean
    readonly status: number
}

export interface followToUserResponseType {
    readonly status: number
}

export interface unfollowToUserResponseType {
    readonly status: number
}

// API

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