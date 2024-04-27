import { AnyAction } from 'redux'
import { ChatMessageType, ThunkType } from '../../types/types'
import { appDispatchType } from '../store'
import { ChatAPI, StatusType } from '../../api/ChatApi'

// TYPES

type initialStateType = {
    messages: ChatMessageType[]
    status: StatusType
}

export type setMessagesACType = {
    type: typeof ActionCreatorsTypes.SET_MESSAGES
    messages: ChatMessageType[]
}

export enum ActionCreatorsTypes {
    SET_MESSAGES = 'chat/SET_MESSAGES',
    SET_STATUS = 'chat/SET_STATUS',
}

// REDUCER

const initialState: initialStateType = {
    messages: [],
    status: 'pending',
}

const chatReducer = (
    state: initialStateType = initialState,
    action: AnyAction
): initialStateType => {
    switch (action.type) {
        case ActionCreatorsTypes.SET_MESSAGES: {
            return {
                ...state,
                messages: [...action.messages],
            }
        }

        case ActionCreatorsTypes.SET_STATUS: {
            return {
                ...state,
                status: action.status,
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
        messages: messages,
    }
}

export const setStatusAC = (status: StatusType) => {
    return {
        type: ActionCreatorsTypes.SET_STATUS,
        status: status,
    }
}

// HANDLERS

export const newMessageHandler =
    (dispatch: appDispatchType) => (messages: ChatMessageType[]) => {
        dispatch(setMessagesAC(messages))
    }

export const statusChangedHandler =
    (dispatch: appDispatchType) => (status: StatusType) => {
        dispatch(setStatusAC(status))
    }

// THUNKS

export const startReceivingMessagesThunk =
    (): ThunkType => (dispatch: appDispatchType) => {
        ChatAPI.start()
        ChatAPI.subscribe(newMessageHandler(dispatch), 'message-received')
        ChatAPI.subscribe(statusChangedHandler(dispatch), 'status-changed')
    }

export const stopReceivingMessagesThunk =
    (): ThunkType => (dispatch: appDispatchType) => {
        ChatAPI.unsubscribe(newMessageHandler(dispatch), 'message-received')
        ChatAPI.unsubscribe(statusChangedHandler(dispatch), 'status-changed')
        ChatAPI.stop()
    }

export const sendMessageThunk =
    (message: string): ThunkType =>
    (dispatch: appDispatchType) => {
        ChatAPI.sendMessage(message)
    }

export default chatReducer
