import { AnyAction } from "redux"
import { ChatMessageType, ThunkType } from "../../types/types"
import { appDispatchType } from "../store"
import { ChatAPI } from "../../api/ChatApi"
import React, { Dispatch, Ref, RefObject } from "react"
import { message } from "antd"

// TYPES

type initialStateType = {
    messages: ChatMessageType[]
}

export type setMessagesACType = {
    type: typeof ActionCreatorsTypes.SET_MESSAGES
    messages: ChatMessageType[]
}

export enum ActionCreatorsTypes {
    SET_MESSAGES = 'chat/SET_MESSAGES'
}

// REDUCER

let initialState: initialStateType = {
    messages: []
}

const chatReducer = (state: initialStateType = initialState, action: AnyAction): initialStateType => {
    switch (action.type) {
        case ActionCreatorsTypes.SET_MESSAGES: {
            console.log(11);
            console.log(...action.messages);
            return {
                ...state, 
                messages: [...state.messages, ...action.messages]
            }
        }

        default:
            return state
    }
}

// ACTIONS

export const setMessagesAC = (messages: ChatMessageType[]) => {
    return {
        type: ActionCreatorsTypes.SET_MESSAGES,
        messages: messages
    }
}

// HANDLERS

export const newMessageHandler = (dispatch: appDispatchType) => (messages: ChatMessageType[]) => {
    dispatch(setMessagesAC(messages))
}

// THUNKS

export const startReceivingMessagesThunk = (): ThunkType => (dispatch: appDispatchType) => {
    ChatAPI.start()
    ChatAPI.subscribe(newMessageHandler(dispatch))
}

export const stopReceivingMessagesThunk = (): ThunkType => (dispatch: appDispatchType) => {
    ChatAPI.unsubscribe(newMessageHandler(dispatch))
    ChatAPI.stop()
}

export const sendMessageThunk = (message: string): ThunkType => (dispatch: appDispatchType) => {
    ChatAPI.sendMessage(message)
}

export default chatReducer